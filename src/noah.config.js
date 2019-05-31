import components from './noah.components';

export const breakpoints = {
    mobile: 640,
    tablet: 960,
    desktop: 1280,
    hd: 1920,
};

export const colors = [
    'neutral',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'notice',
    'black',
    'white',
    'grey',
];

export const sizes = {
    xs: 'xsmall',
    s: 'small',
    m: 'medium',
    l: 'large',
    xl: 'xlarge',
    xxl: 'xxlarge',
};

export default {
    components,

    viewport: {
        breakpoints,
        names: {
            sm: '',
            md: 'md:',
            lg: 'lg:',
            xl: 'xl:',
        },
    },

    palettes: colors,
    sizes,

    logger: {
        log () {},
    },

    style: {
        // Can be used to replace CSS class names
        // { 'color-danger': 'color-red' } will replace color-danger with color-red
        classMap: {},

        whitelist: [
            ...colors.map((e) => {
                return {
                    attr: [e],
                    classPrefix: 'color-',
                    responsive: false,
                };
            }),
            ...Object.values(sizes).map((e) => {
                return {
                    attr: [e],
                    classPrefix: 'size-',
                    responsive: false,
                };
            }),
            {
                attr: ['color'],
                classPrefix: 'color-',
                responsive: false,
            },
            {
                attr: ['size'],
                classPrefix: 'size-',
                responsive: false,
            },
            {
                attr: ['text', 'text-color', 'text-size'],
                classPrefix: 'text-',
                responsive: false,
            },
            {
                attr: ['bg', 'bg-color'],
                classPrefix: 'bg-',
                responsive: false,
            },
            {
                attr: ['circle'],
                classPrefix: 'radius-',
                responsive: false,
            },
            {
                attr: ['outlined'],
                class: 'outlined',
                responsive: false,
            },
            {
                attr: ['ghost'],
                class: 'ghost',
                responsive: false,
            },
            {
                attr: ['text-align', 'align'],
                classPrefix: 'align-',
                responsive: true,
            },
            {
                attr: ['padding', 'pad'],
                classPrefix: 'p-',
                responsive: true,
            },
            {
                attr: ['padding-x', 'pad-x', 'px'],
                classPrefix: 'px-',
                responsive: true,
            },
            {
                attr: ['padding-y', 'pad-y', 'py'],
                classPrefix: 'py-',
                responsive: true,
            },
            {
                attr: ['padding-top', 'pad-t', 'pt'],
                classPrefix: 'pt-',
                responsive: true,
            },
            {
                attr: ['padding-bottom', 'pad-b', 'pb'],
                classPrefix: 'pb-',
                responsive: true,
            },
            {
                attr: ['padding-left', 'pad-l', 'pl'],
                classPrefix: 'pl-',
                responsive: true,
            },
            {
                attr: ['padding-right', 'pad-r', 'pr'],
                classPrefix: 'pr-',
                responsive: true,
            },
            {
                attr: ['margin'],
                classPrefix: 'm-',
                responsive: true,
            },
            {
                attr: ['margin-x', 'mx'],
                classPrefix: 'mx-',
                responsive: true,
            },
            {
                attr: ['margin-y', 'my'],
                classPrefix: 'my-',
                responsive: true,
            },
            {
                attr: ['margin-top', 'mt'],
                classPrefix: 'mt-',
                responsive: true,
            },
            {
                attr: ['margin-bottom', 'mb'],
                classPrefix: 'mb-',
                responsive: true,
            },
            {
                attr: ['margin-left', 'ml'],
                classPrefix: 'ml-',
                responsive: true,
            },
            {
                attr: ['margin-right', 'mr'],
                classPrefix: 'mr-',
                responsive: true,
            },
            {
                attr: ['container'],
                class: 'n-container',
                responsive: false,
            },
            {
                attr: ['flex'],
                class: 'n-flex',
                responsive: false,
            },
            {
                attr: [
                    'stacked',
                    'stretched',
                    'unwrapped',
                    'divided',
                ],
                classPrefix: 'flex-',
                responsive: true,
            },
            {
                attr: ['gap'],
                classPrefix: 'flex-gap-',
                responsive: true,
            },
            {
                attr: [
                    'gravity',
                    'right-top',
                    'right-center',
                    'right-bottom',
                    'center-top',
                    'center-center',
                    'center-bottom',
                    'left-top',
                    'left-center',
                    'left-bottom',
                ],
                classPrefix: 'flex-gravity-',
                responsive: true,
            },
            {
                attr: ['col'],
                class: 'n-col',
                responsive: false,
            },
            {
                attr: [
                    'narrow',
                    'auto',
                    'none',
                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
                ],
                classPrefix: 'col-',
                responsive: true,
            },
            {
                attr: ['span'],
                classPrefix: 'col-',
                responsive: true,
            },
        ],
    },
};
