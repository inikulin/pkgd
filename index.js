const readFile = require('fs-promise').readFile;
const joinPath = require('path').join;

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

module.exports = function getPkgInfo (dir) {
    const info = {
        cfg:   null,
        files: null,
        size:  null
    };

    dir = dir || process.cwd();

    return readCfg(dir)
        .then(cfg => info.cfg = cfg);
};
