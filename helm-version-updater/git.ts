import { stringify as yamlStringify } from "https://deno.land/std@0.170.0/encoding/yaml.ts"
import * as log from "https://deno.land/std@0.170.0/log/mod.ts"
import * as fs from "https://deno.land/std@0.170.0/node/fs.ts"
import { relative as relativePath } from "https://deno.land/std@0.170.0/path/mod.ts"
import { parse as parseSemver } from "https://deno.land/std@0.170.0/semver/mod.ts"
import git from "https://esm.sh/isomorphic-git@1.21.0"
import http from "https://esm.sh/isomorphic-git@1.21.0/http/node.js"
import { Octokit } from "npm:@octokit/rest@19.0.5"

import type { SemVer } from "https://deno.land/std@0.170.0/semver/mod.ts"
import type { Chart } from "./types.ts"
export const tempDirPath = await Deno.makeTempDir()

const gh = new Octokit({
  auth: Deno.env.get("GITHUB_TOKEN"),
})

function handleAuth(_: string) {
  return {
    username: Deno.env.get("GITHUB_TOKEN") || "",
  }
}

/**
 * setup -- clones the helm-charts repository into a temporary directory.
 */
export async function setup() {
  log.info(`cloning into ${tempDirPath}...`)
  await git.clone({
    onAuth: handleAuth,
    fs: fs,
    http: http,
    dir: tempDirPath,
    url: "https://github.com/lrstanley/helm-charts.git",
    depth: 1,
    noTags: true,
  })

  log.info("fetching branches...")
  await git.fetch({ onAuth: handleAuth, fs: fs, http: http, dir: tempDirPath })
}

/**
 * createPR -- creates a pull request for the given chart (if one doesn't already exist).
 */
export async function createPR(chartPath: string, chart: Chart, latest: SemVer) {
  const branch = `app-upgrade/${chart.name}`

  const prs = await gh.pulls.list({
    owner: "lrstanley",
    repo: "helm-charts",
    state: "open",
    head: `lrstanley:${branch}`,
  })

  let prExists = false
  for (const pr of prs.data) {
    if (pr.head.ref === branch) {
      prExists = true
      break
    }
  }

  if (prExists) {
    log.info("pull requests already exists, skipping...")
    return
  }

  // Delete the remote branch if it exists.
  log.info(`deleting remote branch ${branch} (if exists)...`)
  try {
    await git.push({
      onAuth: handleAuth,
      fs: fs,
      http: http,
      dir: tempDirPath,
      remoteRef: branch,
      delete: true,
    })
  } catch (e) {
    log.warning(`remote branch ${branch} does not exist (or other error), skipping: ${e}`)
  }

  log.info(`deleting local branch ${branch} (if exists)...`)
  try {
    await git.deleteBranch({ fs: fs, dir: tempDirPath, ref: branch })
  } catch (e) {
    log.warning(`local branch ${branch} does not exist (or other error), skipping: ${e}`)
  }

  log.info(`creating local branch ${branch}...`)
  await git.branch({ fs: fs, dir: tempDirPath, ref: branch, checkout: true })

  const oldAppVersion = chart.appVersion
  chart.appVersion = latest.toString()

  const oldVersion = chart.version
  chart.version = parseSemver(chart.version)?.increment("minor").toString() || chart.version
  log.info(`incrementing chart ${chart.name} version from ${oldVersion} to ${chart.version}`)

  const chartYaml = yamlStringify(chart as Record<string, any>)

  log.info("writing updated Chart.yaml...")
  await Deno.writeTextFile(chartPath, chartYaml, { mode: 0o644 })

  log.info("commiting Chart.yaml...")
  await git.add({ fs: fs, dir: tempDirPath, filepath: relativePath(tempDirPath, chartPath) })
  await git.commit({
    fs: fs,
    dir: tempDirPath,
    message: `upgrade chart ${chart.name} from ${oldVersion} to ${chart.version}\n\nupgrade appVersion from ${oldAppVersion} to ${chart.appVersion}`,
    author: {
      name: "Liam Stanley",
      email: "me@liamstanley.io",
    },
  })

  log.info(`pushing branch ${branch}...`)
  await git.push({
    onAuth: handleAuth,
    fs: fs,
    http: http,
    dir: tempDirPath,
    ref: branch,
    remote: "origin",
  })

  log.info("creating new pull request...")
  await gh.pulls.create({
    owner: "lrstanley",
    repo: "helm-charts",
    title: `upgrade chart ${chart.name} to ${chart.version}`,
    head: branch,
    base: "master",
    body: `- upgrade chart ${chart.name} from \`${oldVersion}\` to \`${chart.version}\`\n- upgrade \`appVersion\` from \`${oldAppVersion}\` to \`${chart.appVersion}\`\n\nauto-created from [helm-version-updater](https://github.com/lrstanley/helm-charts/actions/workflows/helm-version-updater.yml) action`,
  })
}

/**
 * cleanup -- removes the temporary directory.
 */
export async function cleanup() {
  log.info(`removing git clone ${tempDirPath}...`)
  await Deno.remove(tempDirPath, { recursive: true })
}
