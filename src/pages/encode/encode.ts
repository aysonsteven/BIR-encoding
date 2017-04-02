import { Component, OnInit, ViewChild } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';
import { User, POST_CREATE, POST_CREATE_RESPONSE, PostData, POST_LIST, POST_LIST_RESPONSE, LIST, POST_DELETE,
  POST_EDIT, POST_EDIT_RESPONSE, POST, File, FILE_UPLOAD, FILE_UPLOAD_RESPONSE
 } from './../../bir-backend/angular-backend';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Subject } from 'rxjs/Subject';
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


//pagination vars
  pagination = <Array<POST>> [];
  posts: POST_LIST = [];

  limitPerPage: number = 5;
  currentPage: number = 1;
  numberPerNav: number = 4;
  totalRecord: number = 0;
  comments = <Array<POST>>[];

  searchForm = <POST>{};
  searchQuery = <LIST>{};

  searchChangeDebounce = new Subject();
//pagination vars

  constructor( private user: User, private router: Router, private post: PostData, private file: File ) {

            this.onChangedSearch();

        this.searchChangeDebounce
          .debounceTime(300) // wait 300ms after the last event before emitting last event
          .subscribe(() => this.onChangedSearch());
  }

  public hideChildModal():void {
    this.inputModal.hide();
  }

  public ngOnInit():void {
    if( ! this.user.logged ) this.router.navigate(['']);
    // this.onClickDownload(); 
  }

  onClickEnableEdit() {
    this.active = true;
  }

  onPageClick($event) {
    //console.log('onPageClick::$event',$event);
    this.currentPage = $event;
    this.loadSearchedData();
  }


  onChangedSearch() {
    //console.log('onChangeSearch', this.searchForm);

    if (this.searchForm.Supplier) {
      if (this.searchForm.Supplier.length < 2) return;
    }
    if (this.searchForm.TIN) {
      if (this.searchForm.TIN.length < 2) return;
    }

    let cond = '';
    let bind = '';

    if (this.searchForm.idx) cond += "idx LIKE ? ";
    if (this.searchForm.idx) bind += `%${this.searchForm.idx}%`;

    if (this.searchForm.Supplier) cond += cond ? "AND ( title LIKE ? ) " : "( Supplier LIKE ?  )";
    if (this.searchForm.Supplier) bind += bind ? `,%${this.searchForm.Supplier}%,%${this.searchForm.Supplier}%,%${this.searchForm.Supplier}%` : `%${this.searchForm.Supplier}%,%${this.searchForm.Supplier}%,%${this.searchForm.Supplier}%`;
    let req: POST_LIST = {
      order : 'idx DESC',
      extra: {
        'post_config_id' : 'bir'
      }
    };
    this.post.list( req ).subscribe( (res: POST_LIST_RESPONSE) => {
      console.log(res);
      this.posts = res.data.posts;
    }, err => this.post.alert( err ) );


    this.searchQuery.where = cond;
    this.searchQuery.bind = bind;
    this.searchQuery.order= 'idx DESC';
    this.currentPage = 1;
    this.loadSearchedData();
  }


  loadSearchedData() {

    this.pagination = [];
    this.searchQuery.from = this.limitPerPage * this.currentPage - this.limitPerPage;
    this.searchQuery.limit = this.limitPerPage;
    this.searchQuery.extra = {
      'post_config_id' : 'bir',
      file: true,
      meta: true
    };
    this.searchQuery.where = "parent_idx = 0 AND deleted IS NULL";
    this.post.list(this.searchQuery).subscribe((res: POST_LIST_RESPONSE ) => {
      this.pagination = res.data.posts;
      this.totalRecord = parseInt(res.data.total);
      console.log( 'data:: ' , this.pagination );
    }, err => this.post.alert(err));
  }

  onClickPost() {
    this.form.post_config_id = 'bir';
    this.post.create( this.form ).subscribe( ( res ) =>{
      console.log( res );
      this.pagination.unshift( res.data )
      this.hideChildModal();
    }, err => this.post.alert( err ));
  }

  onClickDownload(  ) {
    let req: LIST = {
      select: 'idx, Supplier, TIN',
      extra :{
        'post_config_id' : 'bir',
        // file: true,
        // meta: true
      }
    };
    req.where = 'parent_idx = 0 AND deleted IS NULL'
    // req.limit = null;
    
    this.post.list( req ).subscribe( (res : POST_LIST_RESPONSE ) =>{
      // this.table = res.data.posts;
      let options = {
        showLabels: true
      }
      new Angular2Csv( res.data.posts, 'bir-report', options ); 
        console.log( 'full load ' , this.table );
      });
  }

  onClickDelete( postidx, name ) {
    if( ! confirm('Are you sure you want to delete ' + name ) ) return;
    this.post.delete( parseInt(postidx) ).subscribe( ( res ) =>{
      console.info(res );
      this.pagination = this.pagination.filter( ( file) => file.idx != postidx);
    }, err => this.post.alert( err ));
  }
  checklogin() {

  }

  onClickInput() {
    window.open("inputs","", "width=550,height=600, status=no, menubar=no" );
  }

  onClickImport( userfile ) {
    userfile.click();
  }

  onChangeFile( userfile ) {
    let file = userfile.files[0];
    console.log( file );

    let req : FILE_UPLOAD = {};
    this.file.upload( req, file ).subscribe( ( res : FILE_UPLOAD_RESPONSE ) => {
      console.info( res );
    }, error => this.file.alert( error ) );
  }

  onClickAddSupplier() {
    this.inputModal.show();
  }


  // onClickDownload() {
   
  //   this.list();

  // }

}


