<template>
    <component
        :is="tagName"
        v-bind="filteredAttrs"
    >
        <div
            :class="config.children.header"
            v-if="$slots.header || $slots.actions || title"
        >
            <!-- Alternative module header -->
            <slot name="header">
                <n-tile
                    :icon="icon"
                    :subtitle="subtitle"
                    :title="title"
                >
                    <!-- Alternative module actions -->
                    <slot name="actions" slot="actions"></slot>
                </n-tile>
            </slot>
        </div>

        <div :class="config.children.media" v-if="$slots.media">
            <!-- Module media -->
            <slot name="media"></slot>
        </div>

        <div :class="config.children.content">
            <!-- Module content -->
            <slot></slot>
        </div>

        <div :class="config.children.footer" v-if="$slots.footer">
            <!-- Module footer -->
            <slot name="footer"></slot>
        </div>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Modules group header, content and footer into a organic component
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NModule',
                config: {
                    baseClass: 'n-module',
                    children: {
                        header: 'n-module__header',
                        content: 'n-module__content',
                        media: 'n-module__media',
                        footer: 'n-module__footer',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Module type
         */
        type: {
            type: String,
        },
        /**
         *  Module title
         */
        title: {
            type: String,
        },
        /**
         *  Module subtitle
         */
        subtitle: {
            type: String,
        },
        /**
         * Title icon
         */
        icon: {
            type: String,
        },
        /**
         * Alternative tag name to use, e.g. `section`
         */
        tagName: {
            type: String,
            default: 'div',
        },
    },

    computed: {
        componentStates () {
            return {
                [this.type]: true,
            };
        },
    },
};
</script>
