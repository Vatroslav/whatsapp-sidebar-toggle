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
  await chrome.scripting.executeScript({ target: { tabId }, func: toggleSidebar });
});

// Injected into the page. Kept identical to background.js#toggleSidebar.
function toggleSidebar() {
  const wrap = document.querySelector("#side")?.parentElement;
  if (!wrap) return;
  const header = wrap.parentElement?.querySelector("header");
  const hidden = wrap.style.display === "none";

  if (hidden) {
    wrap.style.display = "";
    if (header) header.style.display = "";
    document.querySelectorAll("[data-wast-border]").forEach((el) => {
      el.style.removeProperty("border-left-width");
      el.style.removeProperty("border-right-width");
      el.removeAttribute("data-wast-border");
    });
  } else {
    wrap.style.display = "none";
    if (header) header.style.display = "none";
    const minH = window.innerHeight * 0.4;
    const toFix = [];
    document.querySelectorAll("#app *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height <= minH) return;
      const s = getComputedStyle(el);
      if (parseFloat(s.borderLeftWidth) > 0 || parseFloat(s.borderRightWidth) > 0) {
        toFix.push(el);
      }
    });
    toFix.forEach((el) => {
      el.setAttribute("data-wast-border", "1");
      el.style.setProperty("border-left-width", "0", "important");
      el.style.setProperty("border-right-width", "0", "important");
    });
  }
}
