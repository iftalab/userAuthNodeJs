exports.setupEnvironemnt = function () {
    var fs = require('fs');
    const environment = JSON.parse(fs.readFileSync("environment.json"));
    global.jwtPrivateKey = environment.JWT_PRIVATE_KEY;
}