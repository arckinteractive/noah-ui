<template>
    <div>
        <transition-group
            name="expand"
            v-bind="filteredAttrs"
        >
            <div v-for="(item, index) in items" :key="index">
                <slot name="item" v-bind="{ item, index }"></slot>
            </div>
        </transition-group>

        <n-div
            v-if="hasMore"
            :class="config.children.paginator"
            flex
            center-center
            padding-y="medium"
            @click.native="loadMore"
        >
            <slot name="paginator">
                <n-button
                    outlined
                    text="Load More"
                    ref="paginator"
                    :loading="loading"
                />
            </slot>
        </n-div>
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
            localConfig: {
                name: 'NInfiniteList',
                config: {
                    baseClass: 'n-list',
                    children: {
                        paginator: 'n-list__paginator',
                    },
                },
            },
            pageSize: this.perPage,
            repeated: 0,
        };
    },

    mounted () {
        this.loadMore({});
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
         * Maximum number of times the load will load new automatically,
         * before user must click the button to load new items.
         * Use `0` for no limitations.
         */
        repeat: {
            type: Number,
            default: 0,
        },
        /**
         * Set the loading state
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Render a striped list
         */
        striped: Boolean,
        /**
         * Divide items
         */
        divided: Boolean,
    },

    computed: {
        hasMore () {
            return this.total > this.items.length;
        },

        componentStates () {
            return {
                loading: this.loading,
                ended: !!this.hasMore,
                striped: this.striped,
                divided: this.divided,
            };
        },
    },

    methods: {
        loadMore (options) {
            this.$emit('load', Object.assign({
                pageSize: this.pageSize,
            }, options));
        },

        rebuildObserver () {
            if (this.hasMore) {
                if (!this.$data.$intersectionObserver && this.$refs.paginator) {
                    this.createIntersectionObserver(this.$refs.paginator.$el);
                }
            } else if (this.$data.$intersectionObserver) {
                this.$data.$intersectionObserver.disconnect();
            }
        },
    },

    watch: {
        '$data.$inViewport': {
            handler () {
                if (this.loading) {
                    return;
                }

                if (this.$data.$inViewport) {
                    this.loadMore({});
                    this.repeated++;

                    if (this.repeat > 0 && this.repeated >= this.repeat) {
                        this.$data.$intersectionObserver.disconnect();
                    }
                }
            },
        },

        items: {
            deep: true,
            handler () {
                this.$nextTick(() => {
                    this.rebuildObserver();
                });
            },
        },
    },

};
</script>
