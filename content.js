
chrome.runtime.sendMessage({ dataSize: document.body.offsetWidth * document.body.offsetHeight * 4, url: window.location.href }, function (response) {
  // Show the carbon footprint in the page
  carbonFootprint = response.carbonFootprint;
  document.body.innerHTML += `<div style="position:fixed;bottom:0;right:0;background-color:white;padding:10px;">Carbon Footprint: ${carbonFootprint} kg of CO2</div>`;
});



// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   // Check if the message is from the content script and contains the data size
//   if (request.dataSize) {
//     // Calculate the carbon footprint based on the data size (11g of CO2 per GB)
//     let carbonFootprint = request.dataSize / 1024 / 1024 * 11 / 1000;
//     newUrl=request.url;

//   }
// });
//