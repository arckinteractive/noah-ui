<template>
    <thead v-bind="filteredAttrs">
    <tr>
        <th :class="thClasses" style="width: 2%" v-if="expand"></th>
        <th
            :class="thClasses(header)"
            :key="header.prop"
            :style="{ width: header.width }"
            v-for="header in visibleHeaders"
        >
            <div :class="config.children.column" @click.stop="changeSort(header)">
                <div :class="config.children.label">
                    {{ header.label }}
                </div>

                <div :class="config.children.controls" v-if="header.sortable">
                    <n-icon aria-label="Sort" :class="ascClasses(header)" :icon="config.icons.asc"></n-icon>
                    <n-icon aria-label="Sort" :class="descClasses(header)" :icon="config.icons.desc"></n-icon>
                </div>
            </div>
        </th>
    </tr>
    </thead>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Table head displays a set of table headings
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NTableHead',
                config: {
                    baseClass: 'n-table-head',
                    children: {
                        column: 'n-table__column',
                        controls: 'n-table__column-controls',
                        label: 'n-table__column-label',
                        th: 'n-table__th',
                        desc: 'n-table__desc',
                        asc: 'n-table__asc',
                    },
                    icons: {
                        desc: 'fas fa-caret-down',
                        asc: 'fas fa-caret-up',
                    },
                },
            },

            rows: this.items.map((e) => {
                return {
                    item: e,
                    expanded: false,
                };
            }),

            sort: this.defaultSort || {
                prop: null,
                order: null,
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

    computed: {
        visibleHeaders () {
            return this.headers.filter((e) => !e.hidden);
        },
    },

    methods: {
        thClasses (header = {}) {
            return {
                [this.config.children.th]: true,
                ...this.buildCssModifiers({
                    centered: header.centered,
                    sorted: this.sort.prop === header.prop,
                    sortable: !!header.sortable,
                }),
            };
        },

        ascClasses (header = {}) {
            return {
                [this.config.children.asc]: true,
                ...this.buildCssModifiers({
                    active: this.sort.prop === header.prop && this.sort.order === 'ascending',
                }),
            };
        },

        descClasses (header = {}) {
            return {
                [this.config.children.desc]: true,
                ...this.buildCssModifiers({
                    active: this.sort.prop === header.prop && this.sort.order === 'descending',
                }),
            };
        },

        changeSort (header) {
            if (!header.sortable) {
                return;
            }

            let order = 'ascending';

            if (this.sort.prop === header.prop) {
                order = this.sort.order === 'ascending' ? 'descending' : 'ascending';
            }

            this.sort = {
                ...header,
                order,
            };

            this.$emit('sort', this.sort);
        },
    },
};
</script>
