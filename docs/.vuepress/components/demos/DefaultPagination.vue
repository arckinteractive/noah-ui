<template>
    <n-div flex stacked stretched center-center>
        <n-div flex center-center>
            <n-text-field
                type="number"
                label="Current Page"
                v-model="model.currentPage"
            />

            <n-text-field
                type="number"
                label="Total Items"
                v-model="model.total"
            />

            <n-text-field
                type="number"
                label="Page Size"
                v-model="model.pageSize"
            />
        </n-div>

        <n-pagination
            :total="model.total"
            :page-size="model.pageSize"
            v-model="model.currentPage"
        />
    </n-div>
</template>

<script>
export default {
    data () {
        return {
            model: {
                currentPage: 3,
                total: 100,
                pageSize: 10,
            },
        };
    },
};
</script>
