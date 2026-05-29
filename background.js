// Keyboard shortcut handler (Ctrl+Shift+S / Cmd+Shift+S).
// Flips the WhatsApp Web sidebar on the active tab. Works whether or not
// the popup is open — no message passing, no dependency on popup state.
chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle") return;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const sidebar = document.querySelector("#side")?.parentElement;
        if (!sidebar) return;
        const visible = sidebar.style.display !== "none";
        sidebar.style.display = visible ? "none" : "";
        const header = sidebar.parentElement?.querySelector("header");
        if (header) header.style.display = visible ? "none" : "";
      },
    });
  });
});
