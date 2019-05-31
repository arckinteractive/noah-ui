<template>
    <n-div flex left-center>
        <div>
            <input
                placeholder="Price"
                step="0.01"
                type="number"
                v-bind="$props"
                v-model="internalValue"
            />
        </div>

        <n-tile
            :badge="{ value: internalValue }"
            title="internalValue"
        />

        <n-tile
            :badge="{ value: inputValue }"
            title="inputValue"
        />
    </n-div>
</template>

<script>
import InputMixin from '../../../../src/mixins/Input';

export default {
    mixins: [InputMixin],

    data () {
        return {
            internalValue: this.value / 100,
        };
    },

    watch: {
        internalValue () {
            const value = this.internalValue || 0;

            this.inputValue = parseInt(value * 100, 10);
        },
    },
};
</script>
