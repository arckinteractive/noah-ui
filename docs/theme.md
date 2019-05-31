---
title: Noah UI Theme
meta: 
    - name: description
    - content: Noah UI Theming Guidelines
label: Theme
priority: 2
icon: fas fa-swatchbook
---

## Overview

Noah UI has been built in a way that does not lock you into using our theme and styles. Components have been written without scoped CSS and the element selectors are not hard coded - you can bring in your own favorite CSS framework or customize ours.

### Using Noah CSS

To use our styles, simply import them, when you initialize your app:

``` js
import Vue from 'vue';
import NoahUI from '@arckinteractive/noah-ui';

import '@arckinteractive/noah-ui/src/styles/fonts.scss';
import '@arckinteractive/noah-ui/src/styles/all.scss';

Vue.use(NoahUI);
```

Noah UI uses CSS custom properties, which are easy to work with and customize. Take a look at [`./src/styles/_root.scss`](/theme/variables.md) to see the full list of used CSS variables. You can customize any of these variables anywhere in your project's CSS.

``` css
/** Override globally **/ 
:root {
    --hsl-danger: 4, 46%, 44%;
}

/** Override in a specific scope **/
.my-red-button {
    --hsl-danger: 4, 46%, 44%;
}
```

If you are planning to support older browsers, you will need to setup your project to use [PostCSS custom properties plugin](https://github.com/postcss/postcss-custom-properties).

### Using your own CSS

Noah UI allows you to use your own CSS framework, by giving you a wide range of control via config object. See `./src/noah.config.js` for a full list of components and options. Let's say you are using Bootstrap as your CSS framework:

``` js
import Vue from 'vue';
import NoahUI from '@arckinteractive/noah-ui';
import config from '@arckinteractive/noah-ui/src/noah.config.js';

config.components.Button = {
    baseClass: 'btn',
    modifierPrefix: 'btn-',
}

Vue.use(NoahUI, config);
``` 

Now your buttons will have the `btn btn-*` CSS selectors, instead of `n-button --*`. 
