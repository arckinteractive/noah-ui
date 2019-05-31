---
label: Dropzone
---

## Dropzone

Dropzone mixin allows you attach a file drop listener to any component.

```vue
<template>
    <div v-dropzone="onDrop"></div>
</template>

<script>
export default {
    methods: {
        onDrop(fileList) {
            // process your files
        }
    }
}
</script>
```

## Example

<ComponentDemo name="DropzoneDirective" />

See [Dropzone Input](../forms/Dropzone.md) for more details and usage example.


