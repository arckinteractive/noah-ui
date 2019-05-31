import vuedoc from '@vuedoc/parser';
import fs from 'fs';
import path from 'path';
import filemap from './filemap';

const components = filemap();

const parsers = Object.keys(components).map((name) => {
    const component = components[name];

    return new Promise(async (resolve, reject) => {
        try {
            const filename = path.resolve(path.join(__dirname, '../../src', component.path, `${name}.vue`));

            const doc = await vuedoc.parse({
                filename: filename,
                defaultMethodVisibility: 'protected',
                ignoredVisibilities: ['protected', 'private'],
            });

            resolve(doc);
        } catch (err) {
            reject(new Error(`${name}: ${err}`));
        }
    });
});

const filePath = path.resolve(__dirname, '../../docs/.vuepress/docs.json');

if (!fs.existsSync(filePath)) {
    fs.closeSync(fs.openSync(filePath, 'w', '0666'));
}

Promise.all(parsers).then((docs) => {
    const buffer = Buffer.from(JSON.stringify(docs));

    fs.writeFileSync(filePath, buffer);

    console.log('Component documentation has been parsed');

    process.exit(0);
}).catch((err) => {
    //console.trace(err);

    process.exit(1);
});
