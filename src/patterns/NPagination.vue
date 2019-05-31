<template>
    <div
        v-bind="filteredAttrs"
        v-if="total > pageSize"
        role="navigation"
    >
        <n-button
            :class="item.classes"
            :key="item.index"
            @click.prevent="item.click"
            class="n-pagination__item --transparent --circle"
            v-for="item in items"
        >
            <template v-if="item.icon">
                <i :class="item.icon"></i>
            </template>
            <template v-else>
                <span>{{ item.pageIndex }}</span>
            </template>
        </n-button>
    </div>
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
                },
            },
        };
    },

    model: {
        prop: 'currentPage',
        event: 'change',
    },

    props: {
        currentPage: {
            type: Number,
            default: 1,
        },

        total: {
            type: Number,
            default: 0,
        },

        pageSize: {
            type: Number,
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
                icon: 'fas fa-angle-left',
                pageIndex: currentPage - 1,
            });

            if (startPage > 1) {
                items.push({
                    pageIndex: 1,
                });
            }

            if (startPage - 1 > 1) {
                items.push({
                    icon: 'fas fa-ellips--h',
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
                    icon: 'fas fa-ellips--h',
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
                icon: 'fas fa-angle-right',
                pageIndex: currentPage + 1,
            });

            return items.map((item) => {
                const isActive = item.pageIndex === currentPage;
                const isDisabled = item.pageIndex < 1 || item.pageIndex > totalPages;

                item.classes = {
                    '--active': isActive,
                    '--disabled': isDisabled,
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

<style scoped lang="scss">


    .n-pagination {
        display: flex;
        flex-wrap: nowrap;
        margin: 1rem auto;
        align-items: center;
        justify-content: center;
    }

    .n-button {
        font-size: 12px;
        font-weight: 600;
    }

    .n-button.--disabled,
    .n-button.--active {
        cursor: not-allowed;

        &:hover {
            background: none;
        }
    }

    .n-button.--disabled {
        color: var(--color-grey-text);
    }

    .n-button.--active {
        color: var(--color-primary);
        background: var(--color-grey-background);
    }
</style>
