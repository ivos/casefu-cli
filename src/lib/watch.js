const chokidar = require('chokidar')
const clear = require('cli-clear')
const build = require('./build')

const watch = args => {
  console.log('initializing', args)
  const watcher = chokidar.watch(args.sources, {
    ignoreInitial: true
  })

  watcher.on('ready', () => {
    clear()
    console.log('loaded source files')
    build(args)
  })

  watcher.on('all', (event, path) => {
    clear()
    console.log(event, path)
    build(args)
  })
}

module.exports = watch
