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
                // console.log("new data inserted")
              }
            })
          }
          if(isPresent===true){
            // console.log("data already present");
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
      // res.send(datas);  
      // console.log(datas);
      datas.sort((a, b) => {
        return b.carbonAmount - a.carbonAmount;
      });
    let newData=datas.map((element)=>{
      cVal=element.carbonAmount
      color="green"
      if(cVal>0.5){
        color="notGreen"
      }
      else if(cVal>0.3 && cVal<=0.5){
        color="semiGreen"
      }
      ss=element.webUrl
      ss=ss.substr(0,30)
        dt ={
          webUrl:ss,
          carbonAmount:element.carbonAmount,
          color:color
        }
        return JSON.stringify(dt)
      
    })
    // console.log(newData)
    // console.log(typeof(newData))
      res.send(`<!DOCTYPE html>
      <html>
        <head>
          <title>co2 calculator</title>
        </head>
        <style>
          body{
          background-color: black;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      }
      
      .container{  
          margin: 50px;
      
      }
      .heading{
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 60px;
          font-size: 25px;
          letter-spacing: 1px;
          color: white;
          background-color: rgb(82, 81, 81);
          border-radius: 20px;
          margin: 15px 0px;
      }
      
      .insertions{
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 50px;
          margin: 15px 0px;
          color: white;
          background-color: rgb(82, 81, 81);
          border-radius:20px;
      }
        </style>
       <body>
          <div id="root" class="container">
            <div class="heading">
              <div class="name">Website</div>
              <div class="amount">CO2 Used</div>
              <div class="type">Type</div>
            </div>
          </div>
       </body>
       <script>
        let dummyData=[{amount:20, webURL:"123.com"}]
        const arr=[${newData}] || []
        console.log(arr)
        arr.forEach(element => {
        const parentDiv =document.createElement('div');
        parentDiv.classList.add("insertions")
        const nameDiv= document.createElement('div');
        nameDiv.innerText=element.webUrl;
        const amountDiv= document.createElement('div');
        amountDiv.innerText=element.carbonAmount;
        const typeDiv= document.createElement('div');
        typeDiv.innerText=element.color;
        parentDiv.appendChild(nameDiv);
        parentDiv.appendChild(amountDiv);
        parentDiv.appendChild(typeDiv);

        const mainNode= document.getElementById("root");
        mainNode.appendChild(parentDiv);
        });
    </script>
      </html>`)
      }
    }
    );   
})

app.listen(3000, ()=>{
    console.log("port started on 3000");
})

