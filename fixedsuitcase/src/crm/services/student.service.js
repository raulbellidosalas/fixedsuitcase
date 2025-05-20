/**
 * StudentService handles API calls for students.
 * @summary Provides methods to fetch student data.
 * @author Your Name
 */
import httpInstance from "../../shared/services/http.instance.js";
import {environment} from "../../../environment.production.js";
import Student from '../model/student.entity.js';

export default class StudentService {
    static studentEndpoint = environment.students_url;

    static async getStudent(id) {
        const response = await httpInstance.get(`${this.studentEndpoint}/${id}`);
        return new Student(response.data);
    }

    static async getStudentsByParent(parentId) {
        const response = await httpInstance.get(`${this.studentEndpoint}?parentId=${parentId}`);
        return response.data.map(data => new Student(data));
    }
}