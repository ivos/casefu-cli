const globby = require('globby')
const path = require('path')
const fs = require('fs')
const util = require('util')
const converter = require('casefu-converter')

const buildMeta = async args => {
  const files = await listFiles(args.sources)
  await convertFiles(args.verbose, files)
  // console.log('files', files)
  const meta = converter.mergeMeta(files)
  // console.log('merged meta', meta)
  return [files, meta]
}

const build = async args => {
  const start = new Date()
  console.log('>> build, sources: ' + args.sources + ', target: ' + args.target)
  const [files, meta] = await buildMeta(args)
  postProcessFiles(meta, files)
  const mergedFiles = mergeFiles(files)
  const searchSection = converter.buildSearchSection(meta)
  const overviewDiagramsSection = converter.buildOverviewDiagramsSection(meta)
  const targetContent = converter.htmlTemplate(mergedFiles + overviewDiagramsSection + searchSection)
  await writeTarget(args.target, targetContent)
  console.log('<< build, ' + files.length + ' files @ ' + (new Date() - start) + ' ms')
  return { meta }
}

const listFiles = async sources => {
  const fileNames = await globby(sources)
  fileNames.sort()
  return fileNames.map(fileName => ({ fileName }))
}

const convertFiles = async (verbose, files) => {
  const promises = files.map(convertFile(verbose))
  await Promise.all(promises)
}

const convertFile = verbose => async file => {
  verbose && console.log('converting source file:', file.fileName)
  file.content = await util.promisify(fs.readFile)(file.fileName, 'utf8')
  const header = `<!--${file.fileName}-->\n`
  const converted = converter.convert(file.content)
  file.html = header + converted.html
  file.meta = converted.meta
}

const postProcessFiles = (meta, files) => {
  return files.map(file => {
    postProcessFile(meta, file)
  })
}

const postProcessFile = (meta, file) => {
  Object.keys(file.meta.sections)
    .forEach(sectionCode => {
      file.html = converter.expandComputed(file.html, sectionCode, meta)
    })
  file.html = converter.transformInnerLinks(file.fileName, file.html, meta)
}

const mergeFiles = files => {
  return files
    .map(({ html }) => html)
    .join('')
}

const writeTarget = async (target, content) => {
  const dir = path.dirname(target)
  await util.promisify(fs.mkdir)(dir, { recursive: true })
  await util.promisify(fs.writeFile)(target, content)
}

module.exports = { buildMeta, build }
