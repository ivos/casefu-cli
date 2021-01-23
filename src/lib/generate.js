const fs = require('fs')
const path = require('path')
const util = require('util')
const { buildMeta } = require('./build')
const { generate } = require('casefu-generator')

const moduleDir = path.dirname(require.resolve('casefu-generator'))

const generateCli = async ({ sources, targetDir, setup }) => {
  const start = new Date()
  console.log('>> generate, sources: ' + sources + ', target dir: ' + targetDir + ', setup: ' + setup)
  const [, meta] = await buildMeta({ sources, verbose: false })
  const setupContent = await util.promisify(fs.readFile)(setup, 'utf8')
  const setupData = JSON.parse(setupContent)
  generate(meta, setupData, moduleDir, targetDir)
  console.log('<< generate, ' + +(new Date() - start) + ' ms')
}

module.exports = generateCli
