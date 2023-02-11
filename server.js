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
  // console.log(data);
  carbonFootprint=data.carbonAmount
  newUrl=data.url
  // Do something with the data, such as save it to a database.
  // res.send({ message: "Data received." });
  
  Profile.find((err, datas)=>{
    if(err){
      console.log(err);
    }
    else{
        isPresent=false;
          for(let i=0;i<datas.length;i++){
            if(datas[i].webUrl===newUrl){
              isPresent=true;
              // console.log("Already present");
              // break;
            }
          }
          if(isPresent===false){
            var new_profile = new Profile({ webUrl: newUrl, carbonAmount: carbonFootprint })
            
              new_profile.save(function(err,result){
              if (err){
                  console.log(err);
              }
              else{
                console.log("new data inserted")
              }
            })
          }
          if(isPresent===true){
            console.log("data already present");
          }
        }
    }
    );   

});

 
// mongoose.connection.close();

app.get("/", (req,res)=>{
  
  Profile.find((err, datas)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(datas);   
          // for(let i=0;i<datas.length;i++){
    
          //   // console.log(datas[i].webUrl,"->",datas[i].carbonAmount);
          // }
      }
    }
    );   
})

app.listen(3000, ()=>{
    console.log("port started on 3000");
})

