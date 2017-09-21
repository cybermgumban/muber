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
        const driver = new Driver ({ email: 't@t.com', driving: true });
        driver.save().then(() => {
            request(app)
            //ES5 you can use put('/api/drivers/' + driver._id)
            //ES6 or put(`/api/drivers/${driver._id}`)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: false })
                .end(() => {
                    Driver.findOne({ email: 't@t.com' })
                        .then(driver => {
                            assert(driver.driving === true);
                            done();
                        });
                });
        });
    });

    it('DELETE to /api/drivers/id deletes an existing driver', done => {
        const driver = new Driver ({ email: 'test@test.com', driving: true });

            driver.save().then(() => {
                request(app)
                //ES5 you can use put('/api/drivers/' + driver._id)
                //ES6 or put(`/api/drivers/${driver._id}`)
                    .delete(`/api/drivers/${driver._id}`)
                    .end(() => {
                        Driver.findOne({ email: 'test@test.com' })
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        })
                    });
            });
    });
});