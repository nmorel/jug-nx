#!/usr/bin/env zx

import 'zx/globals'
import path from 'node:path'
import {XMLParser} from 'fast-xml-parser'
import {readFile} from 'fs/promises'

const apiFolder = path.join(__dirname, '../../backend/api')

// Api informations
const pomXmlData = await readFile(path.join(apiFolder, 'pom.xml'))
const parser = new XMLParser()
const {
  project: {artifactId, version, packaging},
} = parser.parse(pomXmlData)

const apiArtifact = path.join(apiFolder, 'target', `${artifactId}-${version}.${packaging}`)

// Webapp informations
const webappFolder = path.join(__dirname, '../../frontend/app/dist')

// Bundle informations
const buildFolder = path.join(__dirname, '../dist')
const targetArtifact = `${buildFolder}/nx-polyglot.${packaging}`

await $`rm -rf ${buildFolder}/*`
await $`mkdir -p ${buildFolder}/WEB-INF/classes/static`
await $`cp ${apiArtifact} ${targetArtifact}`
await $`cp -r ${webappFolder}/* ${buildFolder}/WEB-INF/classes/static/`
await $`jar uf ${targetArtifact} -C ${buildFolder}/ WEB-INF/`
await $`rm -rf ./${buildFolder}/WEB-INF`
