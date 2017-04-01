import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { User, POST_CREATE, POST_CREATE_RESPONSE, PostData, POST_LIST, POST_LIST_RESPONSE, LIST, POST_DELETE,
  POST_EDIT, POST_EDIT_RESPONSE
 } from './../../bir-backend/angular-backend';
@Component({
    selector: 'table-component',
    templateUrl: './table.html'
})

export class TableComponent implements OnInit {
    active: boolean = false;
    @Input() item: any;
    @Output() update =  new EventEmitter;
    constructor() {

    }

  onClickEnableEdit() {
    this.active = true;
  }

    ngOnInit() {}
}