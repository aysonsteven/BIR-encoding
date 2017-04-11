import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'help-page',
    templateUrl: 'help.html',
    styleUrls:['./help.scss']
})
export class HelpPage implements OnInit {
    user: string;
    encoding: string;
    files: string;
    management: string;
    navigation: string;
    model: string;
    constructor( private activeroute: ActivatedRoute ) {}

    ngOnInit() {
        this.activeroute.params.forEach( params =>{
            this.model = params['model'];
            this.activeCheck();
        })
    }

    activeCheck() {
        if( this.model == 'user' ) {
            this.encoding = this.files = this.management = this.navigation = '';
            this.user = 'active';
        }
        else if( this.model == 'encoding' ) {
            this.user = this.files = this.management = this.navigation = '';
            this.encoding = 'active';
        } 
        else if( this.model == 'files'){
            this.user = this.management = this.navigation = this.encoding = '';
            this.files = 'active';
        }
        else if( this.model == 'management' ) {
            this.user = this.files = this.navigation = this.encoding = '';
            this.management = 'active';
        }
        else {
            this.user = this.files = this.encoding = this.management = '';
            this.navigation = 'active';
        }
    }
}