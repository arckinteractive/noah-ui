<template>
    <tbody v-bind="filteredAttrs">
    <template v-if="rows.length">
        <template v-for="(row, index) in rows">
            <tr :class="getRowStyle(row, index)" :key="index">
                <td v-if="expand">
                    <n-button @click="row.expanded = !row.expanded" circle ghost aria-label="Toggle Row">
                        <i :class="row.expanded ? 'fa-angle-down' : 'fa-angle-right'" class="fas"></i>
                    </n-button>
                </td>

                <td
                    :key="header.prop"
                    v-for="header in headers"
                >
                    <n-div :text-align="header.centered ? 'center' : 'left'">
                        <template v-if="!header.hidden">
                            <slot :name="header.prop" v-bind="row">
                                {{ row.item[header.prop] }}
                            </slot>
                        </template>
                    </n-div>
                </td>
            </tr>

            <tr :key="`expand-${index}`" v-if="row.expanded">
                <td v-if="expand">&nbsp;</td>

                <td :colspan="headers.length" class="expanded">
                    <slot name="expand" v-bind="row"></slot>
                </td>
            </tr>
        </template>
    </template>

    <tr v-else>
        <td :colspan="expand ? headers.length + 1 : headers.length">
            <slot name="noResults"></slot>
        </td>
    </tr>
    </tbody>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Table body wraps table rows
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NTableBody',
                config: {
                    baseClass: 'n-table-body',
                },
            },
            rows: [],
        };
    },

    props: {
        headers: {
            type: Array,
            required: true,
        },

        items: {
            type: Array,
            required: true,
        },

        expand: {
            type: Boolean,
            default: false,
        },

        rowStyle: {
            type: Function,
        },
    },

    methods: {
        getRowStyle (row, index) {
            const selectors = this.rowStyle
                ? this.rowStyle({
                    row,
                    index,
                })
                : [];

            selectors.push(index % 2 ? '--odd' : '--even');

            return selectors;
        },
    },

    watch: {
        items: {
            handler () {
                this.rows = this.items.map((e) => {
                    return {
                        item: e,
                        expanded: false,
                    };
                });
            },
            immediate: true,
        },
    },
};
</script>
