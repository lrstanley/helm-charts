import { encode as base64encode } from "https://deno.land/std@0.170.0/encoding/base64.ts"
import * as log from "https://deno.land/std@0.170.0/log/mod.ts"
import { maxSatisfying, parse as parseSemver } from "https://deno.land/std@0.170.0/semver/mod.ts"

import type { Config, Source, TagsResponseGithub, TagsResponseDockerHub } from "./types.ts"
import type { SemVer } from "https://deno.land/std@0.170.0/semver/mod.ts"

/**
 * getImageTags -- returns a list of tags for a given image, from the provided
 * source repository.
 */
async function getImageTags(source: Source): Promise<string[]> {
  let request: Request

  if (source.repository === "ghcr.io") {
    request = new Request(`https://ghcr.io/v2/${source.owner}/${source.image}/tags/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${base64encode(Deno.env.get("GITHUB_TOKEN") as string)}`,
      },
    })

    const resp = await fetch(request)
    if (!resp.ok) {
      throw new Error(`failed to fetch image versions: ${resp.status}`)
    }

    const data = (await resp.json()) as TagsResponseGithub
    return data.tags
  } else if (source.repository === "hub.docker.com") {
    request = new Request(
      `https://hub.docker.com/v2/repositories/${source.owner}/${source.image}/tags?page_size=1000`,
      { method: "GET" }
    )

    const resp = await fetch(request)
    if (!resp.ok) {
      throw new Error(`failed to fetch image versions: ${resp.status}`)
    }

    const data = (await resp.json()) as TagsResponseDockerHub
    return data.results.map((r) => r.name)
  } else {
    throw new Error(`unsupported repository: ${source.repository}`)
  }
}

/**
 * getLatestSemver -- returns the latest semver version from a list of tags.
 */
function getLatestSemver(tags: string[], config: Config): SemVer {
  const versions: SemVer[] = []

  for (const tag of tags) {
    const v = parseSemver(tag)
    if (v) {
      versions.push(v)
    } else {
      log.warning(`failed to parse "${tag}" as semver, skipping`)
    }
  }

  const latest = maxSatisfying(versions, config.version_range || "*")
  if (!latest) {
    throw new Error("failed to find latest version")
  }

  return latest
}

/**
 * processImage -- returns the latest semver version for a given image.
 */
export async function processImage(config: Config): Promise<SemVer> {
  log.info(
    `checking tags for ${config.source.repository}/${config.source.owner}/${config.source.image} (from: ${config.file.path})`
  )

  const versions = await getImageTags(config.source)
  const latest = getLatestSemver(versions, config)
  log.info(
    `found ${latest.toString()} for ${config.source.repository}/${config.source.owner}/${
      config.source.image
    }`
  )

  return latest
}
