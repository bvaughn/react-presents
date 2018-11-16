Changelog
------------

##### 0.8.1
Bug fix (#24, #25)

##### 0.8.0
Updated to React 16.6 and styled-components 4.

##### 0.7.9
Updated version of `react-virtualized-select` that's used within the project.
Replaced `React.PropTypes` references with `prop-types` library.

##### 0.7.8
Ignore keyboard events for navigation purposes if the user is entering text or interacting with form controls.

##### 0.7.7
Compatible with `react-router`/`react-router-dom` versions 4.0.0-beta.6 _and_ 4.0.0 final.

Special thanks to [**@kirillku**](https://github.com/kirillku) for his help with this release.

##### 0.7.6
CSS tweaks to make it easier to customize touch-nav style.

##### 0.7.5
Move location-parsing to will-update to fix bug.

##### 0.7.4
Presentation parses location (slide index) on-mount as well as on-update.

##### 0.7.3
Updated to support newer `react-router` / `react-router-dom` version 4.0.0-beta.6 API.

##### 0.7.2
Fixed `package.json` dependencies.
Presenter-mode tab auto closes when HMR changes things (at which point the windows are diconnected anyway).

##### 0.7.1
Improved presenter mode indicator style.

##### 0.7.0
New "presenter mode" supported. Typing "p" while viewing a slide will open a synced presenter slide. Presenter mode automatically displays upcoming `Step` content and supports other, presenter-only custom content via new slide render param `isPresenterMode`.

Support added for remote control (via `PageUp` and `PageDown` events.)

Theming support improved for CodeMirror styles via new `Code` component prop, `className`.

Special thanks to [**@jesstelford**](https://github.com/jesstelford) for his help with this release.

##### 0.6.6
Tweaked the bottom margin of `li` items in the default theme.

##### 0.6.5
Drop-down navigation now properly truncates long text with "...".
Tweaked paragraphs to use bottom margin only for default theme.

##### 0.6.4
Removed dependency on Typography.js.

This is not meant as a criticism of the library. It simply sets too many default styles that I found myself overriding.

##### 0.6.3
Improved disabled `Button` style for default theme.

##### 0.6.2
Tweaked default theme paragraphy margins.

##### 0.6.1
Google fonts now auto-loaded by default theme.
Prevent main header from overlapping `TouchNav` buttons with right padding.

##### 0.6.0
`Slide` takes (optional) `maxIndex` property of `Step` into account as well when determining the max number of steps.
Touch nav button color changed for improved visibility.

##### 0.5.0
Added `setNumSteps` method to `Slide` to enable custom step counts (without relying on `Step`).

##### 0.4.3
Updated typography-related CSS to use Typography.js.
Also added missing Google font import.

##### 0.4.2
Added missing `react-virtualized-select` to `package.json`.

##### 0.4.1
Added padding to `TitleSlide` component.

##### 0.4.0
Added `maxIndex` prop to `Step` component for greater control over when a step's contents get hidden.

Also fixed a bug when stepping backwards 1 slide. Lib now ensures the step-count is correct and the last step is shown by default.

##### 0.3.3
Prevent long slide titles from wrapping unattractively in the context of the drop-down slide navigation.

##### 0.3.2
Disable next/previous touch navigation buttons when on the last/first slide.

##### 0.3.1
Fixed a small CSS @media query bug affecting touch-nav button position on mobile.

##### 0.3.0
Added drop-down navigation to jump directly to a specific slide.

##### 0.2.0
Added touch support (upper right hand nav) and improved theming.

##### 0.1.0
Initial release. Barebones slide and step sequence functionality.
