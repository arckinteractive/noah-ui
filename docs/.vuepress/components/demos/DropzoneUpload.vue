<template>
    <n-div flex>
        <n-div col sm:12>
            <n-form>
                <n-dropzone
                    @send="onSend"
                    @remove="onRemove"
                    label="Upload Files"
                    required
                    v-model="files"
                    ref="dropzone"
                >
                </n-dropzone>
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

export default {
    data () {
        return {
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
        onSend (clientFile) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        id: Math.ceil(Math.random() * 100),
                        name: clientFile.name,
                    });
                }, 2000);
            });
        },

        onRemove (serverFile) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        },
    },
};
</script>
