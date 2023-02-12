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
        datas.forEach(element => {
          console.log(element)
          const parentDiv =document.createElement('div');
          parentDiv.classList.add("insertions")
          const nameDiv= document.createElement('div');
          nameDiv.innerText=element.webUrl;
          const amountDiv= document.createElement('div');
          amountDiv.innerText=element.carbonAmount;
          const typeDiv= document.createElement('div');
          typeDiv.innerText="none";
          parentDiv.appendChild(nameDiv);
          parentDiv.appendChild(amountDiv);
          parentDiv.appendChild(typeDiv);
          
          const mainNode= document.getElementById("root");
          mainNode.appendChild(parentDiv);
        });
    }})}
    )