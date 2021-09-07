const http = require('http')
const rollup = require('rollup')
const loadConfigFile = require('rollup/dist/loadConfigFile')
const path = require('path')
const handler = require('serve-handler')

const watch = () => {
  loadConfigFile(path.resolve('rollup.config.js'), {format: 'es'}).then(
    async ({ options, warnings }) => {
      console.log(`${warnings.count} warnings`)
      warnings.flush();
      const watcher = rollup.watch(options)

      watcher.on('event', (event) => {
        if (event.result) {
          event.result.close()
        }
      })

      watcher()
    }
  )
}

const server = http.createServer((request, response) => {
  console.log('watch')
  watch()
  return handler(request, response, {
    public: 'src/public'
  })
})

server.listen(3737, (err) => {
  if (err) console.log('error: ', err)
  console.log('Running at http://localhost:3737')
})