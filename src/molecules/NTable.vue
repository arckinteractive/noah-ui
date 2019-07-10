<template>
    <div :class="config.children.wrapper">
        <table v-bind="filteredAttrs">
            <slot name="headers" v-bind="$props">
                <thead :class="config.children.head">
                <tr>
                    <th
                        v-if="expand"
                        :class="getThStyle({
                            prop: 'expand',
                            centered: true,
                        })"
                        style="width: 32px"
                        data-prop="expand"
                    ></th>

                    <th
                        v-for="header in visibleHeaders"
                        :key="header.prop"
                        :class="getThStyle(header)"
                        :style="{ width: header.width }"
                        :data-prop="header.prop"
                    >
                        <div
                            :class="config.children.column"
                            @click.stop="changeSort(header)"
                        >
                            <div :class="config.children.label">
                                {{ header.label }}
                            </div>

                            <div
                                v-if="header.sortable"
                                :class="config.children.controls"
                            >
                                <n-icon
                                    aria-label="Sort"
                                    :class="getAscStyle(header)"
                                    :icon="config.icons.asc"
                                ></n-icon>

                                <n-icon
                                    aria-label="Sort"
                                    :class="getDescStyle(header)"
                                    :icon="config.icons.desc"
                                ></n-icon>
                            </div>
                        </div>
                    </th>
                </tr>
                </thead>
            </slot>

            <slot v-bind="$props">
                <transition-group :class="config.children.body" name="expand" tag="tbody">
                    <template v-if="rows.length">
                        <template v-for="(row, index) in rows">
                            <tr
                                :class="getRowStyle(row, index)"
                                :key="index"
                            >
                                <td
                                    v-if="expand"
                                    :class="getCellStyle(row, {
                                    prop: 'expand',
                                    centered: true,
                                })"
                                    data-prop="expand"
                                >
                                    <n-button
                                        aria-label="Toggle Row"
                                        circle
                                        ghost
                                        small
                                        @click="row.expanded = !row.expanded"
                                    >
                                        <i :class="row.expanded ? config.icons.collapse : config.icons.expand"></i>
                                    </n-button>
                                </td>

                                <td
                                    v-for="header in visibleHeaders"
                                    :key="header.prop"
                                    :class="getCellStyle(row, header)"
                                >
                                    <n-div :class="config.children.cellContent">
                                        <slot :name="header.prop" v-bind="row">
                                            {{ row.item[header.prop] }}
                                        </slot>
                                    </n-div>
                                </td>
                            </tr>

                            <tr v-if="row.expanded" :key="`expand-${index}`">
                                <td v-if="expand">&nbsp;</td>

                                <td :colspan="headers.length" class="expanded">
                                    <slot name="expand" v-bind="row"></slot>
                                </td>
                            </tr>
                        </template>
                    </template>

                    <tr v-else key="noResults">
                        <td :colspan="expand ? headers.length + 1 : headers.length">
                            <slot name="noResults"></slot>
                        </td>
                    </tr>
                </transition-group>
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
                        body: 'n-table-body',
                        head: 'n-table-head',
                        column: 'n-table__column',
                        controls: 'n-table__column-controls',
                        label: 'n-table__column-label',
                        th: 'n-table__th',
                        td: 'n-table__td',
                        desc: 'n-table__desc',
                        asc: 'n-table__asc',
                        cellContent: 'n-table__cell-content',
                    },
                    icons: {
                        expand: 'fas fa-angle-right',
                        collapse: 'fas fa-angle-down',
                        desc: 'fas fa-caret-down',
                        asc: 'fas fa-caret-up',
                    },
                },
            },
            rows: [],
            sort: this.defaultSort,
        };
    },

    props: {
        /**
         * Default sort ``{ prop: 'id', order: 'descending' }``
         */
        defaultSort: {
            type: Object,
            default () {
                return {
                    prop: 'id',
                    order: 'descending',
                };
            },
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
        /**
         * Callback to resolve row classes.
         *
         * Function will receive `{row, index}` as argument and should return an array of classes
         */
        rowStyle: {
            type: Function,
        },
        /**
         * Callback to resolve cell classes.
         *
         * Function will receive `{row, header}` as argument and should return an array of classes
         */
        cellStyle: {
            type: Function,
        },
    },

    computed: {
        visibleHeaders () {
            return this.headers.filter((e) => !e.hidden);
        },
    },

    methods: {
        getRowStyle (row, index) {
            const selectors = this.rowStyle ? this.rowStyle({
                row,
                index,
            }) : [];

            return {
                ...selectors.reduce((prev, selector) => {
                    prev[selector] = true;

                    return prev;
                }, {}),
                ...this.buildCssModifiers({
                    odd: !!(index % 2),
                    even: !(index % 2),
                }),
            };
        },

        getCellStyle (row, header) {
            const selectors = this.cellStyle ? this.cellStyle({
                row,
                header,
            }) : [];

            return {
                ...selectors.reduce((prev, selector) => {
                    prev[selector] = true;

                    return prev;
                }, {}),
                ...this.buildCssModifiers({
                    centered: header.centered,
                    sorted: this.sort.prop === header.prop,
                    sortable: !!header.sortable,
                }),
            };
        },

        getThStyle (header = {}) {
            return {
                [this.config.children.th]: true,
                ...this.buildCssModifiers({
                    centered: header.centered,
                    sorted: this.sort.prop === header.prop,
                    sortable: !!header.sortable,
                }),
            };
        },

        getAscStyle (header = {}) {
            return {
                [this.config.children.asc]: true,
                ...this.buildCssModifiers({
                    active: this.sort.prop === header.prop && this.sort.order === 'ascending',
                }),
            };
        },

        getDescStyle (header = {}) {
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

            /**
             * Emitted, when sort order is changed in the table headers.
             * @property {Object} sort Object Sort property and order
             */
            this.$emit('sort', this.sort);
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
