import size from '../props/size';
import color from '../props/color';
import textAlign from '../props/text-align';

export default {
    name: 'n-list',
    display_name: 'List',
    is_nestable: true,
    schema: {
        content: {
            type: 'bloks',
            display_name: 'Items',
        },
        numbered: {
            type: 'boolean',
        },
        bulleted: {
            type: 'boolean',
        },
        divided: {
            type: 'boolean',
        },
        size,
        color,
        textAlign,
    },
};
