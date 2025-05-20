import axios from "axios";
import {environment} from "../../../environment.production.js";

const httpInstance = axios.create({
    baseURL: environment.Base_Api_Url,

    eventsEndpoint :environment.events_url,
    attendeesEndpoint :environment.attendees_url,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

export default httpInstance;