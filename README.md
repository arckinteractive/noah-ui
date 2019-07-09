# NoahUI

Vue.js framework for web-artisans brought to you by [Arck Interactive](https://arckinteractive.com/).

NoahUi was conceptualized and brought to life by [Ismayil Khayredinov](https://github.com/hypejunction)

**This project is work in progress. Please abstain from using it in production environments until it reaches maturity**

We welcome contributions. Tests are incomplete and there are still some components that need work. We have started building out the framework with a number of big ideas and we weren't entirely sure, what would be possible, hence the framework underwent many iterations - tests would have kept us back, so we have incurred this technical debt consciously and will work on rolling in the tests as time allows. This started off as a passion project and we've been working on it in our free time. Given the extracurricular nature of it, please be gentle with criticism: constructive criticism is good, bashing is not acceptable.
 
## [Documentation & Demo](https://arckinteractive.github.io/noah-ui/)


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run dev
```

### Compiles the docs

Build docs for deployment to gh-pages
```
yarn run build
```

Build docs for local testing
```
yarn run build:local
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit

---
title: Getting Started with Noah UI
meta: 
    - name: description
    - content: Vue Framework for Web Artisans
label: Getting Started
priority: 2
icon: fas fa-box-open
---


## Install

```
yarn add @arckinteractive/noah-ui
```

## Integrate

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


## Components 

<ComponentList />

NoahUi provides a wide range of commonly used UI elements and patterns. 
Each component has a set of configuration options that can be altered via a config object when NoahUI is first initialized.

```js
import Vue from 'vue';
import NoahUI from 'noah-ui';

Vue.use(NoahUI, {
    breakpoints: { 
        //...
    },
    components: {
        NButton: {
            // Most components are loaded asynchronously. We have identified a set of components that
            // in our experience are used most widely than others and set them for sync loading
            // If you would like to include the component in your webpack bundle, set async to false, 
            // and vice versa if you want to load the component asynchronously, set it to true. 
            async: false,
            
            // If you would like to replace the component with your custom implementation,
            // you can specify, which directory the component should be loaded from
            // This can be handy, if you need to make high level modifications to
            // the component code
            path: '/path/to/component/directory',
            
            /**
            * Because working with paths can be tricky, you can specify your custom loader
            */
            loader: () => {
                return require('/path/to/component/').default;
               
                // or
                
                return () => import('/path/to/component');
            },
            
            // Each component has a set of additional configuration options,
            // such as CSS class name, modifier prefixes and modifier map,
            // icon classes to use etc.
            // Please check individual component file to discover a full list of available
            // configuration options
            
            // These configuration options allow you to bring in your own CSS library,
            // and reconfigure CSS selectors, e.g. to use Bootstrap instead of NoahUi,
            // you could do something like
            baseClass: 'btn',
            modifierPrefix: 'btn-',
            classMap: {
                'btn-notice': 'btn-info',
                'btn-small': 'btn-sm',
                // ...
            },
        },
        
        // Should you need to completely eliminate a component from the build, e.g. if you are only
        // using a handful of components for a basic UI, you can do so by setting component options to false or null
        NDataTable: null,
    },
})
```
