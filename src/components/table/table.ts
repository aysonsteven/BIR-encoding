import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { POST_EDIT,
         POST_EDIT_RESPONSE, 
         PostData, 
 } from './../../bir-backend/angular-backend';
@Component({
    selector: 'table-component',
    templateUrl: './table.html'
})

export class TableComponent implements OnInit {
    active: boolean = false;
    @Input() item: any;
    @Input() type: string;
    @Input() idx: number;
    // @Input() post: POST_EDIT = {}
    @Output() update =  new EventEmitter;
    constructor(
      private post: PostData
    ) {

    }

  onClickEnableEdit() {
    this.active = true;
  }

  ngOnInit() {}

  onEnterEdit(event) {
    if( event.keyCode == 13){
      let edit : POST_EDIT = {}
      if( this.type == 'supplier' ) edit.Supplier = this.item;
      if( this.type == 'tin' ) edit.TIN = this.item;
      edit.idx = this.idx;
      this.post.edit( edit ).subscribe( ( res: POST_EDIT_RESPONSE ) => {
        this.active = false;
      }, error => this.post.alert( error ) );
    }
  }
}