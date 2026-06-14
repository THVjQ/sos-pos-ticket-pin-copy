# SOS POS — Ticket PIN One-Click Copy

**Version:** 1.8 · **Site:** app.sospos.com.au

Click any ticket number (e.g. `A0935`) on the SOS POS board to copy it to the clipboard instantly. No more manually highlighting and copying.

---

## What It Does

- Adds a **click-to-copy** handler to every ticket PIN on the board
- Shows a **"Click to Copy PIN"** tooltip on hover
- Copies the PIN to the clipboard on click
- Prevents the click from accidentally opening the ticket

---

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Chrome
2. Click **Raw** on the `.user.js` file in this repo
3. Tampermonkey will prompt to install — click **Install**
4. Open the SOS POS board — ticket PINs are now clickable

---

## Notes

- No configuration required
- Uses `data-copy-enabled` attribute to avoid adding duplicate listeners on re-renders

---

## Using Multiple Scripts

If you are using several of the THVjQ Tampermonkey scripts, check the **Issues** tab — a multi-script addon with live updates across all scripts is in progress.
