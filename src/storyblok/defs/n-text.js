import textAlign from '../props/text-align';
import color from '../props/color';
import size from '../props/size';

export default {
    name: 'n-text',
    display_name: 'Text',
    is_nestable: true,
    schema: {
        text: {
            type: 'custom',
            field_type: 'markdown-html',
        },
        size,
        color,
        textAlign,
    },
};
