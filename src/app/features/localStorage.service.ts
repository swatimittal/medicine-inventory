import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor() { }
    getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setItem(data, key) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
