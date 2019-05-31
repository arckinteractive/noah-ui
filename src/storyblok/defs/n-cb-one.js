import span from '../props/span';
import headingTag from '../props/headingTag';
import gravity from '../props/gravity';

export default {
    name: 'n-cb-one',
    display_name: 'Content Block - One Column',
    is_nestable: true,
    schema: {
        title: {
            type: 'text',
        },
        subtitle: {
            type: 'text',
        },
        contentSpan: {
            ...span,
            display_name: 'Content Width',
            description: 'You can constrain maximum span in columns on large screens',
        },
        content: {
            type: 'bloks',
            display_name: 'Column',
        },
        gravity,
        stretched: {
            type: 'boolean',
        },
        headingTagName: {
            ...headingTag,
            display_name: 'SEO Level',
        },
    },
};
