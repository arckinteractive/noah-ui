<template>
    <div v-bind="filteredAttrs">
        <transition name="fade">
            <img v-if="visible" v-bind="props"/>
        </transition>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Render an image with alternative source for vertical display (e.g. mobile device in a portrait mode)
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NImg',
                config: {
                    baseClass: 'n-img',
                },
            },
            visible: null,
        };
    },

    props: {
        /**
         * Image source URL
         */
        src: {
            type: String,
        },
        /**
         * Image source set URLs
         */
        srcset: {
            type: String,
        },
        /**
         * Alternative image source for vertical displays
         */
        srcVt: {
            type: String,
        },
        /**
         * Alternative image source set for vertical displays
         */
        srcsetVt: {
            type: String,
        },
        /**
         * Image description
         */
        alt: {
            type: String,
        },
        /**
         * Enable intersection observer to load the image when in viewport
         */
        lazyLoad: {
            type: Boolean,
            default: true,
        },
        /**
         * Rotate image in degrees with CSS transform
         */
        rotate: {
            type: Number,
        },
    },

    computed: {
        componentClasses () {
            return {
                [this.config.baseClass]: true,
                ...this.buildCssModifiers({
                    portrait: this.$viewport.isPortrait,
                }),
            };
        },

        props () {
            const rotation = this.rotate || 0;

            return {
                src: this.$viewport.isPortrait && this.srcVt ? this.srcVt : this.src,
                srcset: this.$viewport.isPortrait && this.srvsetVt ? this.srcsetVt : this.srcset,
                alt: this.alt || 'Untitled Image',
                style: {
                    transform: `rotate(${rotation}deg)`,
                },
            };
        },
    },

    mounted () {
        this.$nextTick(() => {
            if (this.lazyLoad) {
                this.createIntersectionObserver();
            } else {
                this.visible = true;
            }
        });
    },

    watch: {
        '$data.$inViewport': {
            immediate: true,
            handler (value) {
                if (value) {
                    this.$data.$intersectionObserver.disconnect();
                    this.visible = true;
                }
            },
        },
    },
};
</script>
