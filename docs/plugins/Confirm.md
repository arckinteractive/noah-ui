---
title: Confirmation Dialog
label: Confirm
---

## Confirmation Dialog

### Overview

Confirmation dialogs should be used to require user consent for a specific action. Dialogs should explain the reprecussions of performing a specific action, for example you can explain that a certain action that can not be undone and require user approval before proceeding.

Confirmations can be invoked anywhere in your component using `$confirm()` plugin or from your template using `v-confirm` directive (directive is not global, so you will need to inject it into your component). Confirmations use promises.

```js
this.$confirm({
    // Title of the dialog popup
    title: 'Dangerous Action',
    
    // Message of the dialog
    message: 'If you proceed, something really really bad my befall on you',
    
    // Type of the dialog popup
    // This can be used to style the popup further, by default all dialogs are styled as neutral
    type: 'neutral',
    
    // Dialog size
    size: 'medium',
    
    // Props to the pass to <n-button> used to render the confirm button 
    confirmButton: {
        text: 'I am feeling lucky',
        color: 'danger',
    },
    
    // Props to pass to the <n-button> used to render the cancel button 
    cancelButton: {
        text: 'Keep me safe',
        outlined: true,
    }, 
}).then(() => {
    // User has granted their consent
}).catch(() => {
    // User has cancelled the action
})
```

#### Shortcut invocation

``` js
this.$confirm('You are about to do something bad', 'Danger')
    .then(() => {})
    .catch(() => {});
```

#### Mounted Component

<ComponentMeta name="NConfirm" />

### `$confirm()` Plugin Example

<ComponentDemo name="ConfirmPlugin" />

### `v-confirm` Directive Example
 
<ComponentDemo name="ConfirmDirective" />
