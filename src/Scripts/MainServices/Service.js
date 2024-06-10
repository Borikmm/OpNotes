import {DataService} from "./DataService";

export class Service
{
    static instance;

    constructor(app)
    {
        if (Service.instance)
        {
            return Service.instance
        }
        Service.instance = this;

        this.app = app;

        this.createServices();
        //Object.freeze(this);
    }

    createServices()
    {
        this.DataService = new DataService(this.app);
    }
}