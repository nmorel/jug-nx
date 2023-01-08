#!/usr/bin/env zx

import "zx/globals";
import { createRequire } from "module";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import { readFile } from "fs/promises";

const require = createRequire(import.meta.url);

async function getApiJarPath() {
  const apiFolder = path.dirname(require.resolve("@jug-nx/back-api/package.json"));
  const pomXmlData = await readFile(path.join(apiFolder, "pom.xml"));

  const parser = new XMLParser();
  const {
    project: { artifactId, version },
  } = parser.parse(pomXmlData);
  return path.join(apiFolder, "target", `${artifactId}-${version}.jar`);
}

const buildFolder = "build";
const apiJar = await getApiJarPath();
const webappFolder = path.resolve(path.dirname(require.resolve("@jug-nx/front-app/package.json")), buildFolder);
const targetJar = `${buildFolder}/jug-nx.jar`;

await $`rm -rf ${buildFolder}/*`;
await $`mkdir -p ${buildFolder}/BOOT-INF/classes/static`;
await $`cp ${apiJar} ${targetJar}`;
await $`cp -r ${webappFolder}/* ${buildFolder}/BOOT-INF/classes/static/`;
await $`jar uf ${targetJar} -C ${buildFolder}/ BOOT-INF/`;
await $`rm -rf ./${buildFolder}/BOOT-INF`;
