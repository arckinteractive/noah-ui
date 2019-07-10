<template>
    <i v-bind="filteredAttrs"></i>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Icons are glyphs used to provide visual cues
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NIcon',
                config: {
                    baseClass: 'n-icon',
                },
            },
        };
    },

    props: {
        /**
         * Icon class
         */
        icon: {
            type: String,
            required: true,
        },
        /**
         * Icon position, e.g. 'suffix'
         */
        position: {
            type: String,
            default: 'inline',
        },
    },

    computed: {
        componentClasses () {
            return {
                [this.config.baseClass]: true,
                [this.icon]: true,
                ...this.buildCssModifiers({
                    [this.position]: true,
                }),
            };
        },
    },
};
</script>
