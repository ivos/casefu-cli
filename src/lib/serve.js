const path = require('path')
const supervisor = require('supervisor')
const os = require('os')
const chokidar = require('chokidar')
const clear = require('cli-clear')
const chalk = require('chalk')
const build = require('./build')

const rebuild = async args => {
  const { sources, target } = args
  await build({ sources, target })
}

const initServing = args => {
  const runFile = path.join(os.tmpdir(), 'casefu-' + Math.random().toString().slice(2))
  const serverFile = path.join(__dirname, '../../node_modules/reload/lib/reload-server.js')

  const buildDir = path.dirname(args.target)
  const buildFile = path.dirname(args.target)

  const reloadArgs = [
    '-e', 'html', '-w', buildDir, '-q', '--',
    serverFile, args.port, buildDir, false, 'localhost', runFile, buildFile, true, true
  ]
  supervisor.run(reloadArgs)
  console.log('\nNavigate your browser to ' + chalk.blue.bold('http://localhost:' + args.port + '/index.html\n'))
}

const serve = args => {
  clear()
  console.log('Initializing serve', args)
  const watcher = chokidar.watch(args.sources, {
    ignoreInitial: true
  })

  watcher.on('ready', async () => {
    // console.log('Loaded source files')
    await rebuild(args)
    initServing(args)
  })

  watcher.on('all', async (event, path) => {
    clear()
    // console.log(event, path)
    await rebuild(args)
  })
}

module.exports = serve
