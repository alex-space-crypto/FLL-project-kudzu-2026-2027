# Project memory

## Product intent & audience

- Sighting/mapping web app (vite-react): users search addresses, view summary stats and recent sightings, browse pictures, and report sightings on an interactive map.
- Summary currently shows sighting counts; detection-result features are not backed by data yet.

## Brand personality & voice

- Tone is practical and feature-oriented; UI labels are direct (e.g., "Pictures", "Report sighting").

## Visual design & UX direction

- Layout: left sidebar + full-height map; no tab bar.
- Sidebar: address search, summary stats, recent sightings list.
- Map area: top bar with action buttons; select-area tools overlaid on the map.
- Shared popup window used for both Pictures and Report sighting/detail views.
- Stylesheet was fully rewritten to remove legacy tab/header layout rules.

## Decisions, constraints & rationale

- Restructured from a two-tab layout (form+gallery / map) to sidebar+map to match a reference screenshot.
- Dropped screenshot features lacking data: satellite source picker, "Run Detection Scan" button, severity filter + legend, Story button.
- Build and lint pass; new layout not yet browser-verified.

## Open questions & assumptions

- Satellite source picker, detection scan, severity filter/legend, and Story button may be future features once data exists.
- Popup window is assumed sufficient for both Pictures and Report detail flows.
- Map is assumed to support programmatic fly-to for address search results.