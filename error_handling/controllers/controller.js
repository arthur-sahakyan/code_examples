// Here when we catched some error we called our CatchError function from errors module and use it for send to client.
const {SendError, LogError, CatchError} = require('../utils/Errors');


const signup = (req, res) => {
    try {
        throw new SendError("Bad Request !!!");
    } catch (e) {
        CatchError(e, res);
    }
};
const login = (req, res) => {
    try {
        throw new LogError('Login was failed');

    } catch (e) {
        CatchError(e, res);
    }
};


module.exports = {
    login,
    signup,
}