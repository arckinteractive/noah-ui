<template>
    <div>
        <n-message v-model="visible" closable>I have appeared later</n-message>
    </div>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
        };
    },
    mounted () {
        setTimeout(() => this.visible = true, 1000);
    },
};
</script>
