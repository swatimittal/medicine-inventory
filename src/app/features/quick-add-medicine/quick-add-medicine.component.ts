import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalStorageService } from '../localStorage.service';
import { UrlConstants } from 'src/app/constants/url.constants';
import { IMedicine, Medicine } from '../medicine.model';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-quick-add-medicine',
    templateUrl: './quick-add-medicine.component.html',
    styleUrls: ['./quick-add-medicine.component.scss']
})
export class QuickAddMedicineComponent implements OnInit {
    urlConstants = UrlConstants;
    quickAddList: Array<IMedicine>;
    listData: Array<IMedicine>;
    checkBoxChecked: boolean;

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService
    ) {
        this.checkBoxChecked = true;
        this.quickAddList = [];
    }

    ngOnInit() {
        this.quickAddList = this.localStorageService.getItem(this.urlConstants.quickAdd);
        this.quickAddList.forEach(item => {
            item['quantityMessage'] = false;
            item['priceMessage'] = false;
        });
        this.listData = this.localStorageService.getItem(this.urlConstants.list);
    }

    /**
     * method to validate fields
     * post validation add data to end point
     */
    addMed() {
        const checkBoxData = document.getElementsByClassName('checkbox');
        const priceData = document.getElementsByClassName('price');
        const quantityData = document.getElementsByClassName('quantity');
        let temp: IMedicine = new Medicine().medicine;
        let error = false;
        for (let i = 0; i < checkBoxData.length; i++) {
            this.quickAddList[i]['priceMessage'] = false;
            this.quickAddList[i]['quantityMessage'] = false;
            this.checkBoxChecked = false;
            if (checkBoxData[i]['checked']) {
                this.checkBoxChecked = true;
                if (priceData[i]['value'] === '' || priceData[i]['value'] === 0) {
                    this.quickAddList[i]['priceMessage'] = true;
                    error = true;
                }
                if (quantityData[i]['value'] === '' || quantityData[i]['value'] === 0) {
                    this.quickAddList[i]['quantityMessage'] = true;
                    error = true;
                }
                if (!error && this.checkBoxChecked) {
                    temp = {
                        medicineName: this.quickAddList[i].medicineName,
                        medicineDescription: this.quickAddList[i].medicineDescription,
                        price: priceData[i]['value'],
                        quantity: quantityData[i]['value'],
                    };
                    this.listData.splice(0, 0, temp);
                    this.localStorageService.setItem(this.listData, this.urlConstants.list);
                    this.router.navigate(['']);
                }
            }
        }
    }

    /**
     * cancels add and redirects to home
     */
    cancel() {
        this.router.navigate(['']);
    }
}
