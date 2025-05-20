import axios from "axios";
import {environment} from "../../../environment.production.js";

const httpInstance = axios.create({
    baseURL: environment.Base_Api_Url,

    busesEndpoint :environment.buses_url,
    assignmentsEndpoint :environment.assignments_url,
    studentsEndpoint :environment.students_url,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export default httpInstance;