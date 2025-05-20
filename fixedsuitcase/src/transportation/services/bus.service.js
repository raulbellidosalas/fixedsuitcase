/**
 * BusService handles API calls for buses.
 * @summary Provides methods to fetch bus data and calculate available seats.
 * @author Your Name
 */
import httpInstance from "../../shared/services/http.instance.js";
import {environment} from "../../../environment.production.js";
import Bus from '../model/bus.entity.js';
import AssignmentService from './assignment.service.js';

export default class BusService {
    static busEndpoint = environment.buses_url;

    static async getBuses() {
        const response = await httpInstance.get(this.busEndpoint);
        return response.data.map(data => new Bus(data));
    }

    static async getBus(id) {
        const response = await httpInstance.get(`${this.busEndpoint}/${id}`);
        return new Bus(response.data);
    }
    static async getAssignedStudents(busId) {
        const assignments = await AssignmentService.getAssignmentsByBus(busId);
        return assignments.length;
    }
    static async getAvailableSeats(busId) {
        const assignments = await AssignmentService.getAssignmentsByBus(busId);
        const bus = await this.getBus(busId);
        return bus.totalSeats - assignments.length;
    }
}