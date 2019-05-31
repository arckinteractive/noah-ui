export default {
    name: 'n-testimonial',
    display_name: 'Testimonial',
    is_root: true,
    is_nestable: true,
    schema: {
        text: {
            type: 'custom',
            field_type: 'markdown-html',
        },
        name: {
            type: 'text',
        },
        image: {
            type: 'image',
        },
    },
};
