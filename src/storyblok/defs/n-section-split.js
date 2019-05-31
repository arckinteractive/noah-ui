import color from '../props/color';
import span from '../props/span';
import headingTag from '../props/headingTag';

export default {
    name: 'n-section-split',
    display_name: 'Split Section',
    is_nestable: true,
    schema: {
        color,
        title: {
            type: 'text',
        },
        subtitle: {
            type: 'text',
        },
        content: {
            type: 'bloks',
        },
        contentSpan: {
            ...span,
            display_name: 'Content Width',
        },
        imgSpan: {
            ...span,
            display_name: 'Image Width',
        },
        imgSrc: {
            type: 'image',
            display_name: 'Background Image',
        },
        imgSrcVt: {
            type: 'image',
            display_name: 'Background Image in Portrait Mode',
        },
        imgPosition: {
            type: 'option',
            use_uuid: true,
            options: [
                {
                    value: 'left',
                    name: 'Left',
                },
                {
                    value: 'right',
                    name: 'Right',
                },
            ],
        },
        headingTagName: {
            ...headingTag,
            display_name: 'SEO Level',
        },
    },
};
