# Ask the Map – Muscat

Real OpenStreetMap map of Muscat + AI answers in English, Hindi and French.

## Files
- `index.html`  – the web app (Leaflet map, search, categories, language switch)
- `api/ask.js`  – small server function that talks to the AI (keeps the API key secret)

## Run the map only (no setup)
Double-click `index.html`. The map, search and place info work. AI answers will not (they need the server function).

## Get AI answers (free)
1. Get a free API key from Google AI Studio (https://aistudio.google.com) .
2. Put this folder in a GitHub repo and import it on https://vercel.com (free plan).
3. In Vercel > Settings > Environment Variables add:
   - `GEMINI_API_KEY` = your key
   - `GEMINI_MODEL`   = a current free model name shown in AI Studio (default in code may be outdated)
4. Redeploy. Open your Vercel link: tap a place and ask a question.

Never put the API key inside index.html.

## Data credits
Map and places: OpenStreetMap contributors (ODbL). Search: Nominatim. Places: Overpass API.
These public servers are for light use, which is fine for a school project.
