# Solutions that Sell

Weekly partner picks, supplier rotations and specials for [5ymarketing.com](https://www.5ymarketing.com).

| File | What it holds | How it changes |
|---|---|---|
| `feed.json` | Partner picks from Innovation Line, Twintech and Rupt, plus the partner list | Refreshed every Tuesday by the scheduled update |
| `capamerica.json` | Cap America styles from the Midyear New Styles and Holiday catalogs | Rotates 4 per week on its own; holiday styles through Dec 31, knits through Mar 31 |
| `uma.json` | uma Plastic and Metal pens from the uma News 2026 catalog | Rotates 2 + 2 per week on its own |
| `pei.json` | PEI styles (Callaway, Original Penguin, PGA TOUR) from the 2026 catalog | Rotates on its own; fills the main grid |
| `videos.json` | Supplier videos for the Watch & Sell page: Stormtech (Cloudinary), Innovation Line and uma (YouTube), Cap America (Vimeo). Each video has a category for the Browse All Videos library; `skip` keeps a video out of the weekly picks; `seasons` sets which categories are featured by month | Rotates 6 per week on its own; Tuesday update fills in missing Innovation Line names |
| `specials.json` | Supplier specials and closeouts | Added from flyers; offers with an end date disappear after it |
| `embed.js` | Draws the home page (Partner of the Week, rotating Tuesdays through the partner list in `feed.json`, plus one pick from each other partner), the Solutions that Sell page, the Specials page and the Watch & Sell videos page | — |

All rotations change on Tuesdays (Central time). Preview: https://5ychris.github.io/Solutions-that-Sell/
