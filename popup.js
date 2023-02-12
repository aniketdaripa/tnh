let totalUsage = 0;

// Listen for incoming network requests
browser.webRequest.onBeforeRequest.addListener((details) => {
  totalUsage += details.totalSize;
  document.getElementById("toatlCarbon").textContent = `Total Usage: ${totalUsage / 1024 / 1024} MB`;
}, { urls: ["<all_urls>"] }, ["requestBody"]);


function myFunction(){
  window.location.href = "http://www.w3schools.com";

// Simulate an HTTP redirect:
  window.location.replace("http://www.w3schools.com");
}