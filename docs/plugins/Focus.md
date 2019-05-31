---
label: Focus
---

## Focus

### Overview

Focus plugin aims to improve accessibility of components by keeping track of overlay elements currently in focus, i.e. making sure tabulation works in a dialog window.

Use the focus plugin, instead of focusing an element directly, to ensure that tab indexes work correctly.

``` vue
<template>
    <n-dialog v-model="visible">
        <template slot="footer">
            <n-div flex right-center>
                <n-button ref="confirm">Let's Go</n-button>
            </div>
        </template>
    </n-dialog>
</template>

<script>
    export default {
        methods: {
            open() {
                this.visible = true;
                
                this.$nextTick(() => {
                    this.$focus(this.$refs.confirm.$el, this.$el);
                });
            },
            
            close() {
                this.$blur();
                
                this.visible = false;   
            }
        }
    }
</script>
```
