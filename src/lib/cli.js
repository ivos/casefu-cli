#!/usr/bin/env node

const program = require('commander')
const build = require('./build')
const watch = require('./watch')
const serve = require('./serve')

program
  .version(require('../../package').version)
  .usage('<command> [options]')

const buildSourcesDefault = 'fsd/**/*.md'
const buildTargetDefault = 'build/index.html'
program
  .command('build')
  .description('Build CaseFu Functional Specification Document.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process, default: ' + buildSourcesDefault)
  .option('-t, --target <target>', 'filename of generated HTML file, default: ' + buildTargetDefault)
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      target = buildTargetDefault
    } = cmd
    const args = { sources, target }
    build(args)
  })

program
  .command('watch')
  .description('Watch the sources directory' +
    ' and re-build CaseFu Functional Specification Document on any file change.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process, default: ' + buildSourcesDefault)
  .option('-t, --target <target>', 'filename of generated HTML file, default: ' + buildTargetDefault)
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      target = buildTargetDefault
    } = cmd
    const args = { sources, target }
    watch(args)
  })

program
  .command('serve')
  .description('Serve the sources directory,' +
    ' re-build CaseFu Functional Specification Document on any file change' +
    ' and reload the contents in the browser.')
  .option('-s, --sources <sources>', 'glob pattern to match source files to process, default: ' + buildSourcesDefault)
  .option('-t, --target <target>', 'filename of generated HTML file, default: ' + buildTargetDefault)
  .option('-p, --port <port>', 'The port to bind to', '8080')
  .action(cmd => {
    const {
      sources = buildSourcesDefault,
      target = buildTargetDefault,
      port
    } = cmd
    const args = { sources, target, port }
    serve(args)
  })

program
  .parse(process.argv)

if (process.argv.length <= 2) {
  program.outputHelp()
}
