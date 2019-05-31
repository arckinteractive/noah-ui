export default {
    name: 'n-img',
    display_name: 'Image',
    is_nestable: true,
    schema: {
        src: {
            display_name: 'Source',
            type: 'image',
        },
        srcVt: {
            display_name: 'Source - Portrait Mode',
            type: 'image',
            description: 'You can provide an alternative image to display when the device is in portrait mode',
        },
        alt: {
            display_name: 'Description (Alt Text)',
            type: 'text',
        },
    },
};
