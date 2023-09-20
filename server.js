console.log('web serverni boshlash');

const express = require('express') //expresdan intens yasash kerak
const app = express()  // shunday qilsak expressni app objectini yuboradi
const http  = require('http')

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
app.get('/', function(req,res) {
    res.end(' <h1> hello world by Ali </h1> ')
} );
app.get('/gift', function(req,res) {
    res.end(' <h1> sovgalar</h1> ')
} );

const server = http.createServer(app)    // createServer() bitta parametr qabul qiladi
let PORT = 3000;
server.listen(PORT, function(){
    console.log(`The server is running succesfully on the port: ${PORT} `);
})