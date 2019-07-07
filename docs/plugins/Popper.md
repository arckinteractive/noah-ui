---
label: Popper
---

## Popper

### Overview

Popper plugin provides access to an asynchronously loaded `popper.js` constructor. This allows for SSR-friendly usage of popping elements.

```js
export default {
    mounted() {
        this.$popper.load().then((Popper) => {
            new Popper(this.$refs.trigger, this.$refs.popup, this.options);
        })
    }
}
```
