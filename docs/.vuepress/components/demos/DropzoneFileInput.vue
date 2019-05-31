<template>
    <n-div flex>
        <n-div col sm:12>
            <n-form
                @submit="submitForm"
                @done="onDone"
            >
                <n-dropzone
                    label="Upload Files"
                    help="Upload 2 or more files"
                    required
                    :rules="rules"
                    v-model="files"
                    ref="dropzone"
                >
                </n-dropzone>

                <n-div slot="footer" slot-scope="{ saving }" margin-top="medium">
                    <n-div flex left-center>
                        <n-button
                            :loading="saving"
                            black
                            text="Upload"
                            type="submit"
                        />
                    </n-div>
                </n-div>
            </n-form>
        </n-div>

        <n-div col sm:12>
            <label>Current Value</label>

            <ClientOnly>
                <codemirror :options="cmOptions" :value="JSON.stringify(files, null, 4)"></codemirror>
            </ClientOnly>
        </n-div>
    </n-div>
</template>

<script>
import validators from '../../../../src/utils/validators';

export default {
    data () {
        return {
            rules: [
                validators.custom((value) => {
                    if (value.length < 2) {
                        throw new Error('Please select 2 or more files');
                    }
                }),
            ],
            files: [],
            cmOptions: {
                tabSize: 4,
                mode: 'application/json',
                theme: 'noah',
                lineNumbers: true,
                lineWrapping: true,
                line: true,
                readOnly: true,
            },
        };
    },

    methods: {
        submitForm () {
            // Depending on what your server endpoint looks like
            // you can either construct FormData and append the files
            // or send base64

            return new Promise((resolve) => {
                setTimeout(() => resolve(), 2000);
            });
        },

        onDone () {
            this.$alert('Files have been uploaded', 'success');

            this.$refs.dropzone.reset();
        },
    },
};
</script>
