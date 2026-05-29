# WhatsApp Web Sidebar Toggle

Hide/show the WhatsApp Web sidebar (chat list) - handy when you share your screen and don't want your other conversations visible.

- **Shortcut:** `Ctrl + Shift + S` (Mac: `Cmd + Shift + S`)
- **Icon:** click opens a switch that reflects the current state

Loaded as an unpacked extension, it has no `update_url`, so it **never auto-updates**. The code only changes when you change it.

When the sidebar is hidden, the thin (sub-pixel, ~0.8px) left/right borders of the chat panels - which would otherwise show as two faint vertical lines at the chat edges - are zeroed as well. This is reversible: bringing the sidebar back restores the borders.

## Permissions
- `activeTab` + `scripting` - access to the active tab only, and only when you trigger the extension manually. No host permissions, no access to other tabs, no network.

## Installation (unpacked)
1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. **Load unpacked** -> select this folder
4. (Optional) check the shortcut at `chrome://extensions/shortcuts`

## Shortcut check
If `Ctrl+Shift+S` does nothing, another app or extension is probably using it - reassign it at `chrome://extensions/shortcuts`.

## Original / attribution
Based on the **WhatsApp Web Sidebar Toggle** extension (author: `julianilevy`) from the Chrome Web Store:

- ID: `meoojinhimemkeehlhbojjhnchhgpbak`
- https://chromewebstore.google.com/detail/whatsapp-web-sidebar-togg/meoojinhimemkeehlhbojjhnchhgpbak

The original was reviewed (extracted from its CRX package) and judged safe - only `activeTab` + `scripting`, no network and no data collection. This build is a clean rewrite of that code:

- removed `update_url` (no auto-update)
- fixed the `func` property in `chrome.scripting.executeScript` (the original used the non-existent `function`)
- `Ctrl+Shift+S` works on its own, regardless of whether the popup is open (the original depended on the popup for this)
- added a fix for the two vertical lines at the chat edges (zeroing the sub-pixel borders)

There is also a separate, similarly named project `sanjeed5/whatsapp-sidebar-hider` - a different author, not the source of this build.
