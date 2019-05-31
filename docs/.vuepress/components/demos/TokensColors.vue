<template>
    <div>
        <div
            class="tokens"
            v-for="color in $config.palettes"
            :key="color"
        >
            <div v-for="variation in variations" :key="variation">
                <div class="swatch" :style="swatchStyle(color, variation)">
                    <span>Text</span>
                </div>
                <div class="var cm-attribute mt-small">{{ `var(--color-${color}${variation})` }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            variations: [
                '-fade',
                '-lighten',
                '',
                '-darken',
            ],
        };
    },

    methods: {
        swatchStyle (color, variation) {
            const prop = `var(--color-${color}${variation})`;

            return {
                background: `${prop}`,
                color: `var(--color-${color}${variation}-invert, ${prop})`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .tokens {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        text-align: center;
    }

    .swatch {
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 65%;
        border-radius: var(--radius-default);
        border: 1px solid var(--color-grey-border);
        box-shadow: var(--box-shadow-s);
        position: relative;
        text-align: center;

        span {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            font-size: var(--text-l);
            font-weight: var(--weight-bold);
        }
    }
</style>
