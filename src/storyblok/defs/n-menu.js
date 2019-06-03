export default {
    name: 'n-menu',
    display_name: 'Menu',
    is_root: true,
    is_nestable: true,
    schema: {
        items: {
            display_name: 'Items',
            type: 'bloks',
        },
        horizontal: {
            type: 'boolean',
        },
    },
};
