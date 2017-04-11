import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jumbotronheader-component',
    templateUrl: './jumbotron-header.html',
    styleUrls: ['./jumbotron-header.scss']
})

export class JumbotronHeaderComponent {
    @Input() header: string;
    @Input() content: string;
    constructor() {}
}