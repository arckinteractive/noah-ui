import color from '../props/color';
import size from '../props/size';
import gravity from '../props/gravity';
import textAlign from '../props/text-align';

export default {
    name: 'n-section',
    display_name: 'Page Section',
    is_nestable: true,
    schema: {
        content: {
            type: 'bloks',
        },
        color,
        faded: {
            type: 'boolean',
        },
        size,
        gravity,
        textAlign,
        textColor: color,
    },
};
