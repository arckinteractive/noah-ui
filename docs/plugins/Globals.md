---
label: Globals
---

## Globals

### `$globals`

`$globals` allow you share state between components. 

``` js
export default {
    mounted() {
        // This value is then available in all other components
        this.$globals.hasMountedA = true;
    },
    
    destroyed() {
        this.$globals.hasMountedA = false;
    }
}
```

### `$config`

Native (or altered) config injected on initialization via `Vue.use(NoahUi, congif)` is stored in a global `$config` object for ease of access.

 ``` js
 export default {
     computed: {
        someProp() {
            return this.$config.components.MyComponent.foo.bar;
        }
     }
 }
 ```


