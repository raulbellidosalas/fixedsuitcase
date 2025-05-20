export class Attendee{
    constructor({
                    id=0,
                    firstName='',
                    lastName='',
                    eventId=0,
                    ticketIdentifier='',
                    checkedInAt=''
                }){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.eventId=eventId;
        this.ticketIdentifier=ticketIdentifier;
        this.checkedInAt=checkedInAt;
    }
}