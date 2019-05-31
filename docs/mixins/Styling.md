---
label: Styling
---

## Styling

Style mixin allows you to use attributes to control element appearance. Responsive modifier prefixes can be attached to some of the attributes to control appearance on various devices.

### Using attributes

All Noah components use the Styling mixin, hence you can simply pass the attributes, when rendering the component.

```html
<n-button primary outlined>Button</n-button>
```

```html
<n-div padding="large" text-size="large" text-align="center">
    Large padded text aligned to the center
</n-div>  
``` 

You can use `sm:`, `md:`, `lg:` and `xl:` modifier prefixes to target specific devices.

```html
<n-div padding="small" md:padding="large" lg:padding="xlarge">Content</n-div>
```

### Attribute Whitelist

<AttributeWhitelist />


### Configuration

You can configure whitelisted attributes, as well as provide a custom class map to match your CSS framework, via the config object.

```js
import Vue from 'vue';
import NoahUi from 'noah-ui';
import config from 'noah-ui/src/noah.config';

config.style.whitelist.push(
    // Let's define a rule, which will accept `corners="$size"` attribute, and transform it into
    // `.radius-$size` CSS class
    // <n-div md:corners="medium"> will become <div class="md:radius-medium">
    {
        // Pass the attributes (aliases) you want the directive to process
        attr: ['corners'],
        
        // Specifies what class prefix should be used 
        classPrefix: 'radius-',
        
        // Enable responsive/viewport prefixes, such as sm: md: lg: xl:
        responsive: true,
    },
    
    // If you are not expecting the attribute to have a value, you can specify the target class
    // <n-div circle> will become <div class="my-circle">
    {
        attrs: ['circle', 'circled'],
        class: 'my-circle',
    }
);

Vue.use(NoahUi, config);
```

Please note that if you have configured the component level `modifierPrefix` config value, it will take precedence of `classPrefix`.

```js
import Vue from 'vue';
import NoahUi from 'noah-ui';
import config from 'noah-ui/src/noah.config';

config.components.NButton.modifierPrefix = 'btn-';

config.style.whitelist.push({
        attrs: ['foo'],
        classPrefix: 'foo-',
});

// When you render <n-div foo="bar"> you will get <div class="foo-bar">
// When rendering <n-button foo="bar">you will get <button class="btn-bar">

Vue.use(NoahUi, config);
```

You can use `classMap` property on the global config as well as component config to replace a filtered class completely.

```js
import Vue from 'vue';
import NoahUi from 'noah-ui';
import config from 'noah-ui/src/noah.config';

config.components.NButton.classMap = { 'foo-bar': 'my-component-class' };

config.style.classMap = { 'foo-bar': 'my-global-class' };

// When you render <n-div foo="bar"> you will get <div class="my-global-class">
// When rendering <n-button foo="bar">you will get <button class="my-component-class">

Vue.use(NoahUi, config);
```

You can use styling mixin to create a flex container.

```html
<n-div flex center-center lg:left-center>
    <n-div col sm:12 md:6 lg:3></div>
    <n-div col sm:narrow></div>
    <n-div col sm:auto md:6 lg:narrow></div>
</div>
```

Styling mixin allows you to control columns/spans within a flex container.

```html
<n-div flex>
    <n-div col sm:12 md:6 lg:3></div>
    <n-div col sm:narrow></div>
    <n-div col sm:auto md:6 lg:narrow></div>
</div>
```
