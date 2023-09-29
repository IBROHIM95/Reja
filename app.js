console.log('web serverni boshlash');

const express = require('express') //expresdan intens yasash kerak
// const res = require('express/lip/response');
const app = express();  // shunday qilsak expressni app objectini yuboradi
const http  = require('http')
const fs = require('fs');

// ModeDB chaqirish
// const db = require("./server").db();

// let user;
// fs.readFile("database/user.json", "utf-8", (err, data) => {
//     if(err) {
//         console.log("ERROR:", err );
//     }else{
//         user = JSON.parse(data)
//     }
// }  )

//bosqichlar
//1 KIRISH codlar

app.use(express.static('public'))  // har qanaqa browzerdan kirib kelgan zabros uchun folder ochiq degani 
app.use(express.json()) // kirib kelayotgan json fotmatdagi datani object holatiga o'girib beradi
app.use(express.urlencoded({extended:true})); // html form express qabul qilish uchun ishlatilinadi
//2 : session codlar

//3 views codlar
app.set('views', 'views')  // folderni ko'rsatayapmiz
app.set('view engine', 'ejs') //view jsni  ejs ekanligini ko'rsatyapmiz

//4 routing codlar
// app.get('/', function(req,res) {
//     res.end(' <h1> hello world by Ali </h1> ')
// } );
app.post('/create-item', function(req, res)  {
    console.log(req.body);
    res.json({test:'success'})
})

app.get('/author', (req, res) => {
  res.render('author', {user:user})
} )

app.get('/' , function(req, res)  {
   res.render('reja')
} )

// const server = http.createServer(app)    // createServer() bitta parametr qabul qiladi
// let PORT = 3000;
// server.listen(PORT, function(){
//     console.log(`The server is running succesfully on the port: ${PORT}, http://localhost:${PORT} `);
// })

module.exports = app