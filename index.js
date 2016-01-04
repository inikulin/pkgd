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
                throw new Error('package.json is not a valid JSON file.');
            }
        })
        .then(cfg => {
            if (!cfg.name)
                throw new Error("package.json doesn't have `name` specified.");

            if (!cfg.version)
                throw new Error("package.json doesn't have `version` specified.");

            return cfg;
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
