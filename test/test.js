const assert    = require('assert');
const del       = require('del');
const writeFile = require('fs-promise').writeFile;
const exec      = require('cp-sugar').exec;
const pkgd      = require('../');

before(() => {
    return del('testing-repo')
        .then(() => exec('git clone https://github.com/inikulin/testing-repo.git'))
        .then(() => process.chdir('testing-repo'));
});

after(() => {
    process.chdir('../');
    return del('testing-repo');
});

afterEach(() => exec('git reset --hard HEAD'));

it('Should read and parse package.json', () => {
    return pkgd()
        .then(pkgInfo => {
            assert.strictEqual(pkgInfo.name, 'testing-repo');
            assert.strictEqual(pkgInfo.version, '1.3.77');
        });
});

it("Should fail with error if package.json doesn't exists", () => {
    return del('package.json')
        .then(() => pkgd())
        .then(() => {
            throw new Error('Promise rejection expected');
        })
        .catch(err => {
            assert.strictEqual(err.message, "package.json file doesn't exist.");
        });
});

it('Should fail with error if package.json is not a valid JSON-file', () => {
    return writeFile('package.json', 'Yo dawg')
        .then(() => pkgd())
        .then(() => {
            throw new Error('Promise rejection expected');
        })
        .catch(err => {
            assert.strictEqual(err.message, 'package.json is not a valid JSON-file.');
        });
});
