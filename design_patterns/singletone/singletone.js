const singleton = (function() {
    let instance;

    function Connection(host, port, uname, password) {
        this.host = host;
        this.port = port;
        this.userName = uname;
        this.password = password
    }
    return {
        getInstance: (host, port, uname, password) => {
            if(!instance) {
                instance = new Connection(host, port, uname, password);
            }
            return instance;
        }
    }
})();

const connection = singleton.getInstance('localhost', 2100, 'username', 'password');

module.exports = connection;