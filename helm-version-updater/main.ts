import { parse as yamlParse } from "https://deno.land/std@0.170.0/encoding/yaml.ts"
import { walk } from "https://deno.land/std@0.170.0/fs/mod.ts"
import * as log from "https://deno.land/std@0.170.0/log/mod.ts"
import { dirname } from "https://deno.land/std@0.170.0/path/mod.ts"
import { Command } from "https://deno.land/x/cliffy@v0.25.6/command/mod.ts"
import * as git from "./git.ts"
import { processChartUpgrade } from "./process-chart.ts"
import { processImage } from "./process-image.ts"

import type { Config, Chart } from "./types.ts"

await new Command()
  .name("helm-version-updater")
  .description("cli tool to update appVersion specifications based off container images")
  .version("v1.0.0")
  .option("--dir <string>", "optional git repository folder (otherwise will clone)")
  .action(async ({ dir }) => {
    if (!dir) {
      // Initialize git repo.
      await git.setup()
    }

    const checkDir = dir || git.tempDirPath

    log.info(`checking "${checkDir}"`)
    for await (const file of walk(checkDir, {
      includeDirs: false,
      followSymlinks: false,
      match: [/ci-config\.yaml$/],
    })) {
      const config = yamlParse(await Deno.readTextFile(file.path)) as Config
      config.file = file

      const latest = await processImage(config)

      const chartPath = `${dirname(file.path)}/Chart.yaml`
      const chart = yamlParse(await Deno.readTextFile(chartPath)) as Chart
      await processChartUpgrade(chartPath, chart, latest)
    }

    if (!dir) {
      // Cleanup anything we created.
      await git.cleanup()
    }
  })
  .parse()
