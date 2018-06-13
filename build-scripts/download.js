/* REQUIRE EXTERNAL JS */
var https = require('https');
var fs = require('fs');
var path = require('path');

/* REQUIRE INTERNAL JS */
var config = require('../config/config.js');

/* LOCAL VARS */
var baseDir = path.join(__dirname,'/../');
var destinationDir = path.join(baseDir, 'src/js');
var downloadFileName = 'googlemaps.js';


/* EXECUTE FILE DOWNLOAD */
var file = fs.createWriteStream(path.join(destinationDir, downloadFileName));
var request = https.get("https://maps.googleapis.com/maps/api/js?key=" + config.gmapsapi, function(response) {
    response.pipe(file);
});

