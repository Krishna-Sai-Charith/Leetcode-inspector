function injectScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["./temp.js"], // Ensure the path is correct
  });
}

// Inject the script into all current LeetCode tabs
chrome.tabs.query({ url: "*://*.leetcode.com/*" }, function(tabs) {
  tabs.forEach((tab) => {
    injectScript(tab.id);
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['extensionEnabled'], function(result) {
    if (result.extensionEnabled !== false) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showModal,
      });
    }
  });
});

// You may remove this `showModal` function if it's already defined in `temp.js` and reused here.
function showModal() {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <div class="cha-div">
      <div class="cha-content">
        <span class="close">&times;</span>
        <h1>Hey Coder!!</h1>
        <p>Coding requires practice and perseverance. 
        <br>Joy and growth come from independently solving problems and writing code.</p>
        <style>
          .cha-div {
            display: block;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: #42424241;
          }
          .cha-content {
            background-color: #f1f2f2;
            margin: 300px auto;
            border-radius: 8px;
            color: #424242;
            font-family: "Mulish", sans-serif;
            padding: 30px;
            width: 25%;
          }
          @media screen and (max-width: 900px) {
            .cha-content {
              width: 25%;
            }
          }
          .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close:hover,
          .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          h1{
            margin-bottom:10px;
            color:black;
            font-weight:bold;
            font-size:1.25rem;
          }
        </style>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);
  const closeButton = document.querySelector('.close');
  const modal = document.querySelector('.cha-div');
  closeButton.addEventListener('click', function () {
    modal.remove();
  });
}
