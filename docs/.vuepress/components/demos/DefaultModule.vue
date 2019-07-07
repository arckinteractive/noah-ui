<template>
    <n-module
        icon="fas fa-info"
        subtitle="Module subtitle"
        title="Module Title"
        type="card"
    >
        <template slot="actions">
            <n-popup
                placement="bottom-start"
                size="xsmall"
            >
                <n-button
                    circle
                    ghost
                    icon="fas fa-ellipsis-v"
                    slot="trigger"
                    aria-label="Show Menu"
                ></n-button>

                <n-menu :items="actions"></n-menu>
            </n-popup>
        </template>

        <n-div padding="medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum pellentesque elit nec
            elementum. Cras pulvinar dui vitae interdum commodo.
        </n-div>
    </n-module>
</template>

<script>
export default {
    data () {
        return {
            actions: [
                {
                    title: 'Click Handler',
                    subtitle: 'Custom click handler',
                    icon: 'far fa-hand-pointer',
                    click: () => {
                        this.$alert('Thanks for clicking!');
                    },
                },
                {
                    title: 'Anchor',
                    subtitle: 'Go to external URL',
                    href: 'https://example.com/',
                    icon: 'fas fa-anchor',
                },
            ],
        };
    },
};
</script>
