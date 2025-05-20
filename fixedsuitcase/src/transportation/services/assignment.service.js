/**
 * AssignmentService handles API calls for assignments.
 * @summary Provides methods to manage student-to-bus assignments.
 * @author Your Name
 */
import httpInstance from "../../shared/services/http.instance.js";
import {environment} from "../../../environment.production.js";
import Assignment from '../model/assignment.entity.js';
export default class AssignmentService {
    static assignmentEndpoint = environment.assignments_url;

    static async getAssignmentsByStudent(studentId) {
        try {
            const response = await httpInstance.get(`${this.assignmentEndpoint}?studentId=${studentId}`);
            return Array.isArray(response.data) ? response.data.map(data => new Assignment(data)) : [];
        } catch (error) {
            console.error(`Error fetching assignments for student ${studentId}:`, error);
            return [];
        }
    }

    static async getAssignmentsByBus(busId) {
        try {
            const response = await httpInstance.get(`${this.assignmentEndpoint}?busId=${busId}`);
            return Array.isArray(response.data) ? response.data.map(data => new Assignment(data)) : [];
        } catch (error) {
            console.error(`Error fetching assignments for bus ${busId}:`, error);
            return [];
        }
    }

    static async getAssignment(studentId, busId) {
        try {
            const response = await httpInstance.get(`${this.assignmentEndpoint}?studentId=${studentId}&busId=${busId}`);
            return response.data.length > 0 ? new Assignment(response.data[0]) : null;
        } catch (error) {
            console.error(`Error fetching assignment for student ${studentId} and bus ${busId}:`, error);
            return null;
        }
    }

    static async updateAssignmentAssignedAt(studentId, busId) {
        const assignment = await this.getAssignment(studentId, busId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        const response = await httpInstance.patch(`${this.assignmentEndpoint}/${assignment.id}`, {
            assignedAt: new Date().toISOString()
        });
        return new Assignment(response.data);
    }
}