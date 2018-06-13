var fs = require("fs");
var path = require('path');

var globalFunc = require('./global/globalFunc.js');
var tempArr = [];

var directories = globalFunc.getRecursiveDirectories().concat([path.join(__dirname, '/../dist/')]);

directories.forEach(function(srcPath) {
	var distPath = srcPath.replace(path.join('src', 'assets'), path.join('dist', 'assets'));
    fs.readdir(srcPath, (err, files) => {
        /* JAVASCRIPT FILES */
        tempArr = [].concat(files);
        tempArr.filter(function(file) {
            return file.substr(-3) === '.js';
        }).forEach(file => {
            var distFile = path.join(distPath, file);
            globalFunc.compressfile(distFile);
        });

        /* IMAGE FILES */
        tempArr = [].concat(files);
        tempArr.filter(function(file) {
            return file.substr(-4) === '.jpg' || file.substr(-5) === '.jepg' || file.substr(-4) === '.png';
        }).forEach(file => {
            var distFile = path.join(distPath, file);
            var fileStatistics = fs.statSync(distFile);

            if(fileStatistics.size > 20000){ // > 20KB
            	globalFunc.compressfile(distFile);
            } 
            
        });
		
    });
});
