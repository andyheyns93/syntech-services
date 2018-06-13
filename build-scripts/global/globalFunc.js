var path = require("path");
var fs = require("fs");
var zlib = require("zlib");

globalFunctions = {
    compressfile: function compressfile(file) {
        console.log('Compressing: ' + file);
        var readstream = fs.createReadStream(file);
        var gzip = zlib.createGzip();
        var writestream = fs.createWriteStream(file + ".gz");
        readstream.pipe(gzip).pipe(writestream);
    },
    getRecursiveDirectories: function uniqueDirectories() {
        var recursiveDir = 'src/assets/images';
        var dir = [];
        var baseDir = path.join(__dirname, '/../../');
        
        var walkSync = (dir, filelist = []) => {
            fs.readdirSync(dir).forEach(file => {
                filelist = fs.statSync(path.join(dir, file)).isDirectory() ? walkSync(path.join(dir, file), filelist) : filelist.concat(dir);
            });
            return filelist;
        }
        return walkSync(path.join(baseDir, recursiveDir)).filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
    }
}
module.exports = globalFunctions;
