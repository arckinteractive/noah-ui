export default {
    name: 'n-menu-item',
    display_name: 'Menu Item',
    is_root: false,
    is_nestable: true,
    schema: {
        title: {
            type: 'text',
        },
        href: {
            type: 'multilink',
        },
        icon: {
            type: 'custom',
            field_type: 'fontawesome-selector',
        },
        children: {
            type: 'bloks',
        },
    },
};
