// Here we created kinds of our Errors

// Send Error for send error message to client
class SendError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SendError';
        this.status = 200;
    }
}

// LogError for log real error in server and send our "something went wrong"  message to client

class LogError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LogError';
        this.status = 500;
    }
}
// Catch Error Function created for using in our controllers to catch errors globally and by instance of error send to client
function CatchError(e, res) {
    if (e instanceof LogError) {
        return res.status(e.status).send({error: "Something went wrong"});
    } else if (e instanceof SendError) {
        return res.status(e.status).send({error: e.message});
    } else {
        return res.status(e.status || 500).send({error: "Something went wrong"});
    }
}

module.exports = {LogError, SendError, CatchError};