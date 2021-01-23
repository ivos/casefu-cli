#!/usr/bin/env node

const program = require('commander')
const { build } = require('./build')
const watch = require('./watch')
const serve = require('./serve')
const generate = require('./generate')

program
  .version(require('../../package').version)
  .usage('<command> [options]')

const buildSourcesDefault = 'fsd/**/*.md'
const buildTargetDefault = 'build/index.html'
const buildTargetDirDefault = 'generated'
const setupJsonDefault = 'setup.json'
program
  .command('build')
  .description('Build CaseFu Functional Specification Document.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process', buildSourcesDefault)
  .option('-t, --target <target>', 'filename of generated HTML file', buildTargetDefault)
  .option('-v, --verbose', 'list the files processed')
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      target = buildTargetDefault,
      verbose = false
    } = cmd
    const args = { sources, target, verbose }
    build(args)
  })

program
  .command('watch')
  .description('Watch the sources directory' +
    ' and re-build CaseFu Functional Specification Document on any file change.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process', buildSourcesDefault)
  .option('-t, --target <target>', 'filename of generated HTML file', buildTargetDefault)
  .option('-v, --verbose', 'list the files processed')
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      target = buildTargetDefault,
      verbose = false
    } = cmd
    const args = { sources, target, verbose }
    watch(args)
  })

program
  .command('serve')
  .description('Serve the sources directory,' +
    ' re-build CaseFu Functional Specification Document on any file change' +
    ' and reload the contents in the browser.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process', buildSourcesDefault)
  .option('-t, --target <target>', 'filename of generated HTML file', buildTargetDefault)
  .option('-p, --port <port>', 'port to bind to', '8080')
  .option('-v, --verbose', 'list the files processed')
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      target = buildTargetDefault,
      port,
      verbose = false
    } = cmd
    const args = { sources, target, port, verbose }
    serve(args)
  })

program
  .command('generate')
  .description('Generate an application from the FSD.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process', buildSourcesDefault)
  .option('-t, --target-dir <targetDir>', 'directory into which the app will be generated', buildTargetDirDefault)
  .option('-c, --setup <setup.json>', 'setup.json file', 'setup.json')
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      targetDir = buildTargetDirDefault,
      setup = setupJsonDefault
    } = cmd
    const args = { sources, targetDir, setup }
    generate(args)
  })

program
  .parse(process.argv)

if (process.argv.length <= 2) {
  program.outputHelp()
}
