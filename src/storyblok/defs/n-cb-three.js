import span from '../props/span';
import headingTag from '../props/headingTag';
import gravity from '../props/gravity';

export default {
    name: 'n-cb-three',
    display_name: 'Content Block - Three Columns',
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
        contentLeft: {
            type: 'bloks',
            display_name: 'Left Column',
        },
        contentMiddle: {
            type: 'bloks',
            display_name: 'Middle Column',
        },
        contentRight: {
            type: 'bloks',
            display_name: 'Right Column',
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
