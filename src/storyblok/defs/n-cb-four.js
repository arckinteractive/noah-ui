import span from '../props/span';
import gravity from '../props/gravity';
import headingTag from '../props/headingTag';

export default {
    name: 'n-cb-four',
    display_name: 'Content Block - Four Columns',
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
        contentFirst: {
            type: 'bloks',
            display_name: 'First Column',
        },
        contentSecond: {
            type: 'bloks',
            display_name: 'Second Column',
        },
        contentThird: {
            type: 'bloks',
            display_name: 'Third Column',
        },
        contentFourth: {
            type: 'bloks',
            display_name: 'Fourth Column',
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
