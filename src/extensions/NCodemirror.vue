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

export default {
    mixins: [InputMixin],

    data () {
        return {
            instance: null,
        };
    },

    props: {
        /**
         * CodeMirror Config Options
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
        internalValue () {
            this.setValue(this.value);
        },
    },
};
</script>

<style scoped lang="scss">

</style>
