const Users = require('../users/users-model');
/*
    On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
*/

const validatePayload = (req, res, next) => {
    if(!req.body.username || !req.body.password ||
     !req.body.username.trim() || !req.body.password.trim()) {
        next({status: 422, message: 'username and password required'})
    }
    else{
        req.vld_password = req.body.password.trim()
        req.vld_username = req.body.username.trim()
        next();
    }
}


const checkUsernameFree = async (req, res, next) => {
    const [exists] = await Users.findBy({username: req.vld_username});
    if(exists) next({status: 401, message: 'username taken'})
    else next();
}

const checkUsernameExists = async (req, res, next) => {
    const [existing] = await Users.findBy({username: req.vld_username})
    if(!existing) next({status: 401, message: 'username taken'})
    else {
        req.user = existing;
        next();
    }
}



module.exports = {
    validatePayload,
    checkUsernameFree,
    checkUsernameExists,

}