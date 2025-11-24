import http from "node:http"
import fs from "node:fs/promises"
import path from "node:path"
import mime from "mime"

let currentprice = 600

const PORT = 6000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
const publicFolder = path.join(__dirname, "public")
let filePath = ""

if(req.url === "/"){
filePath = path.join(publicFolder, "index.html")
}else if (req.url === "/stream") {
 res.statusCode = 200   
 res.setHeader("Content-Type", "text/event-stream")
 res.setHeader("Cache-Control", "no-cache")
 res.setHeader("Connection", "keep-alive")

setInterval(() => {
    currentprice = getNextPrice(currentprice)
    res.write(
        `data: ${JSON.stringify({event: "gold-price-update", price: currentprice})}\n\n`
    )
}, 3000);

return

}else {
filePath = path.join(publicFolder, req.url)
}


const ext = path.extname(filePath)
const contentType = mime.getType(ext)
console.log("req.url:", req.url)
console.log("filePath:", contentType)


try{

const readPath = await fs.readFile(filePath)
res.statusCode = 200
res.setHeader("Content-Type", `${contentType}`)
res.end(readPath)

}catch(error){

const errorPage = path.join("public", "404.html")
const readError= await fs.readFile(errorPage)    
res.statusCode = 404
res.setHeader("Content-Type", `${contentType}`)
res.end(readError)    

}


})

server.listen(PORT, ()=> console.log(`running on PORT: ${PORT} `))


function getNextPrice(price){

let change = Math.floor(Math.random()*317 -158)
let newPrice = price + change
return newPrice
}

