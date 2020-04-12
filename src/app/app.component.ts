import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './features/localStorage.service';

import { IMedicine } from './features/medicine.model';
import { UrlConstants } from './constants/url.constants';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'medicine-inventory';
    listData: Array<IMedicine>;
    quickAddData: Array<IMedicine>;
    urlConstants = UrlConstants;

    constructor(private localStorageService: LocalStorageService) { }

    ngOnInit() {
        /**
         * setting initial data in localStorage for reference
         */
        this.listData = [
            {
                medicineName: 'VomiStop',
                medicineDescription: 'Helps nausea',
                quantity: 84,
                price: 20
            },
            {
                medicineName: 'Cetrizine',
                medicineDescription: 'Treats cold symptoms',
                quantity: 25,
                price: 50
            },
            {
                medicineName: 'Avil 25',
                medicineDescription: 'Treats allergic reactions',
                quantity: 74,
                price: 60
            },
        ];
        this.quickAddData = [
            {
                medicineName: 'Paracetamol',
                medicineDescription: 'Treats pain and fever',
                quantity: 100,
                price: 68
            },
            {
                medicineName: 'Crocin',
                medicineDescription: 'Relaxes pains',
                quantity: 49,
                price: 35
            },
            {
                medicineName: 'Benadryl',
                medicineDescription: 'cough Syrup',
                quantity: 65,
                price: 90
            },
        ];
        this.localStorageService.setItem(this.listData, this.urlConstants.list);
        this.localStorageService.setItem(this.quickAddData, this.urlConstants.quickAdd);
    }
}
