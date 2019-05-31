<template>
    <div class="color-palette">
        <div :key="palette" v-for="palette in palettes">
            <div
                :key="shade"
                :style="{
                    background: shade ? `var(--color-${palette}-${shade})` : `var(--color-${palette})`,
                }"
                class="swatch"
                v-for="shade in shades"
            >

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorPalette',

    data () {
        return {
            palettes: ['neutral', 'black', 'primary', 'secondary', 'danger', 'success', 'warning', 'notice'],
            shades: ['', 'lighten', 'darken', 'fade', 'text'],
        };
    },
};
</script>

<style scoped>
    .swatch {
        width: 100px;
        height: 100px;
    }

</style>
