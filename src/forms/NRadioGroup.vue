<template>
    <n-field v-bind="fieldProps">
        <template v-for="name in ['before', 'after', 'label', 'help', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <slot name="input">
            <n-div flex stacked :gap="gap">
                <n-div flex :stacked="stacked" :gap="gap">
                    <template v-for="option in options">
                        <n-radio
                            :key="option[valueProp]"
                            :option="option[valueProp]"
                            :label="option[labelProp]"
                            v-model="inputValue"
                        >
                            <slot name="option" slot="option" :option="option"></slot>
                        </n-radio>
                    </template>
                </n-div>
            </n-div>
        </slot>
    </n-field>
</template>

<script>
import InputMixin from '../mixins/Input';
import StylingMixin from '../mixins/Styling';

export default {
    mixins: [InputMixin, StylingMixin],

    data () {
        return {
            localConfig: {
                name: 'NCheckboxGroup',
                config: {},
            },
        };
    },

    props: {
        /**
         * An array of options
         * `[{ label: 'Cat', value: 'cat' }]`
         */
        options: {
            type: Array,
        },
        /**
         * Property of the option object to use as label
         */
        labelProp: {
            type: String,
            default: 'label',
        },
        /**
         * Property of the option object to use as value
         */
        valueProp: {
            type: String,
            default: 'value',
        },
        /**
         * Stack options vertically
         */
        stacked: {
            type: Boolean,
        },
        /**
         * Gap size between items
         */
        gap: {
            type: String,
            default: 'small',
        },
    },
};
</script>
