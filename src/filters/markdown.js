import Md from 'markdown-it';

export default (value) => {
    const md = new Md();

    if (typeof value === 'string') {
        return md.render(value);
    }

    if (typeof value === 'object') {
        const val = Object.assign({}, value);

        Object.keys(val).forEach((key) => {
            val[key] = typeof value[key] === 'string' ? md.render(value[key]) : value[key];
        });

        return val;
    }

    return value;
};
