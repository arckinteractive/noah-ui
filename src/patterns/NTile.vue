<template>
    <component
        :is="componentName"
        :tabindex="tabindex"
        :href="href"
        v-bind="filteredAttrs"
        v-on="listeners"
    >
        <div :class="config.children.control" v-if="$slots.control">
            <!-- Can be used to render a control element, e.g. a checkbox or radio -->
            <slot name="control"></slot>
        </div>

        <div :class="config.children.icon" v-if="icon || $slots.icon">
            <!-- Can be used to render a custom icon, e.g. display an avatar -->
            <slot name="icon">
                <n-icon :icon="icon"></n-icon>
            </slot>
        </div>

        <div :class="config.children.meta">
            <!-- Default slat, can be used to render alternative title, subtitle or other content -->
            <slot>
                <div :class="config.children.title" v-if="title || $slots.title">
                    <!-- Can be used to render a custom title -->
                    <slot name="title">{{ title }}</slot>
                </div>
                <div :class="config.children.subtitle" v-if="subtitle || $slots.subtitle">
                    <!-- Can be used to render a custom subtitle -->
                    <slot name="subtitle">{{ subtitle }}</slot>
                </div>
            </slot>
        </div>

        <div :class="config.children.badge" v-if="badge || $slots.badge">
            <!-- Can be used to render a custom badge, e.g. display a counter -->
            <slot name="badge">
                <n-badge v-bind="badge"></n-badge>
            </slot>
        </div>

        <div :class="config.children.actions" @click.stop v-if="$slots.actions">
            <!-- Can be used to render a menu -->
            <slot name="actions"></slot>
        </div>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Tiles is a horizontally aligned block of information, which can be used to standardize navigation,
 * as well as to display list items. Tiles usually contain an icon, title, subtitle and certain actions.
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NTile',
                config: {
                    baseClass: 'n-tile',
                    children: {
                        control: 'n-tile__control',
                        icon: 'n-tile__icon',
                        content: 'n-tile__content',
                        meta: 'n-tile__meta',
                        badge: 'n-tile__badge',
                        actions: 'n-tile__actions',
                        title: 'n-label',
                        subtitle: 'n-help',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Renders the tile as an anchor, but routes the request via $router
         */
        to: {
            type: [String, Object],
        },
        /**
         * Renders the tile as an anchor with href attribute
         */
        href: {
            type: String,
        },
        /**
         * Alternative tag name to use, e.g. `div`
         */
        tagName: {
            type: String,
        },
        /**
         * Displays tile icon
         */
        icon: {
            type: String,
        },
        /**
         * Main text of the tile
         */
        title: {
            type: String,
        },
        /**
         * Help text of the tile
         */
        subtitle: {
            type: String,
        },
        /**
         * Badge props
         */
        badge: {
            type: Object,
        },
    },

    computed: {
        componentName () {
            if (this.href || this.to) {
                return 'a';
            }

            return this.tagName || 'div';
        },

        listeners () {
            const listeners = {
                ...this.$listeners,
            };

            if (!listeners.click && this.to && this.$router) {
                listeners.click = () => {
                    this.$router.push(this.to); /* eslint-disable-line */
                };
            }

            if (!listeners.keydown) {
                listeners.keydown = (e) => {
                    if (e.key === ' ' || e.keyCode === 32) {
                        e.preventDefault();
                        e.stopPropagation();

                        e.target.click();
                    }
                };
            }

            return listeners;
        },

        tabindex () {
            if (this.$attrs.tabindex) {
                return this.$attrs.tabindex;
            }

            if (['a', 'button'].indexOf(this.componentName) > -1) {
                return 0;
            }

            if (this.listeners.click) {
                return 0;
            }

            return -1;
        },
    },
};
</script>
