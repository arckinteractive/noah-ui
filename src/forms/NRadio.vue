<template>
    <n-field v-bind="localFieldProps">
        <template v-for="name in ['before', 'after', 'errors']">
            <slot :name="name" :slot="name"></slot>
        </template>

        <slot name="input">
            <label
                :class="radioClasses"
                tabindex="0"
                @keypress.prevent.stop="$refs.hidden.click()"
                ref="input"
            >
                <input
                    ref="hidden"
                    v-bind="inputProps"
                    type="radio"
                    :value="option"
                    v-model="inputValue"
                    tabindex="-1"
                />

                <slot name="option" v-bind="inputProps" :value="inputValue">
                    <div :class="config.children.box">
                        <n-icon v-if="isChecked" :icon="config.icons.check"></n-icon>
                    </div>

                    <slot name="label" :label="label">
                        <slot>{{ label }}</slot>
                    </slot>
                </slot>
            </label>
        </slot>

        <slot name="help">
            {{ help }}
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
                name: 'NCheckbox',
                config: {
                    children: {
                        control: 'n-radio',
                        box: 'n-radio__box',
                    },
                    icons: {
                        check: 'fas fa-circle',
                    },
                },
            },
        };
    },

    props: {
        /**
         * Value of the option in the radio group
         */
        option: {
            type: [String, Number, Boolean, Object],
            default: true,
        },
    },

    computed: {
        localFieldProps() {
            const props = this.fieldProps;

            delete props.label;

            return props;
        },

        radioClasses () {
            return {
                [this.config.children.control]: true,
                ...this.buildCssModifiers({
                    labelled: this.$slots.label || this.$slots.default || this.label,
                    checked: this.isChecked,
                }),
            };
        },

        isChecked () {
            return this.inputValue === this.option;
        },
    },
};
</script>
