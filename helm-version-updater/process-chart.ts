import * as log from "https://deno.land/std@0.170.0/log/mod.ts"
import {
  lt as versionLess, parse as parseSemver
} from "https://deno.land/std@0.170.0/semver/mod.ts"
import * as git from "./git.ts"

import type { Chart } from "./types.ts"
import type { SemVer } from "https://deno.land/std@0.170.0/semver/mod.ts"

/**
 * processChartUpgrade -- checks if a chart needs to be upgraded, and if so, initiates
 * the pull request process.
 */
export async function processChartUpgrade(chartPath: string, chart: Chart, latest: SemVer) {
  if (!chart.appVersion) {
    log.warning(`chart ${chart.name} has no appVersion, skipping`)
    return
  }

  const current = parseSemver(chart.appVersion)
  if (!current) {
    log.warning(`chart ${chart.name} has invalid appVersion, skipping`)
    return
  }

  if (!versionLess(current, latest)) {
    log.info(`chart ${chart.name} is up to date, skipping`)
    return
  }

  log.info(`chart ${chart.name} needs upgrade: ${chart.appVersion} -> ${latest}`)
  await git.createPR(chartPath, chart, latest)
}
