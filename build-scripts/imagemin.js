var jimp = require("jimp");
var fs = require('fs');
var path = require('path');
var globalFunc = require('./global/globalFunc.js');

globalFunc.getRecursiveDirectories().forEach(function(srcPath) {
    var distPath = srcPath.replace(path.join('src', 'assets'), path.join('dist', 'assets'));
    //console.log(srcPath + ' -> ' + destination);
    /* JIMP */
    fs.readdir(srcPath, (err, files) => {
        files.filter(function(file) {
            return file.substr(-4) === '.jpg' || file.substr(-5) === '.jepg' || file.substr(-4) === '.png';
        }).forEach(file => {
            var srcFile = path.join(srcPath, file);
            var distFile = path.join(distPath, file);
            jimp.read(srcFile).then(function(image) {
                var srcStats = fs.statSync(srcFile);
                if (srcStats.size > 20000) { // > 20KB
                    var savedImage = image.resize(1280, 720).quality(80).write(distFile);
                } else {
                    var savedImage = image.quality(80).write(distFile);
                }
            }).catch(function(err) {
                console.error(err);
            });
        });
    });
});
