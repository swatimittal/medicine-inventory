import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    /** input for showing page based title */
    @Input() pageTitle: string;

    constructor(public router: Router) {
        this.pageTitle = 'Medicine List';
    }

    ngOnInit() {
        document.getElementById('quickAddButton').focus();
    }

    /**
     * method to redirect to given page name
     * @param page page name
     */
    redirect(page) {
        this.router.navigate(['./' + page]);
    }
}
