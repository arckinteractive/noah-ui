import headingTag from '../props/headingTag';
import textAlign from '../props/text-align';

export default {
    name: 'n-card',
    display_name: 'Card',
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
        href: {
            type: 'multilink',
        },
        ratio: {
            type: 'number',
        },
        imgSrc: {
            type: 'image',
            display_name: 'Background Image',
        },
        imgSrcVt: {
            type: 'image',
            display_name: 'Background Image in Portrait Mode',
        },
        headingTagName: {
            ...headingTag,
            display_name: 'SEO Level',
        },
        textAlign,
    },
};
