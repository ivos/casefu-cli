const globby = require('globby')
const path = require('path')
const fs = require('fs')
const util = require('util')
const converter = require('casefu-converter')

const build = async args => {
  const start = new Date()
  console.log('>> build', args)
  const files = await listFiles(args.sources)
  await convertFiles(files)
  // console.log('files', files)
  const meta = converter.mergeMeta(files)
  // console.log('merged meta', meta)
  postProcessFiles(meta, files)
  const mergedFiles = mergeFiles(files)
  const searchSection = converter.buildSearchSection(meta)
  const targetContent = converter.htmlTemplate(mergedFiles + searchSection)
  await writeTarget(args.target, targetContent)
  console.log('<< build @', new Date() - start, 'ms')
}

const listFiles = async sources => {
  const fileNames = await globby(sources)
  fileNames.sort()
  return fileNames.map(fileName => ({ fileName }))
}

const convertFiles = async files => {
  const promises = files.map(convertFile)
  await Promise.all(promises)
}

const convertFile = async file => {
  // console.log('converting source file:', file.fileName)
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

module.exports = build
