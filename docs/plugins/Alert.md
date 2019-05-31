---
label: Alert
---

## Alerts

### Overview

Alerts are messages with helpful information that can be shown to users to indicate a successful action or explain an error.

Alerts can be emitted anywhere in your component using `$alert()` plugin.

``` js
this.$alert({
    // Message to display
    message: 'This is an error',
    
    // Alert type, e.g. 'success', 'danger', 'warning', 'notice'
    // Defaults to 'neutral'
    color: 'danger',
    
    // Milliseconds to display the alert
    // Set to 0 to require manual close
    // Defaults to 8s 
    duration: 5000,
});
```

#### Shortcut invocation

``` js
this.$alert('This is a message', 'notice');
```

#### Mounted Component

<ComponentMeta name="NAlert" />

### Example

<ComponentDemo name="AlertPlugin" />
