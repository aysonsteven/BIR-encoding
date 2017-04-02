import { Component, OnInit } from '@angular/core';
import { User } from './../../bir-backend/angular-backend';
import { Router } from '@angular/router';

@Component({
    selector: 'input-page',
    templateUrl: './input.html',
    styleUrls:['./input.scss']
})
export class InputPage implements OnInit {

    constructor( 
        private user: User,
        private router: Router
    ) {}

    ngOnInit() {
        if( ! this.user.logged ) return this.router.navigate(['']);
    }
}