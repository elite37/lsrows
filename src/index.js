const http = require('http')
const handler = require('serve-handler')

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'src/public'
  })
})

server.listen(3737, (err) => {
  if (err) console.log('error: ', err)
  console.log('Running at http://localhost:3737')
})