let totalUsage = 0;

// Listen for incoming network requests
browser.webRequest.onBeforeRequest.addListener((details) => {
  totalUsage += details.totalSize;
  document.getElementById("data-usage").textContent = `Total Usage: ${totalUsage / 1024 / 1024} MB`;
}, { urls: ["<all_urls>"] }, ["requestBody"]);
