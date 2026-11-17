# Kudzu Tracker

Kudzu Tracker is a map for finding, reporting, and learning about kudzu, the fast-growing vine that covers fences, trees, and hillsides across the American South. It focuses on North Carolina, with an option to view past kudzu observations across the whole United States.

## How the app is laid out

- **Sidebar (left):** search for an address, see summary numbers, and browse the most recent sightings.
- **Map (right):** a full-height map with terrain or aerial imagery, your reported sightings, and past observations.
- **Top bar:** the buttons for the main features described below.

## Top bar buttons (in order)

### Kudzu story

A 32-page guide in eight sections, from an introduction through how kudzu arrived in the US, how to recognize it, why it spreads so fast, what it costs the land, how it affects North Carolina, how to fight it, and a conclusion. Use **Previous** and **Next** to move through the pages, or pick a section or page from the list on the left.

- **Where the content comes from:** the text was written for this app. It is not taken from a published source, so verify the facts before publishing it widely.

### Show all US sightings / Show North Carolina only (teal button)

Switches the map between North Carolina and the whole country.

- In North Carolina view, the map stays zoomed to the state.
- In US view, the map zooms out to the whole country and the top bar shows a note with the record count and data attribution.
- The button toggles back and forth.

### Identify a photo (blue button)

Lets you upload a photo and check whether it looks like kudzu.

1. Choose a photo (JPG, PNG, WebP, or GIF, up to 5 MB) and press **Check photo**.
2. The result shows whether it looks like kudzu, a confidence level, a short explanation, and any look-alike plants it could be confused with.
3. Below the result, the report fields (location, place name, notes) are available. Submitting uses the same photo to add a sighting to the map.

- **Where the check comes from:** an AI image model, run through a secure server function.
- **Setup needed:** the photo check requires an OpenAI API key. Until one is added, the check shows a "not set up" message. Submitting sightings still works.
- The result is an automated guess. Confirm in person before acting on it.

### Pictures (amber button)

Shows six illustrations of kudzu in the ways people usually see it: leaves, covering a hillside, climbing trees and poles, along roadsides, stems and flowers, and covering buildings.

- **Where the pictures come from:** they are AI-generated illustrations, not photographs of specific places. Each one is labeled that way.

### Report sighting

Adds a kudzu sighting to the map. Enter the latitude and longitude (or press **Use my location**), add an optional place name, notes, and an optional photo, then submit.

- Sightings must be inside North Carolina.
- Your sighting appears as a yellow dot and in the recent sightings list.
- **Where the data is stored:** your app's database and photo storage.

## Map features

- **Terrain and aerial views:** a layer switcher in the top-right corner of the map switches between the terrain map and aerial imagery.
- **Select an area:** press **Select area** (available when zoomed in to level 15 or closer), then drag over an area. The app lists the sightings inside it and offers **Report kudzu in this area**.
- **Find a location:** the sidebar search moves the map to an address in North Carolina.
- **Dots on the map:**
  - **Yellow dots:** sightings submitted through this app, with a glowing ring around each one.
  - **Blue dots:** past kudzu observations from the Global Biodiversity Information Facility (see below).

## Summary numbers

The sidebar's summary card shows the total number of sightings, how many include a photo, how many include a place name, and the date of the latest sighting.

## Where the data comes from

| Data | Source | Where it is stored | Notes |
| --- | --- | --- | --- |
| Yellow dots (your sightings) | Entered by users in the Report sighting form | The app's database and photo storage | Only sightings within North Carolina are shown on the map |
| Blue dots (past observations) | Global Biodiversity Information Facility (GBIF), a public database of wildlife observations from museums, universities, and citizen-science projects | The app's database | Records for the two kudzu species found in the US (*Pueraria montana* and *Pueraria lobata*), with coordinates |
| Terrain map | Esri World Topo Map tiles | Served live, not stored | Shows terrain and landforms |
| Aerial imagery | USDA NAIP imagery, served live | Served live, not stored | Current aerial photos of the United States |
| Address search | OpenStreetMap Nominatim | Not stored | Results are limited to North Carolina |
| Photo check | An AI image model via a secure server function | Not stored by the app | Requires an OpenAI API key |
| Kudzu story | Written for this app | In the app's code | Verify before publishing |
| Pictures | AI-generated illustrations | In the app's public files | Labeled as illustrations |

