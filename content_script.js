

let leetcodeObject=null;
chrome.tabs.query({}, function (tabs) {
  leetcodeObject =tabs.find((tabObject) =>
      tabObject.url.includes("leetcode")
    );
    chrome.scripting
        .executeScript({
          target: { tabId: leetcodeObject.id },
          files: ["./temp.js"],
        })
        .then(() => console.log("script injected"));
    });
    
console.log("temp");
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    func : showModal,
  });
})