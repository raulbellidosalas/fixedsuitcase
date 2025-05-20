/**
 * Student represents a student entity.
 * @summary Defines the structure of a student.
 * @author Your Name
 */
export default class Student {
    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.districtId = data.districtId;
        this.parentId = data.parentId;
    }
}