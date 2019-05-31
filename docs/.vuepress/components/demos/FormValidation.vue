<template>
    <n-form
        @done="onDone"
        @submit="sendData"
    >
        <n-div flex>
            <n-text-field
                :rules="rules.username"
                class="col-12"
                help="Please select a username between 5 and 12 characters"
                label="Username"
                required
                type="text"
                v-model="model.username"
            ></n-text-field>
        </n-div>

        <template slot="footer" slot-scope="{ saving }">
            <n-div flex right-center>
                <n-button
                    :loading="saving"
                    secondary
                    suffix-icon="fas fa-arrow-right"
                    text="Continue"
                    type="submit"
                />
            </n-div>
        </template>
    </n-form>
</template>

<script>
import validators from '../../../../src/utils/validators';

export default {
    data () {
        return {
            model: {
                username: '',
                password: '',
            },

            rules: {
                username: [
                    validators.minLength(5, 'Usernames must be 5 or more characters long'),
                    validators.maxLength(12, 'Usernames can not be more than 12 character long'),
                    validators.custom((value) => {
                        if (value.match(/\s/)) {
                            throw new Error('Usernames can not contain spaces');
                        }
                    }),
                    validators.custom((value) => {
                        // Send an API request to validate username availability
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                reject(new Error('This username has been registered'));
                            }, 2000);
                        });
                    }),
                ],
            },
        };
    },

    methods: {
        sendData () {
            // Return the promise of an http request
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        },

        onDone () {
            this.$alert('Data has been sent');
        },
    },
};
</script>
