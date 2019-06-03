<template>
    <component
        :is="'div'"
        v-bind="filteredAttrs"
        v-click-outside="hideDropdown"
        @mouseleave="hideDropdown"
    >
        <n-tile
            v-bind="props"
            v-on="listeners"
        >
            <n-button
                v-if="children.length && !horizontal && accordion"
                slot="actions"
                circle
                ghost
                small
                aria-label="Toggle Menu"
                :prefix-icon="toggleIcon"
                @click.stop="toggle"
                tabindex="-1"
            ></n-button>
        </n-tile>

        <transition name="drop">
            <nav
                v-if="expanded"
                :class="submenuClasses"
            >
                <n-menu-item
                    v-for="(item, index) in children"
                    :item="item"
                    :key="index"
                    @click.native="hideDropdown"
                >
                </n-menu-item>
            </nav>
        </transition>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';
import ClickOutside from 'vue-click-outside';

/**
 * Menu item is a navigation element that can have sub-navigation items
 */
export default {
    mixins: [Styling],

    data () {
        return {
            expanded: this.item.expanded || (!this.accordion && !this.horizontal),
            localConfig: {
                name: 'NMenuItem',
                config: {
                    baseClass: 'n-menu-item',
                    children: {
                        anchor: 'n-menu__anchor',
                        submenu: 'n-menu__submenu',
                    },
                    icons: {
                        expand: 'fas fa-caret-right',
                        collapse: 'fas fa-caret-down',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Menu item
         */
        item: {
            type: Object,
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

    directives: {
        'click-outside': ClickOutside,
    },

    computed: {
        props () {
            const {
                click, children, expanded, selected, ...props
            } = this.item;

            props.class = this.config.children.anchor;

            return props;
        },

        listeners () {
            const listeners = {
                mouseenter: this.showDropdown,
            };

            if (this.children.length) {
                listeners.click = this.toggle;
            } else if (typeof this.item.click === 'function') {
                listeners.click = this.item.click;
            }

            return listeners;
        },

        children () {
            return this.item.children || [];
        },

        componentStates () {
            return {
                expanded: this.children.length && this.expanded,
                selected: this.item.selected,
            };
        },

        submenuClasses () {
            return {
                [this.config.children.submenu]: true,
                [this.$config.components.NPopup.baseClass]: this.horizontal,
            };
        },

        toggleIcon () {
            return this.expanded ? this.config.icons.collapse : this.config.icons.expand;
        },
    },

    methods: {
        toggle () {
            if (this.expanded) {
                this.expanded = false;

                this.$nextTick(() => {
                    this.$emit('collapse');
                });
            } else {
                this.expanded = true;

                this.$nextTick(() => {
                    this.$emit('expand');
                });
            }
        },

        showDropdown () {
            if (this.horizontal && !this.expanded) {
                this.toggle();
            }
        },

        hideDropdown () {
            if (this.horizontal && this.expanded) {
                this.toggle();
            }
        },
    },

    watch: {
        item: {
            deep: true,
            handler (value) {
                this.expanded = value.expanded || (!this.accordion && !this.horizontal);
            },
        },
    },
};
</script>
