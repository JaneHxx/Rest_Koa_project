const pack = require('../pack/pack');
const path = require('path');
const packConfig = {
    entryPath: path.resolve('./app.js'),
    outPath: path.resolve('./www'),
    isCompression: true
};

pack(packConfig);
