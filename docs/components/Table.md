---
label: Table
badge: Organism
badgeColor: danger
---

## Tables

<ComponentMeta name="NTable" />


### Headers

Table accepts an array of header objects:

```js
export default {
    computed: {
        headers () {
            return [
                {
                    // Header label visible to the user
                    label: 'ID',
                    // Column ID used to reference scoped slots.
                    // If the item contains a property with this name, it can be used to automatically render cell content
                    prop: 'id',
                    // Enable sorting by this column id/property
                    // Please note that our API does not do actual sorting (see examples below)
                    sortable: true,
                    // Make headers a computed property for the added benefit of conditional column rendering
                    // You can for example hide specific non-essential columns on smaller viewports
                    hidden: this.$viewport.isTabletDown,
                    // Specify fixed or relative width of the column
                    width: '5%',
                    // Center column contents
                    centered: true,
                },
            ];
        },
    },
};
```

### Simple Table

<ComponentDemo name="SimpleTable" />

### Table With Custom Cells (Slots)

<ComponentDemo name="TableSlots" />

### Table With Expanding Rows

<ComponentDemo name="TableExpand" />
