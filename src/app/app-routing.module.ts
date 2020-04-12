import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './features/medicine-list/medicine-list.component';
import { AddMedicineComponent } from './features/add-medicine/add-medicine.component';
import { QuickAddMedicineComponent } from './features/quick-add-medicine/quick-add-medicine.component';

const routes: Routes = [
    { path: '', component: MedicineListComponent },
    { path: 'add', component: AddMedicineComponent },
    { path: 'quickAdd', component: QuickAddMedicineComponent },
    { path: 'edit', component: AddMedicineComponent },
    { path: 'clone', component: AddMedicineComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
