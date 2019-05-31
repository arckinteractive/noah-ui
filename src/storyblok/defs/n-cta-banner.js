import color from '../props/color';

export default {
    name: 'n-cta-banner',
    display_name: 'Call To Action Banner',
    is_nestable: true,
    schema: {
        color,
        faded: {
            type: 'boolean',
        },
        columnLeft: {
            type: 'bloks',
        },
        columnRight: {
            type: 'bloks',
        },
    },
};
