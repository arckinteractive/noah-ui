<template>
    <n-div flex left-center>
        <n-button
            @click="archive"
            icon="fas fa-archive"
            v-confirm="'Are you sure you want to archive this post?'"
        >Archive
        </n-button>

        <n-button
            @click="deletePermanently"
            danger
            icon="fas fa-trash"
            v-confirm="{
                message: 'Are you sure you want to permanently delete this post? This operation can not be undone',
                type: 'danger',
                title: 'Delete',
                cancelButton: {
                    text: 'Never Mind',
                    outlined: true,
                },
                confirmButton: {
                    text: 'Delete',
                    color: 'danger',
                }
            }"
        >Delete
        </n-button>
    </n-div>
</template>

<script>
import Confirm from '../../../../src/directives/VConfirm';

export default {
    directives: {
        Confirm,
    },
    methods: {
        archive () {
            this.$alert('Item archived');
        },
        deletePermanently () {
            this.$alert('Item deleted');
        },
    },
};
</script>
