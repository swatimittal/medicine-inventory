export interface IMedicine {
    medicineName: string;
    medicineDescription: string;
    quantity: number;
    price: number;
}

export class Medicine {
    medicine: IMedicine;
    constructor() {
        this.medicine = {
            medicineName: '',
            medicineDescription: '',
            quantity: 0,
            price: 0
        };
    }
}
