/**
 * Assignment represents a student-to-bus assignment.
 * @summary Defines the structure of an assignment.
 * @author Your Name
 */
export default class Assignment {
    constructor(data) {
        this.id = data.id;
        this.studentId = data.studentId;
        this.busId = data.busId;
        this.assignedAt = data.assignedAt;
    }
}