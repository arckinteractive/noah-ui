<template>
    <n-div
        v-bind="filteredAttrs"
        v-if="total > pageSize"
        role="navigation"
        flex
        gap="small"
        center-center
    >
        <n-button
            v-for="(item, index) in items"
            :key="`${index}-${item.pageIndex}`"
            :class="item.classes"
            @click.prevent="item.click"
            circle
            ghost
        >
            <template v-if="item.icon">
                <i :class="item.icon"></i>
            </template>

            <template v-else>
                <span>{{ item.pageIndex }}</span>
            </template>
        </n-button>
    </n-div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Pagination allows users to navigate through a larger set of items
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NPagination',
                config: {
                    baseClass: 'n-pagination',
                    children: {
                        item: 'n-pagination__item',
                    },
                    icons: {
                        next: 'fas fa-angle-right',
                        prev: 'fas fa-angle-left',
                        more: 'fas fa-ellipsis-h',
                    },
                },
            },
        };
    },

    model: {
        prop: 'currentPage',
        event: 'change',
    },

    props: {
        /**
         * Current page index
         */
        currentPage: {
            type: [Number, String],
            default: 1,
        },
        /**
         * Total number of items in the paginated list
         */
        total: {
            type: [Number, String],
            default: 0,
        },
        /**
         * Number of items on each page of the paginated list
         */
        pageSize: {
            type: [Number, String],
            default: 10,
        },
    },

    computed: {
        items () {
            const { currentPage } = this;
            const totalPages = Math.ceil(this.total / this.pageSize);

            const items = [];

            const startPage = Math.max(Math.min(currentPage - 1, totalPages - 3), 1);

            items.push({
                icon: this.config.icons.prev,
                pageIndex: currentPage - 1,
            });

            if (startPage > 1) {
                items.push({
                    pageIndex: 1,
                });
            }

            if (startPage - 1 > 1) {
                items.push({
                    icon: this.config.icons.more,
                    pageIndex: -1,
                });
            } else if (startPage === 3) {
                items.push({
                    pageIndex: 2,
                });
            }

            let pager = 1;

            for (let page = startPage; page <= totalPages; page++) {
                if (pager > 3) {
                    break;
                }
                items.push({
                    pageIndex: page,
                });
                pager++;
            }

            if (totalPages - 3 > startPage) {
                items.push({
                    icon: this.config.icons.more,
                    pageIndex: -1,
                });
            } else if (totalPages - 3 === totalPages) {
                items.push({
                    pageIndex: totalPages - 1,
                });
            }

            if (totalPages - 3 >= startPage) {
                items.push({
                    pageIndex: totalPages,
                });
            }

            items.push({
                icon: this.config.icons.next,
                pageIndex: currentPage + 1,
            });

            return items.map((item) => {
                const isActive = item.pageIndex === currentPage;
                const isDisabled = item.pageIndex < 1 || item.pageIndex > totalPages;

                item.classes = {
                    [this.config.children.item]: true,
                    ...this.buildCssModifiers({
                        active: isActive,
                        disabled: isDisabled,
                    }),
                };

                item.click = () => {
                    if (isActive || isDisabled) {
                        return;
                    }

                    this.$emit('change', item.pageIndex);
                };

                return item;
            });
        },
    },
};
</script>
