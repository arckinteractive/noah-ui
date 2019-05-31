<template>
    <n-hero
        v-editable="$attrs.blok"
        gap="medium"
        v-bind="$props"
    >
        <n-div container>
            <n-div
                flex
                center-center
            >
                <n-div col sm:12 md:auto sm:text-align="center" md:text-align="left">
                    <component
                        v-for="slot in $attrs.blok.columnLeft"
                        :key="slot._uid"
                        :blok="slot"
                        v-bind="slot"
                        :is="slot.component | dashify"
                    ></component>
                </n-div>

                <n-div col sm:12 md:auto md:margin-left="auto" sm:text-align="center" md:text-align="right">
                    <component
                        v-for="slot in $attrs.blok.columnRight"
                        :key="slot._uid"
                        :blok="slot"
                        v-bind="slot"
                        :is="slot.component | dashify"
                    ></component>
                </n-div>
            </n-div>
        </n-div>
    </n-hero>
</template>

<script>
export default {
    props: [
        'color',
        'faded',
    ],
};
</script>

<style lang="scss" scoped>
    .header {
        margin-bottom: var(--current-space);

        .n-h5 {
            margin-top: calc(-1 * var(--space-s));
        }
    }
</style>
