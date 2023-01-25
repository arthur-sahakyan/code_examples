const VehicleFactory = require('./factory');

const car = VehicleFactory.createVehicle(
    {
        type: "car",
        brand: "BMW",
        doors: 4,
        color: "Green",
        state: "new"
    });

const truck = VehicleFactory.createVehicle({
    type: 'truck'
});


console.log('car  ---------->', car);
console.log('truck -------------->', truck);