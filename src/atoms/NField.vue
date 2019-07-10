<template>
    <div v-bind="filteredAttrs">
        <!-- Renders before all other elements of the field wrapper -->
        <slot name="before" v-bind="$props"></slot>

        <!-- Overrides the label -->
        <slot name="label" v-bind="$props">
            <label
                v-if="label"
                :for="id"
                :class="config.children.label"
            >
                <span>
                    <span :class="config.children.labelText">{{ label }}</span>
                    <span
                        v-if="required"
                        title="Required"
                        :class="config.children.indicator"
                    >*</span>
                </span>

                <span v-if="$slots.labelHelp" :class="config.children.labelHelp">
                    <!-- Renders additional elements in the label area, e.g. Forgot Password? link above the password input -->
                    <slot name="labelHelp" v-bind="$props"></slot>
                </span>
            </label>
        </slot>

        <div :class="config.children.control">
            <!-- Overrides the control element, including icons -->
            <slot v-bind="$props"></slot>
        </div>

        <!-- Override help text area -->
        <slot name="help" v-bind="$props">
            <div v-if="error" :class="config.children.error">
                {{ error }}
            </div>

            <div v-else-if="help" :class="config.children.help">
                {{ help }}
            </div>
        </slot>

        <!-- Renders after all other elements within a field wrapper -->
        <slot name="after" v-bind="$props"></slot>
    </div>
</template>

<script>
import Styling from '../mixins/Styling';

/**
 * Field is a wrapper component that provides uniform layout for form elements: label, help text, validation messages etc.
 * Field component can be used in conjunction with the Input mixin to introduce new form elements.
 */
export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NField',
                config: {
                    baseClass: 'n-field',
                    children: {
                        label: 'n-field__label',
                        labelText: 'n-field__label-text',
                        labelHelp: 'n-field__label-help',
                        help: 'n-field__help',
                        error: 'n-field__error',
                        control: 'n-field__control',
                        indicator: 'n-field__req-indicator',
                    },
                },
            },
        };
    },

    props: {
        /**
         * ID of the input/control element
         * Used to make labels accessible
         */
        id: {
            type: String,
            default () {
                const hash = Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    .substr(0, 5);

                return `n-field-vue-${hash}`;
            },
        },
        /**
         * Adds required indicator to the label
         */
        required: {
            type: Boolean,
        },
        /**
         * Field label
         */
        label: {
            type: String,
        },
        /**
         * Help text and/or instructions
         */
        help: {
            type: String,
        },
        /**
         * Error messages
         */
        error: {
            type: String,
        },
    },

    computed: {
        componentStates () {
            return {
                required: !!this.required,
                labelled: !!this.label,
                errored: !!this.error,
            };
        },
    },
};
</script>
