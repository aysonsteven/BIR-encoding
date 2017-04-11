import { Component, OnInit, ViewChild } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';
import { User, POST_CREATE, POST_CREATE_RESPONSE, PostData, POST_LIST, POST_LIST_RESPONSE, LIST, POST_DELETE,
  POST_EDIT, POST_EDIT_RESPONSE, POST, File, FILE_UPLOAD, FILE_UPLOAD_RESPONSE, USER
 } from './../../bir-backend/angular-backend';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { Subject } from 'rxjs/Subject';

interface NewDate {
    m:string;
    Y:string;
}
interface ListOfYears extends NewDate {
}

interface PrevMonths extends NewDate {
}

interface NextMonths extends NewDate {
}

interface tin_number {
  tin1: number;
  tin2: number;
  tin3: number;
  tin4: number;
}

@Component({
  selector: 'encode-page',
  templateUrl: 'encode.html',
  styleUrls:['./encode.scss']
})
export class EncodePage implements OnInit {
  @ViewChild('inputSupplier') public inputModal:ModalDirective;
  calendarLoad:boolean = true;
  showNext: boolean = false;
  listOfYears:Array<ListOfYears> = [];
  showYear: boolean = false;
  date:Date = new Date();
  year:number;
  month:number;
  prevMonths:Array<PrevMonths> = [];
  nextMonths:Array<NextMonths> = [];
  maxDay:number = 42;

  userdata: USER = {};
  toDelete: string;
  form : POST_CREATE = {};
  data = [];
  table = [];
  active: boolean = false;
  editForm: POST_EDIT = {};

  tin : tin_number = <tin_number> {};


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

  constructor( private user: User, private router: Router, private post: PostData, private file: File, private activeroute: ActivatedRoute ) {

        this.searchChangeDebounce
          .debounceTime(300) // wait 300ms after the last event before emitting last event
          .subscribe(() => this.onChangedSearch());
          // console.info( Math.round( 1.115 * 100 + Number.EPSILON ) / 100 );
  }



  getNewCalendar() {
      this.getPreviousMonths();
      this.getNextMonths();
      this.getListOfYears();
  }

  getListOfYears() {
      let startingYear = this.year;
      --startingYear;
      this.listOfYears = [];
      for(let i=0; i < 5;i++ ) {
          let test = (new Date(startingYear+i, this.month-1, 1, 1, 10)).toDateString().split(" ");
          this.listOfYears.push( { m: test[1], Y: test[3] } );
      }
  }

    onClickNext() {
      this.month ++;
      if( this.month > 12) {
        this.year ++;
        this.month = 1;
      }
      this.router.navigate(['encode', this.month, this.year]);
      console.info('month --> ', this.month );
      console.info( 'year --> ' ,  this.year );
      this.searchForm = <POST>{}
      this.searchChangeDebounce.next();
      this.getNewCalendar();
    }
    onClickPrev() {
      this.month --;
      if( this.month < 1) {
          this.year --;
          this.month = 12;
      }
      this.router.navigate(['encode', this.month, this.year]);
      console.info('month --> ', this.month );
      console.info( 'year --> ' ,  this.year );
      this.searchForm = <POST>{}
      this.searchChangeDebounce.next();
      this.getNewCalendar();
    }


    onClickClearSearchTIN(  ) {
      this.searchForm.TIN = "";
      this.searchChangeDebounce.next();
    }
    onClickClearSearchSupplier() {
      this.searchForm.Supplier = "";
      this.searchChangeDebounce.next();
    }
  getNextMonths() {
      this.nextMonths = [];
      for(let i=0; i < 12;i++ ) {
          let test = (new Date(this.year, this.month+i, 1, 1, 10)).toDateString().split(" ");
          this.nextMonths.push( { m: test[1], Y: test[3] } );
      }
  }
  getPreviousMonths() {
      this.prevMonths = [];
      for(let i=0; i < 13;i++ ) {
          let test = (new Date(this.year, this.month-i-1, 1, 1, 10)).toDateString().split(" ");
          this.prevMonths.push( { m: test[1], Y: test[3] } );
      }
  }

  selectNewDate( data: NewDate ) {
      this.year = parseInt(data.Y);
      console.log( 'selectnewdate ----> ', );
      this.searchChangeDebounce.next();
      this.router.navigate(['/encode', this.month, this.year])
      this.getNewCalendar();
  }

  public hideChildModal():void {
    this.inputModal.hide();
    this.form.TIN       =
    this.tin.tin1       = 
    this.tin.tin2       = 
    this.tin.tin3       = 
    this.tin.tin4       =
    this.form.Supplier  = null;
  }

  public ngOnInit():void {
    if( ! this.user.logged ) this.router.navigate(['']);
      this.activeroute.params.forEach( params =>{
       this.month = params['month'];
       this.year = params['year'];
      })

        this.onChangedSearch();
        this.getUserData();
        this.listCalendar(this.month, this.year);
        this.getNewCalendar();

  }
      add0(n:number) : string {
        return n < 10 ? '0' + n : n.toString();
    }


       pres( arr: any ) {
        return arr.map( e => this.pre(e) );
    }

        pre( data ) {
        return data;
    }

    listCalendar( month, year ) {
    
        let empty_day = new Date(year + "-" + month + "-01").getDay()               // first date(day) of the month. 0~6
        let days_in_month = new Date(year, month, 0).getDate();                     // last date(day) of the month. 28, 29, 30.
     // Fill all the empty days first
        for (let i = 1; i <= days_in_month; i++) {                                  //Fill the days of month
            let date = this.year.toString() +  this.add0( this.month ) + this.add0( i );
        }
                                //Chunk Date
    }

