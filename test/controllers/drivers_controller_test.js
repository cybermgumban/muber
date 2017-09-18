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
});