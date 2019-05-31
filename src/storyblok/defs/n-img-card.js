import headingTag from '../props/headingTag';
import color from '../props/color';
import textAlign from '../props/text-align';

export default {
    name: 'n-img-card',
    display_name: 'Image Card',
    is_nestable: true,
    schema: {
        ratio: {
            type: 'number',
        },
        href: {
            type: 'multilink',
        },
        title: {
            type: 'text',
        },
        imgSrc: {
            type: 'image',
            display_name: 'Background Image',
        },
        imgSrcVt: {
            type: 'image',
            display_name: 'Background Image in Portrait Mode',
        },
        tagName: {
            ...headingTag,
            display_name: 'SEO Level',
        },
        color,
        textAlign,
    },
};
