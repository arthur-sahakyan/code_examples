// Here when we catched some error we called our CatchError function from errors module and use it for send to client.
const {SendError, LogError, CatchError} = require('../utils/Errors');


const sendErrorFunction = (req, res) => {
    try {
        throw new SendError("Bad Request !!!");
    } catch (e) {
        CatchError(e, res);
    }
};
const logErrorFunction = (req, res) => {
    try {
        throw new LogError('Log error in server!!!');

    } catch (e) {
        CatchError(e, res);
    }
};

const otherErrorFunction = (req, res) => {
    try {
        throw new Error('Other Error');
    } catch (e) {
        CatchError(e, res)
    }
}
module.exports = {
    logErrorFunction,
    sendErrorFunction,
    otherErrorFunction,
    CatchError
}