---
label: Event Bus
---

## Event Bus

### Overview

Event Bus allows components to emit and listen to global events.

``` js
export default {
    methods: {
        emit(payload) {
            this.$bus.$emit('foo:open', payload);
        },
        
        listen() {
            this.$bus.$on('foo:open', (payload) => {
                console.log(payload);
            });
        }
    }
}
```
