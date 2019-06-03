export default {
    name: 'n-carousel',
    display_name: 'Carousel',
    is_nestable: true,
    schema: {
        content: {
            type: 'bloks',
            display_name: 'Slides',
        },
        arrows: {
            type: 'boolean',
            display_name: 'Show Arrows',
        },
        nav: {
            type: 'boolean',
            display_name: 'Show Navigation Dots',
        },
        autoplay: {
            type: 'number',
            display_name: 'Autoplay (seconds)',
            default_value: 0,
        },
    },
};
