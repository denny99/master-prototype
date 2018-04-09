export default class Aircraft {
    id: string;
    model: string;
    name: string;
    passengerCount: number;

    constructor(json: any) {
        this.id = json.id;
        this.model = json.model;
        this.name = json.name;
        this.passengerCount = json.passengerCount;
    }
}