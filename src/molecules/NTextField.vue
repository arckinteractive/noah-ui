<template>
    <n-field v-bind="fieldProps">
        <template v-for="name in ['before', 'after', 'label', 'help', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <n-control v-bind="controlProps">
            <template v-for="name in ['prefixIcon', 'suffixIcon', 'prefixLabel', 'suffixLabel']">
                <slot :name="name" :slot="name"></slot>
            </template>

            <slot name="input" slot="default" v-bind="inputProps" :value="inputValue">
                <template v-if="inputComponent === 'input'">
                    <input
                        v-on="listeners"
                        v-bind="inputProps"
                        v-model="inputValue"
                        ref="input"
                    />
                </template>

                <template v-else>
                    <textarea
                        v-on="listeners"
                        v-bind="inputProps"
                        v-model="inputValue"
                        ref="input"
                    ></textarea>
                </template>
            </slot>
        </n-control>
    </n-field>
</template>

<script>
import Styling from '../mixins/Styling';
import Input from '../mixins/Input';

export default {
    mixins: [Input, Styling],

    data () {
        return {
            localConfig: {
                name: 'NTextField',
                config: {},
            },
        };
    },

    computed: {
        inputComponent () {
            return this.type === 'textarea' ? 'textarea' : 'input';
        },
    },

    methods: {
        /**
         * Focus the input
         * @public
         */
        focus () {
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
    },
};
</script>
