/* REQUIRE EXTERNAL JS */
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var request = require('request');
var createError = require('http-errors');
var path = require('path');
var sm = require('sitemap');
var bunyan = require('bunyan');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

/* REQUIRE INTERNAL JS */
var config = require('./config/config.js');

/* INITIALIZE LOGGER */
let logger = bunyan.createLogger({
    name: 'nodemailer'
});
logger.level('trace');

/* SETUP MAIL-TRANSPORTER */
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: config.user,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken
    },
    logger,
    debug: false
});

/* SETUP EXPRESS */
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(compression());
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

/* SITEMAP*/
var sitemap = sm.createSitemap({
    cacheTime: 600000,
    urls: [
        { url: 'http://syntech-services.be/#/home', changefreq: 'monthly', priority: 0.7 },
        { url: 'http://syntech-services.be/#/contactus', changefreq: 'monthly', priority: 0.7 },
        { url: 'http://syntech-services.be/#/services', changefreq: 'monthly', priority: 0.7 },
        { url: 'http://syntech-services.be/#/pricing', changefreq: 'monthly', priority: 0.7 },
        { url: 'http://syntech-services.be/#/aboutus', changefreq: 'monthly', priority: 0.7 },
        { url: 'http://syntech-services.be/#/portfolio', changefreq: 'monthly', priority: 0.3 }
    ]
});

/* REQUEST / */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

/* REQUEST SITEMAP */
app.get('/sitemap.xml', function(req, res) {
    res.header('Content-Type', 'application/xml');
    res.send(sitemap.toString());
});

/* CONTACT */
app.post('/contact', function(req, res, next) {

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        res.status(500).send({ error: 'Invalid Captcha' });
    }

    var secretKey = "[SECRETKEY]";
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            res.status(500).send({ error: 'Failed Captcha Verification' });
        } else {

            var name = req.body.name;
            var message = req.body.message;
            var email = req.body.email;
            var phone = req.body.phone;

            var mailOptions = {
                from: 'SynTech Services <[EMAILADDRESS]>',
                to: '[EMAILADDRESS]',
                subject: "SynTech Services - Contact: " + req.body.subject,
                html: '<html><body>' + '<div>Name: ' + name + '</div>' + '<div>Email: ' + email + '</div><div>Phone: ' + phone + '</div><div>Bericht: ' + message + '</div></body></html>'
            };

            console.log('Sending Mail: ' + JSON.stringify(mailOptions));
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('Error occurred');
                    console.log(error.message);
                    res.status(500).send({ error: error });
                } else {
                    console.log('Message sent successfully!');
                    console.log('Server responded with "%s"', info.response);
                    res.json(info);
                }
            });
        }
    });
})

app.listen(app.get('port'), function() {
    console.log('Server running on port: ', app.get('port'));
});
