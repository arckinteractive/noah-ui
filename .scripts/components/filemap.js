import path from 'path';
import fs from 'fs';
import loader from '../loader';

export default () => {
    const filePath = path.resolve(__dirname, '../../src/noah.components.json');

    if (!fs.existsSync(filePath)) {
        fs.closeSync(fs.openSync(filePath, 'w', '0666'));
    }

    const groups = [
        'elements',
        'forms',
        'patterns',
        'plugins',
        'apps',
        'storyblok',
    ];

    const components = {};

    groups.forEach((group) => {
        const componentNames = loader(path.resolve(__dirname, '../../src/', group), ['vue']);

        componentNames.forEach((e) => {
            components[e] = {
                path: group,
                group: group,
                async: group !== 'elements',
            };
        });
    });

    const buffer = Buffer.from(JSON.stringify(components));

    fs.writeFileSync(filePath, buffer);

    return components;
}

