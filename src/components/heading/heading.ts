import { Component, Input } from '@angular/core';

@Component({
    selector: 'heading-component',
    templateUrl: './heading.html',
    styleUrls:['./heading.scss']
})

export class HeadingComponent {
    @Input() header: string;
    @Input() content: string;
    constructor() {}
}