<template>
    <n-div flex left-center>
        <n-button
            @click="archive"
            prefix-icon="fas fa-archive"
        >Archive
        </n-button>

        <n-button
            @click="deletePermanently"
            danger
            prefix-icon="fas fa-trash"
        >Delete
        </n-button>
    </n-div>
</template>

<script>
export default {
    methods: {
        archive () {
            this.$confirm('Are you sure want to archive this post?', 'Archive', {
                type: 'warning',
            }).then(() => {
                this.$alert('Item archived');
            }).catch(() => {
                this.$alert('Archiving has been cancelled');
            });
        },

        deletePermanently () {
            this.$confirm('Are you sure want to permanently delete this post?', 'Delete', {
                type: 'danger',
                cancelButton: {
                    text: 'Never Mind',
                    outlined: true,
                },
                confirmButton: {
                    text: 'Delete',
                    color: 'danger',
                },
            }).then(() => {
                this.$alert('Item deleted');
            }).catch(() => {
                this.$alert('Delete has been cancelled');
            });
        },
    },
};
</script>
