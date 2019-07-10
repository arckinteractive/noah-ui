<template>
    <div v-bind="filteredAttrs">
        <!-- Overrides badge value -->
        <slot :value="value">
            {{ value }}
        </slot>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Badges are units of information that summarize elements's content,
 * e.g. number of items in a shopping card, or number of unread messages
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NBadge',
                config: {
                    baseClass: 'n-badge',
                },
            },
        };
    },

    props: {
        /**
         * Badge value
         */
        value: [String, Number],
    },
};
</script>
