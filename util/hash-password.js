const bcrypt = require('bcrypt');
const constants = require('../config/constants');

//generate hash password
function generateHashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password,constants.saltRounds,(err, hash)=> {
            if (err)
                reject(err)
            else
                resolve(hash)
        });
    })
}

//check hash password
function checkHashPassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            if (err)
                reject(err)
            else
                resolve(res)
        });
    })
}

module.exports={
generateHashPassword,
checkHashPassword
}