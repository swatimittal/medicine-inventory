import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStorageService } from './features/localStorage.service';
import { SharedService } from './features/shared.service';

import { MedicineListComponent } from './features/medicine-list/medicine-list.component';
import { QuickAddMedicineComponent } from './features/quick-add-medicine/quick-add-medicine.component';
import { AddMedicineComponent } from './features/add-medicine/add-medicine.component';
import { FooterComponent } from './features/footer/footer.component';
import { HeaderComponent } from './features/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MedicineListComponent,
        AddMedicineComponent,
        QuickAddMedicineComponent,
        FooterComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot([]),
        AppRoutingModule,
        BrowserModule,
        AgGridModule
    ],
    providers: [
        LocalStorageService,
        SharedService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
