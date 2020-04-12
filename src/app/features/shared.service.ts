import { Injectable } from '@angular/core';
import { IMedicine, Medicine } from './medicine.model';

@Injectable()
export class SharedService {
    routeType: string;
    routeData: IMedicine;

    constructor() {
        this.routeType = '';
        this.routeData = new Medicine().medicine;
    }

}
