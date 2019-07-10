<template>
    <n-module
        v-bind="filteredAttrs"
        type="card"
    >
        <slot name="header" slot="header" v-bind="$props">
            <div
                v-if="$scopedSlots.search"
                :class="config.children.search"
            >
                <slot
                    name="search"
                    v-bind="$props"
                ></slot>
            </div>

            <div
                v-if="$scopedSlots.actions"
                :class="config.children.actions"
            >
                <slot
                    name="actions"
                    v-bind="$props"
                ></slot>
            </div>
        </slot>

        <div v-spinner="loading" ref="dataTable">
            <slot v-bind="$props">
                <n-table
                    :headers="headers"
                    :items="items"
                    @sort="changeSort"
                >
                    <template v-for="slot in cellSlots" v-slot:[slot]="row">
                        <slot :name="slot" v-bind="row"></slot>
                    </template>
                </n-table>
            </slot>

            <slot name="pagination" v-bind="$props">
                <n-pagination
                    :page-size="pageSize"
                    :total="total"
                    v-model="currentPage"
                    padding-y="small"
                >
                </n-pagination>
            </slot>
        </div>
    </n-module>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Data table is a wrapper component that encapsulates search, sort and pagination of tabular data.
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NDataTable',
                config: {
                    baseClass: 'n-data-table',
                    children: {
                        actions: 'n-data-table__actions',
                        search: 'n-data-table__search',
                    },
                },
            },
            sortProperty: this.sort.prop || 'id',
            sortOrder: this.sort.order || 'descending',
            currentPage: 1,
            pageSize: this.perPage,
        };
    },

    mounted () {
        this.reload({}, false);
    },

    props: {
        /**
         * An array of item objects
         */
        items: {
            type: Array,
            default: () => [],
        },
        /**
         * An array of header definitions.
         *
         * See Table component for details.
         */
        headers: {
            type: Array,
            required: true,
        },
        /**
         * Total number of items on all pages
         */
        total: {
            type: Number,
            default: 0,
        },
        /**
         * Number of items on each page
         */
        perPage: {
            type: Number,
            default: 25,
        },
        /**
         * Model of the search form
         */
        search: {
            type: Object,
            default: () => {
                return {};
            },
        },
        /**
         * Sorting configuration
         */
        sort: {
            type: Object,
            default: () => {
                return {
                    prop: 'id',
                    order: 'descending',
                };
            },
        },
        /**
         * Set the loading state
         */
        loading: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        cellSlots () {
            const bodySlots = ['default', 'header', 'actions', 'search', 'pagination'];

            return Object.keys(this.$scopedSlots).filter((e) => bodySlots.indexOf(e) === -1);
        },

        componentStates () {
            return {
                loading: this.loading,
            };
        },
    },

    methods: {
        reload (options, scroll = true) {
            this.$emit('reload', Object.assign({
                pageSize: this.pageSize,
                currentPage: this.currentPage,
                sortProperty: this.sortProperty,
                sortOrder: this.sortOrder,
                search: this.search,
            }, options));

            if (scroll) {
                this.$nextTick(() => {
                    const { dataTable } = this.$refs;

                    if (dataTable) {
                        dataTable.scrollIntoView(true, {
                            behavior: 'smooth',
                        });
                    }
                });
            }
        },

        changeSort ({ prop, order }) {
            this.sortProperty = prop;
            this.sortOrder = order;

            this.reload();
        },
    },

    watch: {
        search: {
            deep: true,
            handler () {
                this.reload({ currentPage: 1 });
            },
        },

        pageSize () {
            this.reload({ currentPage: 1 });
        },

        currentPage (value) {
            this.reload({ currentPage: value });
        },
    },
};
</script>
