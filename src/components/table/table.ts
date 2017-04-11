import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { POST_EDIT,
         POST_EDIT_RESPONSE, 
         PostData, 
         LIST,
         POST
 } from './../../bir-backend/angular-backend';
@Component({
    selector: 'table-component',
    templateUrl: './table.html'
})

export class TableComponent implements OnInit {
    posts = <Array<POST>> [];
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
      if( this.type == 'invoiceno') edit.InvoiceNo = this.item;
      edit.idx = this.idx;
      this.post.edit( edit ).subscribe( ( res: POST_EDIT_RESPONSE ) => {
        this.getInputs();
        this.active = false;
        
      }, error => this.post.alert( error ) );
    }
  }


  getInputs() {
    let req: LIST ={}
    req.where = `parent_idx = ?`;
    req.bind = `${this.idx}`;
    this.post.list( req ).subscribe( res => {
      this.posts = res.data.posts;
      this.validatingInputs(  );
    });
  }

  validatingInputs( ) {
    
    this.posts.forEach(element => {
      if( this.type == 'supplier' &&  ( element.Supplier != this.item ) ) this.editSupplierElement( element);
      if( this.type == 'tin' && ( element.TIN != this.item ) ) this.editTinElement( element );
    });
  }

  editTinElement(  element ) {
    let req: POST_EDIT = {}
    req.TIN = this.item;
    req.idx = element.idx;
    this.post.edit( req ).subscribe( ( res: POST_EDIT_RESPONSE ) =>{
     console.log( 'validated =>', res ); 
    } , error => this.post.alert( error ) );
  }
  
  editSupplierElement( element ){
    console.log('supplier ', this.item)
    let req: POST_EDIT = {}
    req.Supplier = this.item;
    req.idx = element.idx;
    this.post.edit( req ).subscribe( ( res: POST_EDIT_RESPONSE ) => {
      console.log(' validated => ' , res );
    }, error => this.post.alert( error ) );
  }
}