const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval : '1d',
    path : logDirectory
});

const development = {
    name: 'development',
    db: 'placement_cell',
    asset_path: './assets',
    session_cookie_key: 'somethingYouCanNotCrack',
    google_client_id : '285418167104-79ouu053ru2802pqe4qkck3ok9099btk.apps.googleusercontent.com',
    google_client_secret : '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',
    google_call_back_url : 'http://localhost:8882/employees/auth/google/callback',
    morgan : {
        mode: 'dev',
        options : {stream : accessLogStream}
    }
}

const production = {
    name: 'production',
    db: process.env.PC_DB,
    asset_path: process.env.PC_ASSET_PATH,
    session_cookie_key: process.env.PC_SESSION_COOKIE_KEY,
    google_client_id : process.env.PC_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.PC_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.PC_GOOGLE_CALLBACK_URL,
    morgan : {
        mode: 'combined',
        options : {stream : accessLogStream}
    }
}

// module.exports = development;
module.exports = eval(process.env.PC_ENVIRONMENT) == undefined ? development : eval(process.env.PC_ENVIRONMENT);