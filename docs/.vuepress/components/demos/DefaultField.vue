<template>
    <n-field
        help="Please write a few paragraphs about yourself"
        label="Biography"
        required
    >
        <template slot="labelHelp">
            <a>Need Help?</a>
        </template>

        <template slot="default" slot-scope="{ id, required }">
            <textarea :id="id" :required="required" name="bio"></textarea>
        </template>
    </n-field>
</template>
