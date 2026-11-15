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
