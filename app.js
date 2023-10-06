

const express = require('express') //expresdan intens yasash kerak
// const res = require('express/lip/response');
const app = express();  // shunday qilsak expressni app objectini yuboradi
const http  = require('http')
const fs = require('fs');

// ModeDB chaqirish
const db = require("./server").db();
const mongodb = require('mongodb')

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
app.post('/create-item', function(req, res) {
  console.log('user entered /create-item');
    
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, 
      (err,data) =>{
       res.json(data.ops[0])
    } )
})

app.post("/delete-item", (req,res) =>{
  const id = req.body.id;
  db.collection('plans').deleteOne(
    {_id: new mongodb.ObjectId(id)},
    function (err,data) {
      res.json({state: 'success'})
    }
  )
} );

app.post("/edit-item", (req,res)=>{
  const data = req.body;
  db.collection("plans").findOneAndUpdate(
    {_id: new mongodb.ObjectId(data.id)},
    {$set: {reja:data.new_input}},
    function(err,data) {
      res.json({state: 'success'})
    }
  )
  
} )

app.post('/delete-all', (req, res) => {
  if(req.body.delete_all) {
    db.collection('plans').deleteMany(function() {
      res.json({state: 'hammasi ochirildi'})
    })
  }
} )

// app.get('/author', (req, res) => {
//   res.render('author', {user:user})
// } )

app.get('/' , function(req, res)  {
  console.log('user entered /');
  db.collection("plans")
  .find()
  .toArray((err,data) => {
    if(err) {
      console.log(err);
      res.end("something went wrong")
    } else{
      
      res.render("reja", {items:data} )
    }
  } )
   
} )

// const server = http.createServer(app)    // createServer() bitta parametr qabul qiladi
// let PORT = 3000;
// server.listen(PORT, function(){
//     console.log(`The server is running succesfully on the port: ${PORT}, http://localhost:${PORT} `);
// })

module.exports = app