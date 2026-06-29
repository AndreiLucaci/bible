# Scriptum Deus

A Romanian Bible-reading web application built around a daily reading plan and the YouVersion Platform SDK.

The project began as a small Create React App project and was revived in 2026 with a React 19 and modern MUI migration. Its purpose is simple: provide a focused, readable place to follow a daily Scripture plan and, progressively, browse the Bible directly.

## What it does

### Daily reading

The main page presents the reading assigned to the selected date.

A daily plan entry has this shape:

```js
{
  date: "Luni (29 Iunie)",
  forToday: "Iov 14-16; Fapte 9:22-43"
}
```

The reading is split into Old Testament and New Testament sections. Each section is initially collapsed, and Bible text is mounted only after the section is opened. This avoids requesting passages that the reader has not chosen to view.

The selected date resets both accordion sections so that the newly selected reading starts in a clean state.

### Bible translations

The application uses the YouVersion Platform SDK to render Scripture and expose only Bible versions available to the configured YouVersion application key.

The selected version:

* applies to both Old Testament and New Testament readings;
* is persisted in `localStorage`;
* is restored on reload;
* causes mounted Bible passages to remount when changed;
* displays the translation copyright attribution returned by YouVersion.

The default translation is NTR (`126`), but the UI should not assume that any other translation is available. Translation availability is controlled by the YouVersion application configuration and licensing permissions.

### Bible route

The application includes a separate Bible route intended for full Bible browsing by version, book, and chapter.

The daily reader and Bible reader are intentionally separate components. The daily reader is driven by the reading plan; the Bible reader is intended to be driven by direct text selection.

## Technical stack

* React 19
* Create React App / `react-scripts`
* Material UI (`@mui/material`)
* MUI X Date Pickers (`@mui/x-date-pickers`)
* Emotion
* date-fns v2
* YouVersion Platform React UI and Hooks SDKs
* React Router with hash routing
* Netlify deployment

## Routing

The application uses hash routing so routes work on static hosting without requiring server-side rewrite rules.

```text
/#/daily-reading
/#/bible
```

`/daily-reading` is the primary daily reading page.

`/bible` is the full Bible-reader area.

## Daily-reading parsing

The reading plan uses Romanian book names. Before requesting Scripture from YouVersion, references are converted into USFM-style passage identifiers.

Examples:

```text
Iov 8-10       -> JOB.8, JOB.9, JOB.10
Fapte 8:26-40  -> ACT.8.26-40
Romani 1       -> ROM.1
```

The parser also supports complete bare books in the reading plan, including:

```text
Filimon
2Ioan
3Ioan
Iuda
Ioel
Obadia
Iona
Naum
Habacuc
Tefania
Hagai
Maleahi
```

The important mapping detail is that the Romanian book-name lookup returns the USFM code itself:

```js
export const mapYouVersion = (name) => findBook(name)?.[1]?.[1];
```

Returning only `findBook(name)?.[1]` would return the whole mapping tuple and produce invalid identifiers such as:

```text
Iov,JOB.14
```

## Project structure

```text
src/
  api/
    createRequest.js         Reference parsing and YouVersion passage IDs

  bible/
    program.js               Daily reading plan and date lookup

  components/
    bible/
      Bible.js               Full Bible-reader route
      Bible.css

    daily-reading/
      DailyBible.js          Daily reading page
      DailyBible.css

    layout/
      Header.js              Global site navigation
      Header.css

  theme/
    light-theme.js           MUI light theme

  App.js                     Application shell, routes, footer
  index.js                   Providers, router, application bootstrap
```

## Local development

### Requirements

* Node.js 22
* Yarn

Use the same Node major version locally and in Netlify.

```bash
yarn install
yarn start
```

The application starts at:

```text
http://localhost:3000
```

## Environment variables

Create a local `.env.local` file in the repository root:

```dotenv
REACT_APP_YVP_APP_KEY=your-youversion-app-key
```

Then restart the development server after changing it.

Create React App embeds every `REACT_APP_*` variable into the client bundle at build time. This key must therefore be treated as public client configuration, not as a server secret.

Do not commit `.env.local`.

```gitignore
.env.local
.env.production.local
```

## Build

```bash
yarn build
```

The production build is generated in:

```text
build/
```

## Netlify deployment

Configure Netlify with:

```text
Build command: yarn build
Publish directory: build
Node version: 22
```

Add this environment variable in Netlify:

```text
REACT_APP_YVP_APP_KEY=your-youversion-app-key
```

Ensure the variable is available to both Production and Deploy Preview builds when previews need to load Bible text.

After changing an environment variable, trigger a new deployment. Existing builds cannot receive the new value retroactively.

## YouVersion and copyright

Bible text is rendered through the YouVersion Platform SDK. Translation availability, permissions, and copyright requirements are determined by the YouVersion application configuration and the relevant text licenses.

The application displays the copyright metadata returned for the selected version. Do not remove or obscure required copyright notices.

The YouVersion application key is required for requests, but it is visible in the compiled client bundle. Protection must therefore come from the YouVersion-side application configuration, allowed origins, version permissions, and licensing controls.

## Development notes

React StrictMode can cause duplicate YouVersion requests during local development because React intentionally mounts components more than once to expose side effects.

This does not occur in the production build.

The application currently uses `BibleTextView` for rendering Bible text. This provides formatted text quickly, but it also means the SDK controls part of the rendered DOM and interaction model. A future fully custom reader may replace only the passage rendering layer while preserving the existing routing, version state, daily-plan logic, and copyright handling.

## Roadmap

* Complete the full Bible reader with book and chapter selection.
* Add previous/next chapter navigation.
* Preserve the selected translation across all reader pages.
* Improve mobile reading controls.
* Add direct links to specific passages.
* Consider a custom passage renderer where finer control over text selection, typography, and layout is required.
* Gradually replace Create React App with a maintained build tool when the application is otherwise stable.

## Author

Built and maintained by [Andrei Lucaci](https://github.com/AndreiLucaci).

Scriptum Deus © All rights reserved.
