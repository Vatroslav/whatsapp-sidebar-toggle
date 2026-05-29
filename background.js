// Keyboard shortcut handler (Ctrl+Shift+S / Cmd+Shift+S).
// Toggles the WhatsApp Web sidebar on the active tab. Works whether or not
// the popup is open. activeTab is granted by the command gesture.
chrome.commands.onCommand.addListener((command) => {
  if (command !== "toggle") return;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return;
    chrome.scripting.executeScript({ target: { tabId: tab.id }, func: toggleSidebar });
  });
});

// Injected into the page. Hides/shows the sidebar (chat list + its header).
// When hiding, it also zeroes the thin (sub-pixel) left/right borders on the
// full-height chat panels that get revealed at the chat edges once the sidebar
// is gone - these show up as two faint vertical lines. The change is reversible:
// touched elements are tagged with data-wast-border and restored on show.
function toggleSidebar() {
  const wrap = document.querySelector("#side")?.parentElement;
  if (!wrap) return;
  const header = wrap.parentElement?.querySelector("header");
  const hidden = wrap.style.display === "none";

  if (hidden) {
    // SHOW: restore sidebar, header, and any borders we zeroed.
    wrap.style.display = "";
    if (header) header.style.display = "";
    document.querySelectorAll("[data-wast-border]").forEach((el) => {
      el.style.removeProperty("border-left-width");
      el.style.removeProperty("border-right-width");
      el.removeAttribute("data-wast-border");
    });
  } else {
    // HIDE: collapse sidebar + its header.
    wrap.style.display = "none";
    if (header) header.style.display = "none";
    // Read phase: collect full-height elements that carry a side border.
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
    // Write phase: zero them (separate loop avoids layout thrashing).
    toFix.forEach((el) => {
      el.setAttribute("data-wast-border", "1");
      el.style.setProperty("border-left-width", "0", "important");
      el.style.setProperty("border-right-width", "0", "important");
    });
  }
}
