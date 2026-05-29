const toggle = document.getElementById("toggle");

async function activeTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id;
}

// On open: read whether the sidebar is currently visible and match the switch.
(async () => {
  const tabId = await activeTabId();
  if (!tabId) return;
  const [injection] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      const sidebar = document.querySelector("#side")?.parentElement;
      return sidebar ? sidebar.style.display !== "none" : null;
    },
  });
  if (injection?.result != null) toggle.checked = injection.result;
})();

// On change: apply the switch state to the page explicitly (show or hide).
toggle.addEventListener("change", async () => {
  const tabId = await activeTabId();
  if (!tabId) return;
  await chrome.scripting.executeScript({
    target: { tabId },
    func: (visible) => {
      const sidebar = document.querySelector("#side")?.parentElement;
      if (!sidebar) return;
      sidebar.style.display = visible ? "" : "none";
      const header = sidebar.parentElement?.querySelector("header");
      if (header) header.style.display = visible ? "" : "none";
    },
    args: [toggle.checked],
  });
});
