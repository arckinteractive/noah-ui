import fs from 'fs';
import path from 'path';
import loader from '../loader';

import StoryblokClient from 'storyblok-js-client';

const { storyblok } = require('../../package.json');
const { token, spaceId } = storyblok;

const promises = [];

const exec = ((fn) => {
    promises.push(fn());
});

let Storyblok = new StoryblokClient({
    oauthToken: token,
});

const definitions = loader(path.join(__dirname, '../../src/storyblok/defs/'), ['js']);

let components;
const loadComponents = async () => {
    if (components) {
        return components;
    }

    components = await Storyblok.get(`spaces/${spaceId}/components/`, {})
        .then((response) => response.data.components);

    return components;
};

definitions.forEach((definitionName) => {
    exec(async () => {
        const definition = require(`../../src/storyblok/defs/${definitionName}`).default;
        const components = await loadComponents();

        const component = components.find((e) => definition && definition.name === e.name);

        if (component) {
            await Storyblok.delete(`spaces/${spaceId}/components/${component.id}`, {});
        }

        return Storyblok.post(`spaces/${spaceId}/components/`, {
            component: definition,
        }).then(() => {
            console.log(`Created component ${component.name}`);
        }).catch((err) => {
            console.log(`Could not create component ${component.name}: err.toString()`);
            console.log(err.response.data);
        });
    });
});

try {
    promises.reduce((prev, curr) => {
        return prev.then(() => curr)
            .catch((err) => {
                console.error(err.toString());
            });
    }, Promise.resolve()).then(() => {
        process.exit(0);
    });
} catch (err) {
    console.error(err.toString());

    process.exit(err.code || 1);
}




