<template>
    <form
        v-bind="filteredAttrs"
        @submit.prevent.stop="submitForm"
    >
        <!-- Form body -->
        <slot></slot>

        <!--
         Form footer
         @prop {Boolean} saving - Saving state
        -->
        <slot name="footer" v-bind:saving="saving"></slot>
    </form>
</template>

<script>
import Styling from '../mixins/Styling';

export default {
    mixins: [Styling],

    data () {
        return {
            localConfig: {
                name: 'NForm',
                config: {
                    baseClass: 'n-form',
                },
            },
            saving: false,
        };
    },

    computed: {
        componentStates () {
            return {
                saving: this.saving,
            };
        },

        formElFields () {
            const fields = [];

            const getFields = (el) => {
                if (el.shouldValidate && typeof el.validate === 'function') {
                    fields.push(el);
                }

                if (el.$children) {
                    el.$children.forEach(getFields);
                }
            };

            getFields(this);

            return fields;
        },
    },

    methods: {
        async validateForm () {
            const promises = this.formElFields.map(async (field) => {
                return field.validate();
            });

            return Promise.all(promises);
        },

        async submitForm (e) {
            if (this.saving) {
                return Promise.reject(new Error('Form is submitting'));
            }

            this.start();

            try {
                await this.validateForm();
            } catch (err) {
                this.handleError();

                return null;
            }

            return this.sendData(e)
                .then(this.done)
                .catch(this.error);
        },

        handleError () {
            this.$alert({
                message: 'Form contains errors. Please fix the highlighted fields',
                type: 'danger',
            });

            const field = this.formElFields.find((e) => e.error);

            if (field) {
                this.$nextTick(() => {
                    field.$el.scrollIntoView(true, { behavior: 'smooth' });
                });
            }

            this.saving = false;

            return null;
        },

        async sendData (e) {
            const handler = this.$listeners.submit;

            if (typeof handler === 'function') {
                return Promise.resolve(handler(e, this.$refs.form));
            }

            return Promise.resolve();
        },

        start () {
            this.saving = true;
            this.$emit('send:start');
        },

        error (err) {
            this.$error(err || new Error('There was an issue submitting the form'));

            this.saving = false;
            this.$emit('send:error', err);
        },

        done (data) {
            this.saving = false;
            this.$emit('done', data);

            return data;
        },
    },
};
</script>
