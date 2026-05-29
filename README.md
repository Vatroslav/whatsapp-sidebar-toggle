# WhatsApp Web Sidebar Toggle (private build)

Sakrij/prikaži WhatsApp Web sidebar (popis chatova) - korisno kad dijeliš ekran i ne želiš da se vide ostali razgovori.

- **Prečac:** `Ctrl + Shift + S` (Mac: `Cmd + Shift + S`)
- **Ikona:** klik otvori prekidač koji prati trenutno stanje

Vlastiti build - ne dolazi s Chrome Web Storea, nema `update_url`, pa se **nikad ne auto-updatea**. Kod se mijenja samo kad ga ti promijeniš.

Kod skrivanja sidebara ujedno se nuliraju tanki (sub-pixel, ~0.8px) lijevi/desni borderi chat-panela koji bi se inače vidjeli kao dvije okomite crte na rubovima chata. Izmjena je reverzibilna - kad vratiš sidebar, borderi se vrate na originalno.

## Dozvole
- `activeTab` + `scripting` - pristup samo aktivnom tabu i samo kad ručno pokreneš extension. Nema host permissions, nema pristupa drugim tabovima, nema mreže.

## Instalacija (unpacked)
1. Otvori `chrome://extensions`
2. Uključi **Developer mode** (gore desno)
3. **Load unpacked** -> odaberi ovaj folder
4. (Opcionalno) provjeri prečac na `chrome://extensions/shortcuts`

## Provjera prečaca
Ako `Ctrl+Shift+S` ne radi, vjerojatno ga koristi druga aplikacija ili extension - promijeni ga na `chrome://extensions/shortcuts`.

## Original / porijeklo
Nastao po uzoru na extension **WhatsApp Web Sidebar Toggle** (autor: `julianilevy`) s Chrome Web Storea:

- ID: `meoojinhimemkeehlhbojjhnchhgpbak`
- https://chromewebstore.google.com/detail/whatsapp-web-sidebar-togg/meoojinhimemkeehlhbojjhnchhgpbak

Original je pregledan (izvučen iz CRX paketa) i ocijenjen sigurnim - samo `activeTab` + `scripting`, bez mreže i bez prikupljanja podataka. Ovaj build je čista prerada tog koda:

- maknut `update_url` (bez auto-updatea)
- ispravljen `func` property u `chrome.scripting.executeScript` (original je koristio nepostojeći `function`)
- prečac `Ctrl+Shift+S` radi samostalno, neovisno o tome je li popup otvoren (original je za to ovisio o popupu)
- dodan fix za dvije okomite crte na rubovima chata (nuliranje sub-pixel bordera)

Postoji i zasebni, slično nazvani projekt `sanjeed5/whatsapp-sidebar-hider` - drugi autor, nije izvor ovog builda.
