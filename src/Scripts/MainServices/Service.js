import {DataService} from "./DataService";
import { ToogleMenusService } from "./ToogleMenusService";

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
        this.ToogleMenusService = new ToogleMenusService();
        this.DataService = new DataService(this.app);
    }
}