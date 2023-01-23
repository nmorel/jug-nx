#!/usr/bin/env zx

import "zx/globals";
import { createRequire } from "module";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import { readFile } from "fs/promises";

const require = createRequire(import.meta.url);

async function getApiJarPath() {
  const apiFolder = path.join(__dirname, "../../packages/back-api");
  const pomXmlData = await readFile(path.join(apiFolder, "pom.xml"));

  const parser = new XMLParser();
  const {
    project: { artifactId, version },
  } = parser.parse(pomXmlData);
  return path.join(apiFolder, "target", `${artifactId}-${version}.war`);
}

const apiJar = await getApiJarPath();
const webappFolder = path.join(__dirname, "../../packages/front-app/dist");
const buildFolder = path.join(__dirname, "../dist");
const targetJar = `${buildFolder}/jug-nx.war`;

await $`rm -rf ${buildFolder}/*`;
await $`mkdir -p ${buildFolder}/WEB-INF/classes/static`;
await $`cp ${apiJar} ${targetJar}`;
await $`cp -r ${webappFolder}/* ${buildFolder}/WEB-INF/classes/static/`;
await $`jar uf ${targetJar} -C ${buildFolder}/ WEB-INF/`;
await $`rm -rf ./${buildFolder}/WEB-INF`;
