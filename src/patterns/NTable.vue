<template>
    <div :class="config.children.wrapper">
        <table v-bind="filteredAttrs">
            <slot name="headers" v-bind="$props" :change-sort="changeSort">
                <n-table-head
                    @sort="changeSort"
                    v-bind="$props"
                ></n-table-head>
            </slot>

            <slot v-bind="$props">
                <n-table-body
                    v-bind="$props"
                ></n-table-body>
            </slot>
        </table>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Tables are used to represent data in a sortable manner
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NTable',
                config: {
                    baseClass: 'n-table',
                    children: {
                        wrapper: 'n-table__wrapper',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Default sort ``{ prop: 'id', order: 'descending' }``
         */
        defaultSort: {
            type: Object,
            required: false,
        },
        /**
         * An array of header objects
         */
        headers: {
            type: Array,
            required: true,
        },
        /**
         * An array of item objects
         */
        items: {
            type: Array,
            required: true,
        },
        /**
         * Add empty header for expand trigger
         */
        expand: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        changeSort (value) {
            /**
             * Emitted, when sort order is changed in the table headers.
             * @property {Object} sort Object Sort property and order
             */
            this.$emit('sort', value);
        },
    },
};
</script>
