
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.dataSize) {
      // Calculating the carbon footprint  (11g of CO2 per GB)
      let carbonFootprint = request.dataSize / 1024 / 1024 * 11 / 1000;
  
      // Storing the carbon footprint in the local storage
      let footprintHistory = JSON.parse(sessionStorage.getItem("footprintHistory")) || [];
      footprintHistory.push({ url: request.url, carbonFootprint: carbonFootprint });
      sessionStorage.setItem("footprintHistory", JSON.stringify(footprintHistory));
  
      // Sending the carbon footprint back to the content script
      sendResponse({ carbonFootprint: carbonFootprint });
    }
  });

 