const path= require('path')
const fs= require('fs')
const os= require('os')
const url=require('url')
const myUrl= new URL('http://origami69.com/index.html?id=100&&status=active')
const EventEmitter= require('events')
const uuid=require('uuid')
const http=require('http')


//fs
    //this makes folder
// fs.mkdir(path.join(__dirname, 'src'),{},(err)=>{
//     if(err) throw err
//     console.log('folder made')
// })
    //this makes files
// fs.writeFile(path.join(__dirname, '/src', 'app.js'),{}, (err)=>{
//     if(err) throw err
//     console.log('app.js made in src')
// })
    // append to file
// fs.appendFile(path.join(__dirname,'/src','app.js'),'whatever u want to append', (err)=>{
// if(err) throw err
// console.log('appended data')
// })
    // read file
// fs.readFileSync(path.join(__dirname,'src','app.js'),'utf-8',(err, data)=>{
//     if(err) throw err
//     console.log(data)
// })

//os
    //read user platform
// console.log(os.platform())
//     //read cpu arch
// console.log(os.arch())
//     //read cpu core info
// console.log(os.cpus())
//     // free memory
// console.log(os.freemem())
//     //total memory
// console.log(os.totalmem())
//     //home dir
// console.log(os.homedir())
//     //uptime
// console.log(os.uptime())

//url module
    //serailized url
// console.log(myUrl.href)
// console.log(myUrl.toString())
// //host
//     // root domain
// console.log(myUrl.host)
//     // does not get port
// console.log(myUrl.hostname)
//     //pathname
// console.log(myUrl.pathname)
//     //searialized query
// console.log(myUrl.search)
//     //params object
// console.log(myUrl.searchParams)
//     //add params
// myUrl.searchParams.append('abc','123')
// console.log(myUrl.searchParams)
//     //loop params
// myUrl.searchParams.forEach((value,name)=>{
//     console.log(`${name}: ${value}`)
// })

//emitter
    //create class
// class MyEmitter extends EventEmitter {}
//     //init object 
//  const myEmitter= new MyEmitter()
//     //event listener
// myEmitter.on('event',()=>{console.log('dude stop')})

// myEmitter.emit('event')

// class logger extends EventEmitter{
//     log(msg){
//         //event caLL
//         this.emit('message', {id:uuid.v4(), msg})
//     }
// }
// Logger= new logger
// Logger.on('message',(data)=>console.log('called', data))

// Logger.log('hello world')

// http module

// http.createServer((req, res)=>{
//     //response
// res.write('hello world')
// res.end()
// }).listen(5000, ()=>console.log('server is running'))


// 

// const PORT = process.env.PORT||5000
// server.listen(PORT,()=>console.log(`port is runnin on port: ${PORT}`))server = http.createServer((req, res)=>{
//     //response
// if(req.url === '/'){
//     fs.readFile(path.join(__dirname, 'public', 'index.html'),(err, cont)=>{
//         if(err) throw err
//         res.writeHead(200, {'Content-Type':'text/html'})
//         res.end(cont)
//     })
    
// } else if(req.url === '/about'){
//     fs.readFile(path.join(__dirname, 'public', 'about.html'),(err, cont)=>{
//         if(err) throw err
//         res.writeHead(200, {'Content-Type':'text/html'})
//         res.end(cont)
//     })
// }else if(req.url ==='/contact-me'){
//     fs.readFile(path.join(__dirname, 'public', 'contact-me.html'),(err, cont)=>{
//         if(err) throw err
//         res.writeHead(200, {'Content-Type':'text/html'})
//         res.end(cont)
//     })
// }else if(req.url.match("\.css$")){
//     var cssPath = path.join(__dirname, 'public', 'styles.css');
//     var fileStream = fs.createReadStream(cssPath, "UTF-8");
//     res.writeHead(200, {"Content-Type": "text/css"});
//     fileStream.pipe(res);

// }else if(req.url==='/api/userData'){
//     const data= [
//         {name:'Mike Hawk', age:69},
//         {name:'Bend Hover', age:21}
//     ]
//     res.writeHead(200, {'Content-Type':'application/json'})
//     res.end(JSON.stringify(data))
// } else{
//     fs.readFile(path.join(__dirname, 'public', '404.html'),(err, cont)=>{
//         if(err) throw err
//         res.writeHead(200, {'Content-Type':'text/html'})
//         res.end(cont)
//     })
// }
// }
const PORT=  process.env.PORT||5000
server = http.createServer((req, res)=>{
    //response
let  filePath=path.join(__dirname, 'public', req.url === '/' ? 'index.html':req.url)

let extname=path.extname(filePath)
let contType='text/html'
switch(extname){
    case '.js':
        contType='text/javascript'
    break
    case '.css':
        contType='text/css'
    break
    case '.json':
        contType='application/json'
    break
    case '.png':
        contType='image/png'
    break
    case '.jpg':
        contType='image/jpg'
    break
}
fs.readFile(filePath, (err, content)=>{
    if(err){
        if(err.code==='ENONET'){
            fs.readFile(path.join(__dirname,'public', '404.html'),(err, content)=>{
                res.writeHead(200, {'Content-Type': contType})
                res.end(content, 'utf-8')
            })
        }else{
            res.writeHead(500)
           res.end(`Server Error: ${err.code}`)
        }
    }else{
        res.writeHead(200, {'Content-Type':contType})
        res.end(content, 'utf-8')
    }
})
})

server.listen(PORT,()=>console.log(`Server now running at ${PORT}`))