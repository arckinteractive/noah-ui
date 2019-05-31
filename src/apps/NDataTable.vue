<template>
    <div
        v-bind="filteredAttrs"
        ref="dataTable"
    >
        <slot
            :search.sync="search"
            name="search"
        ></slot>

        <div
            :class="config.children.actions"
            v-if="$slots.actions"
        >
            <slot
                :items="items"
                name="actions"
            ></slot>
        </div>

        <n-table
            :headers="headers"
            :items="items"
            @sort="changeSort"
            v-bind="$attrs"
        >
            <slot name="data"></slot>
        </n-table>

        <slot name="pagination">
            <n-pagination
                :page-size="pageSize"
                :total="total"
                v-model="currentPage"
            >
            </n-pagination>
        </slot>
    </div>
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
            sortProperty: this.sort.prop || 'id',
            sortOrder: this.sort.order || 'descending',
            currentPage: 1,
            pageSize: this.perPage,
            localConfig: {
                name: 'NDataTable',
                config: {
                    baseClass: 'n-data-table',
                },
            },
        };
    },

    mounted () {
        this.reload({}, false);
    },

    props: {
        items: {
            type: Array,
            default: () => [],
        },

        headers: {
            type: Array,
            required: true,
        },

        total: {
            type: Number,
            default: 0,
        },

        search: {
            type: Object,
            default: () => {
                return {};
            },
        },

        sort: {
            type: Object,
            default: () => {
                return {
                    prop: 'id',
                    order: 'descending',
                };
            },
        },

        perPage: {
            type: Number,
            default: 25,
        },
    },

    methods: {
        reload (options, scroll = true) {
            this.$emit('reload', Object.assign({
                pageSize: this.pageSize,
                currentPage: this.currentPage,
                sortProperty: this.sortProperty,
                sortOrder: this.sortOrder,
                ...this.search,
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
        search () {
            this.reload({ currentPage: 1 });
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
