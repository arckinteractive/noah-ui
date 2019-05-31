<template>
    <nav
        v-bind="filteredAttrs"
        role="navigation"
        @click.stop
    >
        <n-menu-item
            v-for="(item, index) in menuItems"
            :item="item"
            :key="index"
            :horizontal="horizontal"
            :accordion="accordion"
        >
        </n-menu-item>
    </nav>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Menu allows to build a tree of navigation elements from an array of items
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NMenu',
                config: {
                    baseClass: 'n-menu',
                },
            },
        };
    },

    props: {
        /**
         * Menu type
         */
        type: {
            type: String,
        },
        /**
         * Menu items
         */
        items: {
            type: Array,
            required: true,
        },
        /**
         * Align menu horizontally
         */
        horizontal: {
            type: Boolean,
        },
        /**
         * Display vertical menu as an accordion
         */
        accordion: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        componentStates () {
            return {
                [this.type]: true,
                horizontal: this.horizontal,
            };
        },

        menuItems () {
            const sorter = (a, b) => {
                const pA = a.priority || -1;
                const pB = b.priority || -1;

                return pA - pB;
            };

            const buildTree = (item) => {
                if (!item.children) {
                    item.children = [];
                }

                const children = this.items
                    .filter((e) => {
                        return e.parentId && e.parentId === item.id;
                    })
                    .map(buildTree)
                    .sort(sorter);

                item.children.push(...children);

                if (item.selected && children.length) {
                    item.expanded = true;
                } else if (children.find((e) => !!e.selected)) {
                    item.expanded = true;
                }

                return item;
            };

            return this.items
                .filter((e) => !e.parentId)
                .map(buildTree)
                .sort(sorter);
        },
    },
};
</script>
