
let carbonFootprint=0
let newUrl=""
let data={}
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Check if the message is from the content script and contains the data size
    if (request.dataSize) {
      // Calculate the carbon footprint based on the data size (11g of CO2 per GB)
      carbonFootprint = request.dataSize / 1024 / 1024 * 11 / 1000;
      newUrl=request.url
      // Store the carbon footprint in the local storage
      footprintHistory = JSON.parse(localStorage.getItem("footprintHistory")) || [];
      footprintHistory.push({ url: request.url, carbonFootprint: carbonFootprint });
      localStorage.setItem("footprintHistory", JSON.stringify(footprintHistory));
      
      // Send the carbon footprint back to the content script
      data = {
        carbonAmount: carbonFootprint,
        url: newUrl
      };

      fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });

      sendResponse({ carbonFootprint: carbonFootprint });
    }
  })
