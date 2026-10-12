// Keyboard shortcut handler (Ctrl+Shift+S / Cmd+Shift+S).
// Toggles the sidebar on the active tab (WhatsApp Web or Gmail, see toggle.js).
// Works whether or not the popup is open. activeTab is granted by the command
// gesture.
chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle") return;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return;
    chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["toggle.js"] });
  });
});
