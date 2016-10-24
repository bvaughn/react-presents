Changelog
------------

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
