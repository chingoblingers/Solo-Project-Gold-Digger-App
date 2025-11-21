import http from "node:http"

const PORT = 6000

const server = http.createServer((res, req){
res.statusCode = 200
res.end(`We are up and running.`)
})

server.listen(PORT, ()=> console.log(`running on PORT: ${PORT} `))

