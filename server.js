const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
///database
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority');
  console.log("Database connected")
}


const profileSchema = new mongoose.Schema({
    webUrl: String,
    carbonAmount: Number
  });
const Profile = mongoose.model('Profile', profileSchema);

let carbonFootprint=0;
let newUrl = "";

app.get("localhost:3000", (req,res)=>{
  console.log(res);
})
app.post("/submit", (req, res) => {
  const data = req.body;
  console.log(data);
  carbonFootprint=data.carbonAmount
  newUrl=data.url
  // Do something with the data, such as save it to a database.
  // res.send({ message: "Data received." });
  
  var new_profile = new Profile({ webUrl: newUrl, carbonAmount: carbonFootprint })
  
    new_profile.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
      console.log("new data inserted")
    }
  })
});





// app.get("/",(req,res)=>{
//   res.sendFile(__dirname+"/index.html")
// })
// app.post("/", (req, res)=>{
//   const arr = [{ webUrl: newUrl, carbonAmount: carbonFootprint }];
//   Profile.insertMany(arr, function(error, docs) {
//           if(error){
//               console.log(error);
//           }
//           else{
//               console.log("successfully inserted");
//           }
//   })
//   res.send(`<h1>Data inserted</h1>`)
// })

app.listen(3000, ()=>{
    console.log("port started on 3000");
})

