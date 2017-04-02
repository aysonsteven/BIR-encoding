import { Component, OnInit, ViewChild } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';
import { User, POST_CREATE, POST_CREATE_RESPONSE, PostData, POST_LIST, POST_LIST_RESPONSE, LIST, POST_DELETE,
  POST_EDIT, POST_EDIT_RESPONSE, POST
 } from './../../bir-backend/angular-backend';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
@Component({
  selector: 'encode-page',
  templateUrl: 'encode.html',
  styleUrls:['./encode.scss']
})
export class EncodePage implements OnInit {
  @ViewChild('inputSupplier') public inputModal:ModalDirective;
  toDelete: string;
  form : POST_CREATE = {};
  data = [];
  table = [];
  active: boolean = false;
  editForm: POST_EDIT = {};
  constructor( private user: User, private router: Router, private post: PostData ) {
  }

 
  public hideChildModal():void {
    this.inputModal.hide();
  }

  public ngOnInit():void {
    if( ! this.user.logged ) this.router.navigate(['']);
    this.list();
  }

  onClickEnableEdit() {
    this.active = true;
  }

  onClickPost() {
    this.form.post_config_id = 'bir';
    this.post.create( this.form ).subscribe( ( res ) =>{
      console.log( res );
      // this.data = this.table;
      this.table.push( res.data )
      this.hideChildModal();
    }, err => this.post.alert( err ));
  }

  list() {
    let req: LIST = {
      select: 'idx, Supplier, TIN',
      limit: 10,
      extra :{
        'post_config_id' : 'bir',
        // file: true,
        // meta: true
      }
    };
    req.where = 'parent_idx = 0 AND deleted IS NULL'
    req.limit = null;
    
    this.post.list( req ).subscribe( (res : POST_LIST_RESPONSE ) =>{
      this.table = res.data.posts;
    });
  }

  onClickDelete( postidx, name ) {
    if( ! confirm('Are you sure you want to delete ' + name ) ) return;
    this.post.delete( parseInt(postidx) ).subscribe( ( res ) =>{
      console.info(res );
      this.table = this.table.filter( ( file) => file.idx != postidx);
    }, err => this.post.alert( err ));
  }
  checklogin() {

  }

  onClickInput() {
    window.open("inputs","", "width=550,height=600, status=no, menubar=no" );
  }

  onClickAddSupplier() {
    this.inputModal.show();
  }


  onClickDownload() {
    let options = {
      showLabels: true
    }
    new Angular2Csv( this.table, 'bir', options );
  }

}


