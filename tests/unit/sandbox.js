import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import utils from '@vue/test-utils';
import {
    FileReader,
    FileList,
    File,
} from 'file-api';
import config from '@/noah.config';

chai.use(sinonChai);

global.sinon = sinon;

utils.config.mocks.$config = config;
// utils.config.stubs.transition = false;

global.File = File;
global.FileList = FileList;
global.FileReader = FileReader;

process.on('unhandledRejection', (err) => console.log(err));

const sandbox = {
    createLocalVue: utils.createLocalVue,
    expect: chai.expect,
    shallowMount: utils.shallowMount,
    mount: utils.mount,
    ...sinon,
};

export default sandbox;
