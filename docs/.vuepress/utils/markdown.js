import Md from 'markdown-it';

export default (content) => {
    if (typeof content !== 'string' || !content) {
        return '';
    }

    const Md = new Md();

    return Md.render(content);
};
