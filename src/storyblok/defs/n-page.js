export default {
    name: 'n-page',
    display_name: 'Static Page',
    is_root: true,
    is_nestable: false,
    schema: {
        content: {
            display_name: 'Content',
            type: 'bloks',
        },
        title: {
            type: 'text',
            display_name: 'SEO Title',
        },
        description: {
            type: 'text',
            display_name: 'SEO Description',
        },
        keywords: {
            type: 'text',
            display_name: 'SEO Keywords',
        },
        og_image: {
            type: 'image',
            display_name: 'Open Graph Image',
        },
    },
};
