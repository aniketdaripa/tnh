chrome.runtime.sendMessage({ dataSize: document.body.offsetWidth * document.body.offsetHeight * 4, url: window.location.href }, function (response) {
    // Show the carbon footprint in the page
    let carbonFootprint = response.carbonFootprint;
    document.body.innerHTML += `<div style="position:fixed;bottom:0;right:0;background-color:white;padding:10px;">Carbon Footprint: ${carbonFootprint} kg of CO2</div>`;
  });
  
  
  
  