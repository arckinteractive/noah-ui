<template>
    <n-div flex v-bind="filteredAttrs">
        <div
            v-if="$slots.background"
            :class="bgClasses"
        >
            <n-media :ratio="0">
                <!-- Can be used to render background image/video -->
                <slot name="background"></slot>
            </n-media>
        </div>

        <div
            v-if="overlayColor"
            :class="overlayClasses"
        ></div>

        <slot :class="contentClasses"></slot>
    </n-div>
</template>

<script>
import Styling from '../mixins/Styling';

export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NHero',
                config: {
                    baseClass: 'n-hero',
                    children: {
                        bg: 'n-hero__bg',
                        overlay: 'n-hero__overlay',
                        content: 'n-hero__content n-container',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Opaque overlay color
         */
        overlayColor: {
            type: String,
        },

        /**
         * Use faded background
         */
        faded: {
            type: Boolean,
        },
    },

    computed: {
        componentStates () {
            return {
                faded: this.faded,
            };
        },

        bgClasses () {
            return {
                [this.config.children.bg]: true,
            };
        },

        overlayClasses () {
            return {
                [this.config.children.overlay]: true,
                ...this.buildCssModifiers({
                    [`color-${this.overlayColor}`]: true,
                }),
            };
        },

        contentClasses () {
            return {
                [this.config.children.content]: true,
            };
        },
    },
};
</script>
