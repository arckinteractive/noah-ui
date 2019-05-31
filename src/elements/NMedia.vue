<template>
    <component
        :is="tagName"
        :style="elementStyles"
        v-bind="filteredAttrs"
    >
        <div :class="config.children.content" :style="contentStyles">
            <!-- Embedded element or image tag -->
            <slot></slot>
        </div>

        <figcaption :class="config.children.caption" v-if="$slots.caption || caption">
            <!-- Embed caption -->
            <slot name="caption">
                {{ caption }}
            </slot>
        </figcaption>
    </component>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Media component is a responsive container for images, videos, iframes etc.
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NMedia',
                config: {
                    baseClass: 'n-media',
                    children: {
                        content: 'n-media__content',
                        caption: 'n-media__caption',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Aspect ratio
         * Set to 0 to contain by parent height instead
         */
        ratio: {
            type: [Number, String],
            default: 1,
        },

        /**
         * HTML tag
         */
        tagName: {
            type: String,
            default: 'figure',
        },

        /**
         * Width constraint
         */
        width: {
            type: String,
        },
        /**
         * Render as a circular avatar
         */
        avatar: {
            type: Boolean,
            default: false,
        },
        /**
         * Caption or copyright notice
         */
        caption: {
            type: String,
        },
    },

    computed: {
        componentStates () {
            return {
                contained: this.ratio === 0,
                avatar: this.avatar,
            };
        },

        elementStyles () {
            let maxWidth;

            if (this.width) {
                maxWidth = this.width;
            } else if (this.avatar) {
                maxWidth = '80px';
            } else {
                maxWidth = '100%';
            }

            return {
                maxWidth,
            };
        },

        contentStyles () {
            return {
                paddingBottom: this.ratio ? `${1 / this.ratio * 100}%` : null,
            };
        },
    },
};
</script>
