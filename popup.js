const toggle = document.getElementById("toggle");

async function activeTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id;
}

// On open: reflect whether the sidebar is currently visible in the switch.
(async () => {
  const tabId = await activeTabId();
  if (!tabId) return;
  const [inj] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      if (location.hostname === "mail.google.com") {
        const expanded = document
          .querySelector('[aria-label="Main menu"]')
          ?.getAttribute("aria-expanded");
        return expanded == null ? null : expanded === "true";
      }
      const wrap = document.querySelector("#side")?.parentElement;
      return wrap ? wrap.style.display !== "none" : null; // true = visible
    },
  });
  if (inj?.result != null) toggle.checked = inj.result;
})();

// On change: flip the sidebar (same logic as the keyboard shortcut).
toggle.addEventListener("change", async () => {
  const tabId = await activeTabId();
  if (!tabId) return;
  await chrome.scripting.executeScript({ target: { tabId }, files: ["toggle.js"] });
});
