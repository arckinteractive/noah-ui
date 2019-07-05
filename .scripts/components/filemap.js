import path from 'path';
import fs from 'fs';
import loader from '../loader';

const getComponentInfo = (groups) => {
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

    return components;
};

const writeSpecFile = ({ componentInfo, outputFilePath }) => {
    if (!fs.existsSync(outputFilePath)) {
        fs.closeSync(fs.openSync(outputFilePath, 'w', '0666'));
    }

    const buffer = Buffer.from(JSON.stringify(componentInfo));

    fs.writeFileSync(outputFilePath, buffer);
};

export default {
    getComponentInfo,
    writeSpecFile,
};
