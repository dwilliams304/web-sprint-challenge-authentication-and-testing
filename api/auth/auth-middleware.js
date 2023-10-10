const db = require('../../data/dbConfig');
/*
    On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
*/

const validatePayload = (req, res, next) => {
 
}


const checkUsernameFree = async (req, res, next) => {

}

const checkUsernameExists = async (req, res, next) => {

}



module.exports = {
    validatePayload,
    checkUsernameFree,
    checkUsernameExists,

}