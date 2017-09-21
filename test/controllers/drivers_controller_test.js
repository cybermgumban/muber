const assert = require("assert");
const mongoose = require("mongoose");
const request = require("supertest");

const Driver = mongoose.model('driver');

const app = require("../../app");

describe('Drivers controller', () => {
    it("Post to /api/drivers create a new driver", (done) => {
        Driver.count().then((count) => {
            request(app)
                .post('/api/drivers')
                .send({ email: "test@test.com", driving: true })
                .end(() => {
                    Driver.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                });
            });
        });
    });

    it('PUT to /api/drivers/id edits an existing driver', done => {
        const driver = new Driver ({ email: 't@t.com', driving: false });
        driver.save().then(() => {
            console.log(driver.driving);
            request(app)
            //ES5 you can use put('/api/drivers/' + driver._id)
            //ES6 or put(`/api/drivers/${driver._id}`)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true })
                .end(() => {
                    console.log(driver.driving);
                    Driver.findOne({ email: 't@t.com' })
                        .then(driver => {
                            assert(driver.driving === false);
                            done();
                        });
                });
        });
    });
});