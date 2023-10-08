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

// app.post('/create-item', (req, res) =>  {
//    console.log('user entered /create-item');
//    const new_reja = req.body.reja
//    db.collection('plans').insertOne({reja: new_reja} , (err,data) =>{
    
//     res.json(data.ops[0])
//    }  )
// })

app.post("/create-item", function (req, res) {
  console.log("user entered /create-item");
  console.log(req.body);
  const new_reja = req.body.reja;
  // Code with MongoDB
  const newReja = req.body.reja;
  db.collection("plans").insertOne({ reja: newReja }, (err, data) => {
    if (err) {
      console.log(err);
      res.end("Something went wrong");
    } else {
      console.log(data.ops);
      res.json(data.ops[0]);
      // res.end("Successfully added");
    }
  });
  // res.json({ test: "success" });
});



app.post("/delete-item", function (req, res) {
  const id = req.body.id;

  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function (err, data) {
      if (data) {
        res.json({ state: "Deleted" });
      } else {
        err;
      }
    }
  );
});

app.post("/edit-item", (req, res) => {
  const data = req.body;
  db.collection("plans").findOneAndUpdate(
    {
      _id: new mongodb.ObjectID(data.id),
    },
    { $set: { reja: data.new_input } },
    function (err, data) {
      if (data) {
        res.json({ state: "Edited" });
      } else {
        err;
      }
    }
  );
});
  

// app.get('/', (req, res) => {
//   db.collection('plans')
//   .find()
//   .toArray((err,data) => {
//     if(err) {
//       console.log(err);
//       res.end('something went wrong')
//     }else {
//       console.log(data);
//       res.render('reja', {items:data})
//     }
//   } )
  
// } )
app.get("/", (req, res) => {
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log("Error", err);
        res.end("Something went wrong");
      } else {
        console.log("Data", data);
        res.render("reja", { items: data });
      }
    });
  // console.log("req.body", req);
  // res.render("project");
});


module.exports = app