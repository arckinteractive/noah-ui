<template>
    <div v-bind="filteredAttrs">
        <slot></slot>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Basic component that allows you to use Styling mixin
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NDiv',
                config: {
                    baseClass: 'n-div',
                },
            },
        };
    },
};
</script>
