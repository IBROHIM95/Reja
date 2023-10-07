const express = require('express') 

const app = express();  
const http  = require('http')


// ModeDB chaqirish
const db = require("./server").db();
const mongodb = require('mongodb')


//1 KIRISH codlar

app.use(express.static('public'))  // har qanaqa browzerdan kirib kelgan zabros uchun folder ochiq degani 
app.use(express.json()) // kirib kelayotgan json fotmatdagi datani object holatiga o'girib beradi
app.use(express.urlencoded({extended:true})); // html form express qabul qilish uchun ishlatilinadi
//2 : session codlar

//3 views codlar
app.set('views', 'views')  
app.set('view engine', 'ejs') 

//4 routing codlar

app.post('/create-item', (req, res) =>  {
   console.log('user entered /create-item');
   const new_reja = req.body.reja
   db.collection('plans').insertOne({reja: new_reja} , (err,data) =>{
    
    res.json(data.ops[0])
   }  )
})

app.post('/delete-item' , (req,res) =>{
  const id = req.body.id
 db.collection('plans').deleteOne(
  {_id: new mongodb.ObjectId(id)},
  function(err,data) {
    res.json({state : 'success'})
  }
 )
} )
  

app.get('/', (req, res) => {
  db.collection('plans')
  .find()
  .toArray((err,data) => {
    if(err) {
      console.log(err);
      res.end('something went wrong')
    }else {
      console.log(data);
      res.render('reja', {items:data})
    }
  } )
  
} )


module.exports = app