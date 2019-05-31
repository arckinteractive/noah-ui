import color from '../props/color';
import size from '../props/size';
import gravity from '../props/gravity';
import textAlign from '../props/text-align';
import span from '../props/span';

export default {
    name: 'n-img-hero',
    display_name: 'Image Hero',
    is_nestable: true,
    schema: {
        content: {
            type: 'bloks',
        },
        contentSpan: {
            ...span,
            display_name: 'Content Width',
            description: 'You can constrain maximum span in columns on large screens',
        },
        color,
        overlayColor: color,
        size,
        gravity,
        textAlign,
        textColor: color,
        imgSrc: {
            type: 'image',
            display_name: 'Background Image',
        },
        imgSrcVt: {
            type: 'image',
            display_name: 'Background Image in Portrait Mode',
        },
    },
};
