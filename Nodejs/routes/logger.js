module.exports = {
    log: (req, res, next) => {
        const message = `${req.method}:${req.url} ${res.statusCode}`;
        require('log-timestamp');
        console.log(message);
        next();
    }
}
