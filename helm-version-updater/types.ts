import type { WalkEntry } from "https://deno.land/std@0.170.0/fs/mod.ts"

export interface Source {
  repository: string
  owner: string
  image: string
}

export interface Config {
  file: WalkEntry

  source: Source
  version_range?: string
}

export interface TagsResponseGithub {
  name: string
  tags: string[]
}

export interface TagsResponseDockerHub {
  count: number
  next?: string
  previous?: string
  results: TagsResponseDockerHubResults[]
}

export interface TagsResponseDockerHubResults {
  name: string
}

export interface Chart {
  apiVersion: string
  name: string
  version: string
  kubeVersion?: string
  description?: string
  type?: "application" | "library"
  keywords?: string[]
  home?: string
  sources?: string[]
  dependencies?: ChartDependency[]
  maintainers?: ChartMaintainer[]
  icon?: string
  appVersion?: string
  deprecated?: boolean
  annotations?: Record<string, string>
}

export interface ChartDependency {
  name: string
  version: string
  repository?: string
  condition?: string
  tags?: string[]
  "import-values"?: Record<string, string> | Record<string, Record<string, any>>
  alias?: string
}

export interface ChartMaintainer {
  name: string
  email?: string
  url?: string
}
