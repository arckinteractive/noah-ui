<template>
    <n-div flex center-center>
        <n-form
            @done="onDone"
            @submit="sendData"
            class="col-12 md:col-6"
        >
            <n-div flex stacked stretched gap="small">
                <n-text-field
                    large
                    placeholder="Username"
                    prefix-icon="fas fa-user"
                    required
                    autocomplete="off"
                    v-model="model.username"
                ></n-text-field>

                <n-text-field
                    large
                    placeholder="Password"
                    prefix-icon="fas fa-lock"
                    required
                    type="password"
                    autocomplete="off"
                    v-model="model.password"
                ></n-text-field>

                <n-checkbox
                    v-model="model.persistent"
                >Remember Me
                </n-checkbox>
            </n-div>

            <n-div slot="footer" slot-scope="{ saving }" margin-top="medium">
                <n-div flex left-center>
                    <n-button
                        :loading="saving"
                        class="col-12"
                        icon="fas fa-shield-alt"
                        large
                        secondary
                        text="Login Securely"
                        type="submit"
                    />
                </n-div>
            </n-div>
        </n-form>
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: {
                username: '',
                password: '',
                persistent: false,
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
