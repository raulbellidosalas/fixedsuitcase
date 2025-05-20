/**
 * Bus represents a bus entity.
 * @summary Defines the structure of a bus.
 * @author Your Name
 */
export default class Bus {
    constructor(data) {
        this.id = data.id;
        this.vehiclePlate = data.vehiclePlate;
        this.fuelTankType = data.fuelTankType;
        this.districtId = data.districtId;
        this.totalSeats = data.totalSeats;
    }
}