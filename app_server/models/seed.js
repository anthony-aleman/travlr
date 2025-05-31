const mongoose = require('./db');
const Trip = require('./travlr');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDb = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDb().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
});