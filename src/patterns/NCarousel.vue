<template>
    <div v-bind="filteredAttrs" v-cloak>
        <n-div ref="track" :class="config.children.track">
            <slot></slot>
        </n-div>

        <n-button
            v-if="arrows"
            ref="next"
            :class="config.children.next"
            aria-label="Next"
            circle
            ghost
            black
        >
            <n-icon :icon="config.icons.next"></n-icon>
        </n-button>

        <n-button
            v-if="arrows"
            ref="prev"
            :class="config.children.prev"
            aria-label="Previous"
            circle
            ghost
            black
        >
            <n-icon :icon="config.icons.prev"></n-icon>
        </n-button>

        <slot name="actions"></slot>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Content carousel built on top of tiny-slider
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NCarousel',
                config: {
                    baseClass: 'n-carousel',
                    children: {
                        track: 'n-carousel__track',
                        next: 'n-carousel__next',
                        prev: 'n-carousel__prev',
                    },
                    icons: {
                        next: 'fas fa-angle-right',
                        prev: 'fas fa-angle-left',
                    },
                },
            },
            $slider: null,
        };
    },

    props: {
        /**
         * tiny-slider options
         * See https://github.com/ganlanyuan/tiny-slider
         */
        options: {
            type: Object,
        },
        /**
         * Show navigation dots
         */
        dots: {
            type: Boolean,
            default: true,
        },
        /**
         * Show navigation arrows
         */
        arrows: {
            type: Boolean,
            default: true,
        },
        /**
         * Change slides every X seconds
         */
        autoplay: {
            type: [Number, String],
        },
    },

    mounted () {
        this.$nextTick(() => {
            import('tiny-slider/src/tiny-slider.js').then((module) => {
                const options = Object.assign({}, this.options || {}, {
                    container: this.$refs.track.$el,
                    controls: this.arrows,
                    nextButton: this.arrows ? this.$refs.next.$el : null,
                    prevButton: this.arrows ? this.$refs.prev.$el : null,
                    mouseDrag: true,
                    nav: this.dots,
                    navPosition: 'bottom',
                    autoplay: this.autoplay > 0,
                    autoplayTimeout: parseInt(this.autoplay, 10) / 1000,
                });

                this.$slider = module.tns(options);

                this.$slider.events.on('indexChanged', (...args) => this.$emit('change', args));
            });
        });
    },

    destroyed () {
        if (this.$slider) {
            this.$slider.destroy();
        }
    },

    computed: {
        /**
         * tiny slider instance info
         * @public
         */
        info () {
            return this.$slider.getInfo();
        },
    },
};
</script>

<style lang="scss">
    @import '~tiny-slider/src/tiny-slider';
</style>

<style scoped lang="scss">
    @import '../styles/media-queries';

    .n-carousel {
        position: relative;
        overflow: hidden;
    }

    .n-carousel__track {
        position: relative;
    }

    .n-carousel__next {
        position: absolute;
        right: 0;
        top: 50%;
        color: white;
        background: rgba(255, 255, 255, 0.3) !important;
        margin: 0 var(--space-m);
        transform: translateY(-50%);

        @media #{$is-mobile-only} {
            bottom: 0;
            top: auto;
            margin: var(--space-s);
            transform: none;
        }
    }

    .n-carousel__prev {
        position: absolute;
        left: 0;
        top: 50%;
        color: white;
        background: rgba(255, 255, 255, 0.3) !important;
        margin: 0 var(--space-m);
        transform: translateY(-50%);

        @media #{$is-mobile-only} {
            bottom: 0;
            top: auto;
            margin: var(--space-s);
            transform: none;
        }
    }

    /deep/ .tns-nav {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: var(--space-m) auto;
        display: flex;
        align-items: center;
        justify-content: center;

        & > * {
            padding: 0;
            margin: 4px;
            width: 8px;
            height: 8px;
            display: inline-block;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transition: background var(--transition-duration) ease;

            &.tns-nav-active {
                background: #ffffff;
            }
        }
    }

</style>
