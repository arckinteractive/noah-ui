import color from '../props/color';
import size from '../props/size';

export default {
    name: 'n-button',
    display_name: 'Button',
    is_nestable: true,
    schema: {
        text: {
            type: 'text',
        },
        href: {
            type: 'multilink',
        },
        color,
        size,
        outlined: {
            type: 'boolean',
        },
        circle: {
            type: 'boolean',
        },
        ghost: {
            type: 'boolean',
        },
        prefixIcon: {
            type: 'custom',
            field_type: 'fontawesome-selector',
        },
        suffixIcon: {
            type: 'custom',
            field_type: 'fontawesome-selector',
        },
    },
};
