const Driver = require("../model/driver");

module.exports = {

// es5 syntax equivalent of the below
// greeting: function(req, res) {};

    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    create(req, res) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver));
    }
};