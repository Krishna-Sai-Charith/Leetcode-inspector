let extensionEnabled = true; // Initial state

// Toggle the extension on or off
function toggleExtension() {
  extensionEnabled = !extensionEnabled;
  chrome.storage.local.set({ extensionEnabled: extensionEnabled });

  const btn = document.getElementById('turn-off');
  const inspectorText = document.getElementById('inspector-text');
  
  if (extensionEnabled) {
    btn.textContent = 'Turn off';
    inspectorText.textContent = 'Inspector is watching you 👀';
    enablePastePrevention(); // Enable paste prevention when the extension is on
  } else {
    btn.textContent = 'Turn on';
    inspectorText.textContent = 'Extension deactivated';
    disablePastePrevention(); // Disable paste prevention when the extension is off
  }
}

// Function to prevent paste operation and show modal
function preventPaste(event) {
  const isPasteShortcut = (event.ctrlKey && event.code === 'KeyV') || (event.shiftKey && event.code === 'Insert');
  const isRightClick = event.type === 'contextmenu';
  
  if (extensionEnabled && (isPasteShortcut || isRightClick)) {
    event.preventDefault();  // Prevent the default action (pasting or context menu)
    event.stopPropagation(); // Stop the event from propagating further

    showModal(); // Show the modal when the extension is enabled
  }
}

// Function to display the modal
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
            margin: 5% auto;
            border-radius: 8px;
            color: #424242;
            font-family: "Mulish", sans-serif;
            padding: 30px;
            width: 90%;
            max-width: 600px;
          }
          @media screen and (max-width: 600px) {
            .cha-content {
              width: 90%;
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
          h1 {
            margin-bottom: 10px;
            color: black;
            font-weight: bold;
            font-size: 1.25rem;
          }
        </style>
      </div>
    </div>`
  ;
  
  document.body.appendChild(modalContainer);

  // Add event listener to close the modal
  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', function () {
    modalContainer.remove();
  });
}

// Enable paste prevention
function enablePastePrevention() {
  document.addEventListener('keydown', preventPaste, true);
  document.addEventListener('contextmenu', preventPaste, true);
}

// Disable paste prevention
function disablePastePrevention() {
  document.removeEventListener('keydown', preventPaste, true);
  document.removeEventListener('contextmenu', preventPaste, true);
}

// Initial state check
if (extensionEnabled) {
  enablePastePrevention();
} else {
  disablePastePrevention();
}

// Add event listener to the toggle button
const btn = document.getElementById('turn-off');
if (btn) {
  btn.addEventListener('click', toggleExtension);
}
