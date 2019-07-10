<template>
    <n-media
        v-bind="filteredAttrs"
        :ratio="ratio"
        @click.native="showFrame"
    >
        <n-hero
            :overlay-color="overlayColor"
            gravity="center-center"
        >
            <template v-if="!visible">
                <!-- Override poster media before play -->
                <slot name="background" slot="background">
                    <n-img :src="posterUrl || oembed.thumbnail_url" alt="Poster"/>
                </slot>

                <div :class="config.children.toggle">
                    <!-- Overrides the play icon -->
                    <slot name="toggle">
                        <n-icon aria-label="Play Video" :icon="config.icons.toggle"/>
                    </slot>
                </div>
            </template>

            <transition name="fade">
                <n-media v-if="visible" :config="config.children.frame" :ratio="ratio" ref="frame">
                    <!-- Overrides the embedded player -->
                    <slot :oembed="oembed">
                        <div v-if="oembed.html" v-html="oembed.html"></div>
                    </slot>
                </n-media>
            </transition>
        </n-hero>
    </n-media>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Embed component allows you to cloak an element (e.g. video or iframe) with an overlay until user clicks on it
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NEmbed',
                config: {
                    baseClass: 'n-embed',
                    children: {
                        frame: 'n-embed__frame',
                        toggle: 'n-embed__toggle',
                    },
                    icons: {
                        toggle: 'fas fa-play',
                    },
                },
            },
            visible: false,
            oembed: {},
        };
    },

    props: {
        /**
         * Aspect ratio
         */
        ratio: {
            type: [Number, String],
            default: 1,
        },
        /**
         * Opaque overlay color
         */
        overlayColor: {
            type: String,
        },
        /**
         * Toggler icon class
         */
        icon: {
            type: String,
        },
        /**
         * URL of the image to use as poster
         */
        posterUrl: {
            type: String,
        },
        /**
         * URL of the embed
         */
        url: {
            type: String,
        },
    },

    methods: {
        showFrame () {
            this.visible = true;
        },
    },

    mounted () {
        if (typeof window !== 'undefined' && this.url) {
            try {
                const url = new URL('https://noembed.com/embed');

                url.searchParams.append('url', this.url);

                window.fetch(url.toString()).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.oembed = json;
                });
            } catch (err) {
                this.$log(err);
            }
        }
    },
};
</script>
