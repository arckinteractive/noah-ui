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
                <textarea ref="codemirror"></textarea>
            </slot>
        </n-control>
    </n-field>
</template>

<script>
import InputMixin from '../mixins/Input';
import StylingMixin from '../mixins/Styling';

/**
 * CodeMirror is a wonderful utility for highlighting code
 * This component provides a way to render a piece of code in a human readable way.
 * By default, the code will be editable by the user; to make it a read-only, use the `readOnly` config option
 */
export default {
    mixins: [InputMixin, StylingMixin],

    data () {
        return {
            localConfig: {
                name: 'NCodemirror',
                config: {
                    baseClass: 'n-codemirror',
                },
            },
            instance: null,
        };
    },

    props: {
        /**
         * CodeMirror Config Options
         * See the [docs](https://codemirror.net/doc/manual.html#config)
         */
        options: {
            type: Object,
            default () {
                return {
                    tabSize: 2,
                    lineNumbers: true,
                    lineWrapping: false,
                    line: true,
                };
            },
        },

        /**
         * CodeMirror modes
         * See the [docs](https://codemirror.net/mode/index.html)
         */
        modes: {
            type: Array,
            default () {
                return ['htmlmixed'];
            },
        },
    },

    mounted () {
        this.$nextTick(() => {
            this.$codemirror.load({
                modes: this.modes,
            }).then((CodeMirror) => {
                this.instance = CodeMirror.fromTextArea(this.$refs.codemirror, this.options);

                this.instance.setValue(this.value);

                this.instance.on('change', () => {
                    this.inputValue = this.instance.getValue();
                });
            });
        });
    },

    methods: {
        setValue (value) {
            if (this.instance) {
                this.instance.setValue(value);
                this.refresh();
            }
        },
        refresh () {
            this.$nextTick(() => {
                this.instance.refresh();
            });
        },
    },

    watch: {
        value () {
            this.setValue(this.value);
        },
    },
};
</script>

<style scoped lang="scss">

</style>
