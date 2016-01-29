const joinPath   = require('path').join;
const relative   = require('path').relative;
const normalize  = require('normalize-path');
const readFile   = require('fs-promise').readFile;
const fstreamNpm = require('fstream-npm');

function readCfg (dir) {
    return readFile(joinPath(dir, 'package.json'))
        .catch(() => {
            throw new Error("package.json file doesn't exist.");
        })
        .then(data => {
            try {
                return JSON.parse(data);
            }
            catch (err) {
                throw new Error('package.json is not a valid JSON-file.');
            }
        });
}

function getPkgFiles (dir) {
    return new Promise((resolve, reject) => {
        // NOTE: see https://github.com/npm/fstream-npm/blob/master/fstream-npm.js#L320
        const rootDir = joinPath(dir, '../package');
        const files   = [];

        fstreamNpm({ path: dir })
            .on('entry', entry => {
                const path = normalize(relative(rootDir, entry.path));

                files.push(path);
            })
            .once('error', reject)
            .once('end', () => resolve(files));
    });
}

module.exports = function getPkgInfo (dir) {
    const info = {
        cfg:   null,
        files: null
    };

    dir = dir || process.cwd();

    return readCfg(dir)
        .then(cfg => info.cfg = cfg)
        .then(() => getPkgFiles(dir))
        .then(files => info.files = files)
        .then(() => info);
};
