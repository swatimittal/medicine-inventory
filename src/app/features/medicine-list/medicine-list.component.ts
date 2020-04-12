import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { LocalStorageService } from '../localStorage.service';

import { IMedicine } from '../medicine.model';
import { UrlConstants } from '../../constants/url.constants';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-medicine-list',
    templateUrl: './medicine-list.component.html',
    styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular;

    urlConstants = UrlConstants;
    listData: Array<IMedicine>;

    /** column def for grid */
    columnDefs = [
        { headerName: 'Medicine Name', field: 'medicineName', sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Medicine Description', field: 'medicineDescription', sortable: true, filter: true },
        { headerName: 'Quantity', field: 'quantity', sortable: true, filter: true },
        { headerName: 'Price/10 Tab', field: 'price', sortable: true, filter: true }
    ];

    constructor(private localStorageService: LocalStorageService,
        private sharedService: SharedService,
        private router: Router) {
        this.listData = [];
    }
    ngOnInit() {
        const list = this.localStorageService.getItem(this.urlConstants.list);
        if (list && list.length) {
            this.listData = list;
        }
    }

    /**
     * method to get selected row and perform operation
     * @param type action type
     */
    getSelectedRows(type) {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        if (type === 'delete') {
            const updatedData = this.listData.filter(data => {
                return JSON.stringify(data) !== JSON.stringify(selectedData[0]);
            });
            this.localStorageService.setItem(updatedData, this.urlConstants.list);
            this.listData = updatedData;
        } else {
            this.sharedService.routeData = selectedData[0];
            this.sharedService.routeType = type;
            this.router.navigate([type]);
        }
    }

    /**
     * method to disable icons based on row selection
     */
    getSelectedRowsLength() {
        if (this.agGrid && this.agGrid.api) {
            return this.agGrid.api.getSelectedNodes().length > 0 ? false : true;
        }
    }
}
