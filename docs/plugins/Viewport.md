---
label: Viewport
---

## Viewport

### Overview

Viewport plugin populates components with computed viewport properties, which can be used for conditional rendering, as well as other responsive purposes;

<ComponentDemo name="ViewportDemo" />


### Breakpoints

You can configure breakpoints by passing them with the config object at initialization.

```js
import Vue from 'vue';
import NoahUi from 'noah-ui';
import config from 'noah-ui/src/noah.config';

config.viewport.breakpoints = {
    mobile: 640,
    tablet: 960,
    desktop: 1280,
    hd: 1920,
};

Vue.use(NoahUi, config);
```

## Intersection Observer

If you need to know if your component is in viewport (e.g. to lazy-load external resources, such as images), you can register an intersection observer when component is mounted:

<ComponentDemo name="AboveTheFold" />
