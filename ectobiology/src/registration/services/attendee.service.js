import httpInstance from "../../shared/services/http.instance.js";
import {environment} from "../../../environment.production.js";
import axios from "axios";
import {Attendee} from "../model/attendee.entity.js";

/**
 * @class CategoryService
 * @description Service class for handling CRUD operations on categories using HTTP requests
 */
//aqui cambiar el endpoint
export class attendeeService {
    /** @type {string} The API endpoint for categories */
    static baseApiUrl=environment.Base_Api_Url;
    static resourceEndpoint =environment.attendees_url;
    /**
     * Retrieves all categories
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of categories
     */
    getAll() {
        return httpInstance.get(attendeeService.resourceEndpoint);
    }

    /**
     * Retrieves a category by its ID
     * @param {number|string} id - The ID of the category to retrieve
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the category object
     */
    static async getById(id) {
        return httpInstance.get(`${attendeeService.resourceEndpoint}/${id}`);
    }

    /**
     * Creates a new category
     * @param {Object} resource - The category object to create
     * @param {string} resource.name - The name of the category
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the created category
     */
    create(resource) {
        return httpInstance.post(attendeeService.resourceEndpoint, resource);
    }
    /**
     * Updates an existing category
     * @param {number|string} id - The ID of the category to update
     * @param {Object} resource - The updated category data
     * @param {string} resource.name - The updated name of the category
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the updated category
     */
    update(id, resource) {
        return httpInstance.put(`${attendeeService.resourceEndpoint}/${id}`, resource);
    }
    /**
     * Deletes a category by its ID
     * @param {number|string} id - The ID of the category to delete
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves when the category is deleted
     */
    delete(id) {
        return httpInstance.delete(`${attendeeService.resourceEndpoint}/${id}`);
    }

    /**
     * Retrieves categories by name
     * @param {string} name - The name to search for
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of matching categories
     */
    getByName(name) {
        return httpInstance.get(`${attendeeService.resourceEndpoint}?name=${name}`);
    }
    static async checkIn(attendeeId) {
        const response = await axios.patch(`${this.baseApiUrl}${this.resourceEndpoint}/${attendeeId}`, {
            checkedInAt: new Date().toISOString()
        });
        return new Attendee(response.data);
    }

    static async getAttendeeByTicket(ticketIdentifier) {
        const response = await axios.get(`${this.baseApiUrl}${this.resourceEndpoint}?ticketIdentifier=${ticketIdentifier}`);
        return response.data.length ? new Attendee(response.data[0]) : null;
    }

    static async getByEventId(eventId) {
        return httpInstance.get(`${attendeeService.resourceEndpoint}?event_id=${eventId}`);
    }
}