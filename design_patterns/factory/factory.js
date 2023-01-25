class Car {
    constructor({brand, color, doors, state}) {
        this.brand = brand || "Mercedes-Benz";
        this.color = color || "white";
        this.doors = doors || 4;
        this.state = state || "new";
    }
}
class Truck {
    constructor({brand, color, doors, state}) {
        this.brand = brand || "Renault";
        this.color = color || "black";
        this.doors = doors || 2;
        this.state = state || "used";
    }
}
class VehicleFactory {
  createVehicle(options) {
      if (options.type === 'car'){
        return new Car(options);
      } else if (options.type === 'truck') {
          return new Truck(options);
      }
  }
}

module.exports = new VehicleFactory();