<template>
    <div>
        <n-div margin-bottom="large">Resize the window to recompute the props</n-div>

        <n-div flex>
            <n-div
                padding="medium"
                large
                bg="primary-fade"
                col sm:12
            >
                <div class="cm-attribute">{{ `$viewport.size` }}</div>
                <div class="cm-atom"><strong>{{ $viewport.size }}</strong></div>
            </n-div>

            <n-div
                v-for="prop in viewportProps"
                :key="prop"
                padding="medium"
                :bg="boxColor(prop)"
                col sm:12 lg:4
            >
                <div class="cm-attribute">{{ `$viewport.${prop}` }}</div>
                <div class="cm-atom"><strong>{{ $viewport[prop] }}</strong></div>
            </n-div>
        </n-div>
    </div>
</template>

<script>
export default {
    computed: {
        viewportProps () {
            return Object.keys(this.$viewport).filter((e) => e !== 'size');
        },
    },

    methods: {
        boxColor (prop) {
            return this.$viewport[prop] ? 'success-fade' : 'danger-fade';
        },
    },

    watch: {
        '$viewport.size': {
            handler () {
                this.$alert(`Viewport size has changed to ${this.$viewport.size}`);
            },
        },
    },
};
</script>
