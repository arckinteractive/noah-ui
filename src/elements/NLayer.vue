<template>
    <div
        v-bind="filteredAttrs"
        :style="elementStyles"
    >
        <slot></slot>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Layer is a utility component that provides accessible stacking of overlay components
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NLayer',
                config: {
                    baseClass: 'n-layer',
                },
            },
        };
    },

    props: {
        /**
         * Append layer to app's root element
         */
        appendToRoot: {
            type: Boolean,
            default: true,
        },
    },

    mounted () {
        if (this.appendToRoot) {
            this.$root.$el.append(this.$el);
        }
    },

    destroyed () {
        this.$nextTick(() => {
            if (this.appendToRoot && this.$root.$el.contains(this.$el)) {
                this.$root.$el.removeChild(this.$el);
            }
        });
    },

    computed: {
        elementStyles () {
            return {
                zIndex: this.stackZIndex,
            };
        },
    },
};
</script>