### Important limitations

- **Blue dots are not confirmed kudzu.** They are past human observations, so a dot means someone reported kudzu there, not that it has been verified.
- **The US data is incomplete.** About 10,780 of an expected 13,500 records have been imported so far. Some locations are missing from the map.
- **Some GBIF records are non-commercial only.** Several records are licensed CC BY-NC. Check the licensing before using the app commercially or publishing the blue dots in a commercial product.
- **Yellow dots are only as accurate as the reports.** The app does not verify reported sightings.

## Website version history

This is a curated history of the important website changes, listed newest first. README-only updates and the initial project import are intentionally left out.

1. **Add GBIF and user kudzu sightings** — Nov 14, 2:44 PM
   Added the two map data sources: blue historical observations from GBIF and yellow user-submitted sightings.
2. **Update toggle button color to teal** — Nov 14, 2:42 PM
   Updated the North Carolina and whole-US map toggle to make it easier to recognize as a map control.
3. **Move Kudzu button to top-bar front** — Nov 14, 2:33 PM
   Moved the Kudzu Story action to the front of the top bar so the guide is easier to find.
4. **Add Kudzu Story window and button** — Nov 14, 2:28 PM
   Added the multi-page guide about kudzu, its spread, effects, and management.
5. **Show report fields on window open** — Nov 14, 9:36 AM
   Made the reporting fields visible when the reporting window opens.
6. **Integrate report form into photo check** — Nov 14, 9:26 AM
   Connected photo identification with the option to submit the identified plant as a sighting.
7. **Update map to show NC reports by default** — Nov 14, 9:23 AM
   Set North Carolina as the starting map view for user reports.
8. **Add US kudzu occurrence map layer** — Nov 14, 8:34 AM
   Added historical US kudzu observations as a separate map layer.
9. **Add photo identification feature** — Nov 14, 8:25 AM
   Added photo upload and AI-assisted kudzu identification.
10. **Restructure app layout to match screenshot** — Nov 14, 8:15 AM
    Changed the website to a left sidebar with search and summary information beside a full-height map.
11. **Add terrain map option** — Nov 13, 5:55 PM
    Added terrain as an alternative to aerial imagery.
12. **Add Kudzu Pictures Tab** — Nov 13, 5:50 PM
    Added the picture gallery with examples of kudzu in different settings.
13. **Add Model Accuracy tab** — Nov 13, 5:13 PM
    Added information explaining the AI identification model's accuracy and limitations.
14. **Add NAIP aerial imagery layer** — Nov 6, 7:27 PM
    Added USDA NAIP aerial imagery as a live map layer.
15. **Display latest imagery date from Esri** — Nov 6, 7:19 PM
    Added the latest available imagery date to the map controls.
16. **Add Open in Google Earth link** — Nov 6, 7:09 PM
    Added a link for opening the selected map location in Google Earth.
17. **Add address lookup and search box** — Nov 6, 7:02 PM
    Added address search to move the map to a North Carolina location.
18. **Add zoom-gated area selection to satellite tab** — Nov 6, 6:59 PM
    Added the ability to select a map area when zoomed in closely enough.
19. **Update kudzu sightings to yellow** — Nov 6, 6:47 PM
    Made user-submitted sightings yellow so they are distinct from historical observations.
20. **Add pulsing ring to map sightings** — Nov 6, 6:46 PM
    Added a visual ring around user-submitted sighting markers.
21. **Restrict Kudzu Tracker to NC** — Nov 6, 6:44 PM
    Limited address search and user sighting reports to North Carolina.
22. **Recreate satellite map component** — Nov 6, 6:41 PM
    Rebuilt the main map experience for the Kudzu Tracker interface.
23. **Add satellite map sightings** — Nov 6, 6:40 PM
    Added sighting markers to the map.
24. **Create Kudzu Tracker app** — Nov 6, 6:36 PM
    Created the initial app with a map, reporting flow, address search, summary information, and picture gallery.

## Development notes

- Built with React, TypeScript, and Vite. The map uses Leaflet.
- Data and photo storage, plus the photo-check server function, run on Supabase.
- Build with `npm run build` and lint with `npx oxlint src`.
- The Supabase connection details are provided by the project environment and are not stored in this file.

---

## Original template notes

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
