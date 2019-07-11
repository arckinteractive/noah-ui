<template>
    <n-div flex>
        <n-button
            danger
            circle
            icon="fas fa-question"
            v-tooltip="'Do you have a question?'"
        ></n-button>

        <n-button
            warning
            circle
            icon="fas fa-exclamation"
            v-tooltip="{
                message: 'You have an answer!',
                placement: { sm: 'bottom-start', lg: 'bottom'},
                attrs: { color: 'danger', 'text-size': 'large' },
            }"
        ></n-button>
    </n-div>
</template>

<script>
import Tooltip from '../../../../src/directives/VTooltip';

export default {
    directives: {
        Tooltip,
    },
};
</script>
