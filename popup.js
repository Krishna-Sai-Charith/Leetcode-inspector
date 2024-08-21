document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['extensionEnabled'], function(result) {
    let extensionEnabled = result.extensionEnabled !== false;
    const btn = document.getElementById('turn-off');
    const inspectorText = document.getElementById('inspector-text');

    // Initialize button and text based on the current state
    btn.textContent = extensionEnabled ? 'Turn off' : 'Turn on';
    inspectorText.textContent = extensionEnabled ? 'Inspector is watching you 👀' : 'Extension deactivated';

    // Toggle button action
    btn.addEventListener('click', function() {
      extensionEnabled = !extensionEnabled;
      chrome.storage.local.set({ extensionEnabled: extensionEnabled }, function() {
        btn.textContent = extensionEnabled ? 'Turn off' : 'Turn on';
        inspectorText.textContent = extensionEnabled ? 'Inspector is watching you 👀' : 'Extension deactivated';
      });
    });
  });
});
