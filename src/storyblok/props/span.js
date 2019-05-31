const spans = Array.from(Array(12).keys()).map((e) => {
    return {
        value: e + 1,
        name: `Span ${e + 1}`,
    };
});

export default {
    type: 'option',
    use_uuid: true,
    options: [
        {
            value: null,
            name: 'None',
        },
        {
            value: 'auto',
            name: 'Auto',
        },
        {
            value: 'narrow',
            name: 'Narrow',
        },
        ...spans,
    ],
};
