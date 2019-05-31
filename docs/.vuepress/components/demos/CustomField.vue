<template>
    <n-field
        help="Some important help text"
        label="Label"
        required
    >
        <input
            placeholder="Placeholder"
            required
            step="0.01"
            type="number"
            v-model="value"
        />
    </n-field>

</template>

<script>
import Input from '../../../../src/mixins/Input';

export default {
    components: { Input },
    data () {
        return {
            value: 0,
        };
    },

    methods: {
        onChange () {
            this.$alert(`Value changed to ${this.value}`);
        },
    },
};
</script>
