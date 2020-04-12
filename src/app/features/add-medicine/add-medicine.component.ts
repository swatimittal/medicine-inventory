import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LocalStorageService } from '../localStorage.service';

import { UrlConstants } from '../../constants/url.constants';
import { SharedService } from '../shared.service';
import { Medicine } from '../medicine.model';

@Component({
    selector: 'app-add-medicine',
    templateUrl: './add-medicine.component.html',
    styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent implements OnInit {
    urlConstants = UrlConstants;
    createMedicineForm: FormGroup;
    form: any;
    submitted: boolean;
    priceErrorMessage: string;
    pageTitle: string;
    buttonLabel: string;

    constructor(public fb: FormBuilder,
        private localStorageService: LocalStorageService,
        private router: Router,
        public sharedService: SharedService) {
        this.submitted = false;
        this.priceErrorMessage = 'Price is required.';
        this.pageTitle = '';
        this.buttonLabel = 'Add';
    }

    ngOnInit() {
        this.createForm();
        if (this.sharedService.routeData) {
            this.createMedicineForm.patchValue(this.sharedService.routeData);
        }
        switch (this.sharedService.routeType) {
            case 'clone':
                this.buttonLabel = 'Add';
                this.pageTitle = 'Clone Medicine: ' + this.createMedicineForm.controls.medicineName.value;
                break;
            case 'edit':
                this.buttonLabel = 'Update';
                this.pageTitle = 'Edit Medicine: ' + this.createMedicineForm.controls.medicineName.value;
                break;
            default:
                this.pageTitle = 'Add New Medicine';
                break;
        }
    }

    /** method o show/hide add to quick data button */
    showButton() {
        return this.sharedService.routeType !== 'edit' && this.sharedService.routeType !== 'clone';
    }

    /**
     * creates form
     */
    public createForm(): void {
        this.createMedicineForm = this.fb.group({
            medicineName: ['', Validators.required],
            medicineDescription: ['', Validators.required],
            quantity: [0],
            price: [0, Validators.required]
        });
        this.form = this.createMedicineForm;
    }

    /** checks if price field is valid */
    isFieldValid() {
        if (this.createMedicineForm.controls.price.value !== null) {
            if (this.createMedicineForm.controls.price.value > 0) {
                return false;
            } else {
                this.priceErrorMessage = 'Price should have a minimum value of 1';
                return true;
            }
        }
        this.priceErrorMessage = 'Price is required.';
        return true;
    }

    /**
     * adds data to end Point
     * @param key localStorage to be updated
     */
    addNewMed(key) {
        this.submitted = true;
        if (this.createMedicineForm.valid) {
            const data = this.localStorageService.getItem(key);
            switch (this.sharedService.routeType) {
                case 'edit':
                    for (let i = 0; i < data.length; i++) {
                        if (JSON.stringify(data[i]) === JSON.stringify(this.sharedService.routeData)) {
                            data.splice(i, 1, this.createMedicineForm.getRawValue());
                        }
                    }
                    break;
                case 'add':
                case 'clone':
                default:
                    data.splice(0, 0, this.createMedicineForm.getRawValue());
                    break;
            }
            this.localStorageService.setItem(data, key);
            this.sharedService.routeType = '';
            this.sharedService.routeData = new Medicine().medicine;
            this.router.navigate(['']);
            this.submitted = false;
        }
    }

    /** cancels add and redirects to home */
    cancelAdd() {
        this.submitted = false;
        this.router.navigate(['']);
    }
}

