const md = require('markdown-it')({});

export default (content) => {
    if (typeof content !== 'string' || !content) {
        return '';
    }

    return md.render(content);
};
