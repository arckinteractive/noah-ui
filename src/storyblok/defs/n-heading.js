import textAlign from '../props/text-align';
import color from '../props/color';
import headingTag from '../props/headingTag';
import headingLevel from '../props/headingLevel';

export default {
    name: 'n-heading',
    display_name: 'Heading',
    is_nestable: true,
    schema: {
        text: {
            type: 'text',
        },
        level: {
            ...headingLevel,
            display_name: 'Style Level',
        },
        tagName: {
            ...headingTag,
            display_name: 'SEO Level',
        },
        color,
        textAlign,
    },
};
