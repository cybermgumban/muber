const Driver = require("../model/driver");

module.exports = {

// es5 syntax equivalent of the below
// greeting: function(req, res) {};

    greeting(req, res, next) {
        res.send({ hi: 'there' });
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next) {
        //the id at the end of req.params.id should match with
        //what you input at /api/driver/:id
        const DriverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({ _id: driverId, driverProps })
            .then(() => Driver.findById({ _id: driverId }))
            .then(driver=> res.send(driver))
            .catch(next);
    }
};