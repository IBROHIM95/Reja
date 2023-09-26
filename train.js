console.log("Jack Ma maslahatlari");

const list = [
    "yaxshi talaba boling", //0-20
    "togri boshliq tanlang va koproq xato qiling",//20-30
     "ozizga ishlashnui boshlang", //30-40
     "siz kuchli bolgan narsalarniqiling", //40-50
     "yoshlarga invistitsiyaqiling", //50-60
     "endi dam oling" //60
]
function maslahatBering(a, callback) {
    if(typeof a !== "number") callback("insert a number", null)
    else if(a<= 20) callback(null, list[0])
    else if(a> 20 && a <=30) callback(null, list[1])
    else if(a> 30 && a<=40 ) callback(null, list[2])
    else if(a>40 && a<=50) callback(null, list[3])
    else if(a> 50 && a<= 60 ) callback(null, list[4])
    else {
     setInterval(function() {
        callback(null, list[5])
     },1000 )
     }
}
console.log(1);
maslahatBering(67, (err,data) => {
    if(err) console.log("ERROR", err);
    console.log("javob:", data);
})


console.log(2); 

//  async function maslahatBering(a) {
//     if(typeof a !== "number") throw new Error("insert a number")
//     else if(a<= 20) return list[0]
//     else if(a> 20 && a <=30) return list[1]
//     else if(a> 30 && a<=40 ) return list[2]
//     else if(a>40 && a<=50) return list[3]
//     else if(a> 50 && a<= 60 ) return list[4]
//     else {
//         return new Promise ((resolve, reject) =>{
//             setInterval(() =>{
//                 resolve(list[5])
//             }, 5000 ) // async da setInterval bir marta yuradi
//         } )
//      }
// }
// console.log(1);
// maslahatBering(25)
// .then((data) => {
//     console.log("javob:", data)
// })
// .catch((err) => {
//     console.log("ERROR", err);
// } )

// console.log(2);

// async function yugur() {
//     let javob = await maslahatBering(5);
//     console.log(javob);
//     javob = await maslahatBering(3);
//     console.log(javob);
//     javob = await maslahatBering(80);
//     console.log(javob);
// }
// yugur()