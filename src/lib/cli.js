#!/usr/bin/env node

const program = require('commander')
const build = require('./build')
const watch = require('./watch')

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
  .description('Watch the sources directory and re-build CaseFu Functional Specification Document on any file change.')
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
  .parse(process.argv)

if (process.argv.length <= 2) {
  program.outputHelp()
}
