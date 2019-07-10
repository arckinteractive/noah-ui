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
                async: group !== 'atoms',
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

const writeIdeSpecFile = ({ componentInfo, outputFilePath }) => {
    if (!fs.existsSync(outputFilePath)) {
        fs.closeSync(fs.openSync(outputFilePath, 'w', '0666'));
    }

    const lines = [];

    lines.push(
        `/**`,
        ` * Helper file for IDE autocomplete`,
        ` * Actual files are loaded in main.js based on async/loader config`,
        ` */`,
        ``,
        `import Vue from 'vue';`,
        ``,
    );

    Object.keys(componentInfo).forEach(async (componentName) => {
        const opts = componentInfo[componentName];

        if (typeof opts === 'object' && opts !== null) {
            const componentDir = opts.path.replace('\\', '/');

            lines.push(`Vue.component('${componentName}', () => import('.\/${componentDir}\/${componentName}.vue'));`);
        }
    });

    lines.push('');
    
    const buffer = Buffer.from(lines.join('\n'));

    fs.writeFileSync(outputFilePath, buffer);
};

export default {
    getComponentInfo,
    writeSpecFile,
    writeIdeSpecFile, // helper for IDE autocomplete
};
