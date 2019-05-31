import headingTag from '../props/headingTag';

export default {
    name: 'n-collapsed',
    display_name: 'Collapsed Module',
    is_nestable: true,
    schema: {
        title: {
            type: 'text',
        },
        subtitle: {
            type: 'text',
        },
        content: {
            type: 'bloks',
        },
        headingTagName: {
            ...headingTag,
            display_name: 'SEO Level',
        },
    },
};
