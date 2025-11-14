# Urgent Care Schedules

A scheduling helper. Online at https://clayreimann.github.io/schedules/

All data is only stored locally in your browser. Please remmeber to frequently import and export your data
so you have a backup in case your browser's cache gets cleared.

## Schedule File Format

Schedule files use JSON format with four main sections: `shifts`, `locations`, `schedules`, and `people`. Each shift must have a unique ID per day per location (e.g., `wt-am-mon`, `uc-pm-fri`) and defines time ranges, slot counts, labels, and color classes. Shifts are organized into location templates with 4 weeks of schedules, where each day references the appropriate shift IDs for that location and day of the week.

The granular shift structure allows different locations to have independent scheduling while maintaining consistent time slots across weeks. Each shift includes a `slots` property that defines how many people can be assigned to that shift, eliminating the need to duplicate shift IDs in the day arrays.

## Tasks 

**Project Setup**

```sh
npm install
```

**Compile and Hot-Reload for Development**

```sh
npm run dev
```

**Type-Check, Compile and Minify for Production**

```sh
npm run build
```

**Run Unit Tests with [Vitest](https://vitest.dev/)**

```sh
npm run test:unit
```

**Lint with [ESLint](https://eslint.org/)**

```sh
npm run lint
```
