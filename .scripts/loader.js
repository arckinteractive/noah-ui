import fs from 'fs';

export default (dirPath, extensions = ['js']) => {
    const regex = new RegExp(`\\.${extensions.join('|')}$`);

    return fs.readdirSync(dirPath)
        .filter((e) => e.match(regex))
        .map((e) => e.replace(regex, ''));
};
