# Roster website

Marketing site for Roster, a verified, anonymous community where college athletes share first-hand insights on program culture, coaching staffs, NIL and the transfer portal.

Plain HTML, CSS and JavaScript, so there's no build step.

| Page | File |
| --- | --- |
| Home + waitlist | `index.html` |
| Conferences by the numbers | `conferences.html` (`conferences.js`) |
| Find your fit | `fit.html` (`fit.js`) |

Shared styles and design tokens live in `styles.css`; `roster.js` holds the waitlist form and the Football / Basketball toggle.

## Run it

- **Codespaces:** open the repo in a codespace; the site starts on port 3000 and opens in a preview.
- **Locally:** `npm start`, then visit http://localhost:3000, or just open `index.html` in a browser.

The waitlist form has no backend yet: it validates the email and shows a confirmation on the page.