  getUserData() {
    this.user.data().subscribe( res =>{
      this.userdata = res.data.user;
      console.info( 'ENCODE CLASS userdata -->' , res.data.user.idx );
    }, error => this.user.alert( error ) );
  }

  onClickEnableEdit() {
    this.active = true;
  }

  onPageClick($event) {
    //console.log('onPageClick::$event',$event);
    this.currentPage = $event;
    this.loadSearchedData();
  }

  onEnterSearch(  ) {
 
      this.searchChangeDebounce.next();

  }

    onChangeSearch() {
    this.searchChangeDebounce.next();
  }


  public onChangedSearch() {
    //console.log('onChangeSearch', this.searchForm);

    if (this.searchForm.Supplier) {
      if (this.searchForm.Supplier.length < 2) return;
    }
    if (this.searchForm.TIN) {
      if (this.searchForm.TIN.length < 2) return;
    }

    let cond = '';
    let bind = '';
    let where = "";
    this.searchQuery.where = "";

    if (this.searchForm.TIN) cond += "TIN LIKE ? ";
    if (this.searchForm.TIN) bind += `%${this.searchForm.TIN}%`;

    if( this.searchForm.Supplier ) {
      cond += cond?  "AND Supplier LIKE ?" : "Supplier LIKE ?";
      bind += bind? `,%${this.searchForm.Supplier}%`: `%${this.searchForm.Supplier}%`;
    }

    if( this.month ){
      cond += cond? "AND month = ?": "month = ?";
      bind += bind? `,${this.month}`: `${this.month}`;
    }

    if( this.year ){
      cond += cond? "AND year = ?": "year = ?";
      bind += bind? `,${this.year}`:`${this.year}`;
    }
    if( cond ) {
      this.searchQuery.where = cond + `AND parent_idx = ?`;
      this.searchQuery.bind = bind +  `, 0`;
    }
    else {
      this.searchQuery.where = cond + 'parent_idx = ?';
      this.searchQuery.bind = bind + '0';
    }    
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
    // this.searchQuery.where = ;
    this.post.list(this.searchQuery).subscribe((res: POST_LIST_RESPONSE ) => {
      this.pagination = res.data.posts;
      this.totalRecord = parseInt(res.data.total);
      console.log( 'data --> ' , this.pagination );
    }, err => this.post.alert(err));
  }

  onClickPost() {
    this.form.post_config_id = 'bir';
    this.form.month = this.month;
    this.form.year = this.year;
    this.form.TIN = `${this.tin.tin1}-${this.tin.tin2}-${this.tin.tin3}-${this.tin.tin4}`;
    this.post.create( this.form ).subscribe( ( res ) =>{
      console.log( res );
      this.pagination.unshift( res.data )
      this.hideChildModal();
    }, err => this.post.alert( err ));
  }

  onClickDownload(  ) {
    let month = new Array();
month[1] = "January";
month[2] = "February";
month[3] = "March";
month[4] = "April";
month[5] = "May";
month[6] = "June";
month[7] = "July";
month[8] = "August";
month[9] = "September";
month[10] = "October";
month[11] = "November";
month[12] = "December";
    let req: LIST = {
      select: 'Supplier, TIN, TotalAmountOfPurchase, TotalInputTax, TotalAmountDue',
      extra :{
        'post_config_id' : 'bir',
        // file: true,
        // meta: true
      }
    };
    req.where = `parent_idx = 0 AND deleted IS NULL AND month = ${this.month} AND year = ${this.year}`;
    // req.limit = null;
    
    this.post.list( req ).subscribe( (res : POST_LIST_RESPONSE ) =>{
      // this.table = res.data.posts;
      let options = {
        showLabels: true
      }
      new Angular2Csv( res.data.posts, `${month[this.month]}, ${this.year}`, options ); 
        console.log( 'full load ' , res.data.posts );
      });
  }

  onClickDelete( post ) {
    if( this.checkOwner( post.user_idx ) == false ) return console.error('not your post'); 
    if( ! confirm('Are you sure you want to delete ' + post.Supplier ) ) return;
    this.post.delete( parseInt(post.idx) ).subscribe( ( res ) =>{
      console.info(res );
      this.pagination = this.pagination.filter( ( file) => file.idx != post.idx);
    }, err => this.post.alert( err ));
  }
  checklogin() {

  }

  checkOwner( idx ) {
    
    if(idx != this.userdata.idx) {
      if( this.userdata.id != "admin") return false;
      else return true;
    }
    else return true;
  }

  onClickInput( post ) {
    if( this.checkOwner( post.user_idx) == false ) return console.error('not your post'); 
    // window.open("inputs/"+ post.idx ,"", "width=550,height=600, status=no, menubar=no" );
    this.router.navigate(['inputs', post.idx, this.month, this.year])
  }

  onClickImport( userfile ) {
    userfile.click();
  }



  switchToAllItem() {
    let month = new Array();
month[1] = "January";
month[2] = "February";
month[3] = "March";
month[4] = "April";
month[5] = "May";
month[6] = "June";
month[7] = "July";
month[8] = "August";
month[9] = "September";
month[10] = "October";
month[11] = "November";
month[12] = "December";

    let req: LIST = {
      select: 'Supplier, TIN, InvoiceNo, AmountOfPurchase, InputTax, AmountDue',
      extra :{
        'post_config_id' : 'bir',
        // file: true,
        // meta: true
      }
    };
    req.where = `parent_idx <> 0 AND deleted IS NULL`;
    req.order = 'Supplier ASC';
    this.post.list( req ).subscribe( ( res : POST_LIST_RESPONSE ) =>{
      console.info('all items -----> ' , res.data.posts );
      let options = {
        showLabels: true
      }
      new Angular2Csv(  res.data.posts, `${month[this.month]}, ${this.year}`, options ); 
    });

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


