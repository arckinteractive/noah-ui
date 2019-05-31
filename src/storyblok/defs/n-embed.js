import color from '../props/color';

export default {
    name: 'n-embed',
    display_name: 'Embed',
    is_nestable: true,
    schema: {
        url: {
            type: 'text',
            description: 'Embed URL',
        },
        posterUrl: {
            type: 'image',
            description: 'Poster/preview image',
        },
        ratio: {
            type: 'number',
        },
        overlayColor: color,
    },
};
