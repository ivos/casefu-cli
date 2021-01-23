const path = require('path')
const chokidar = require('chokidar')
const clear = require('cli-clear')
const chalk = require('chalk')
const { build } = require('./build')

const watch = args => {
  clear()
  console.log('Initializing watch', args)
  const watcher = chokidar.watch(args.sources, {
    ignoreInitial: true
  })

  watcher.on('ready', async () => {
    // console.log('Loaded source files')
    await build(args)
    console.log('Navigate your browser to ' + chalk.blue.bold('file://' + path.resolve(args.target)))
  })

  watcher.on('all', async (event, path) => {
    clear()
    // console.log(event, path)
    await build(args)
    console.log('Reload your browser to display changes...')
  })
}

module.exports = watch
