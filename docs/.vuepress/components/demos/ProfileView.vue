<template>
    <n-div divided stacked stretched>
        <n-tile icon="fas fa-mobile">
            <div class="n-help">Mobile</div>
            <div>+1 234 888-3332</div>

            <small slot="actions">
                <n-button size="xsmall">Call</n-button>
            </small>
        </n-tile>

        <n-tile icon="fas fa-at">
            <div class="n-help">Email</div>
            <div>foo@example.com</div>

            <small slot="actions">
                <n-button size="xsmall">Send Email</n-button>
            </small>
        </n-tile>
    </n-div>
</template>
