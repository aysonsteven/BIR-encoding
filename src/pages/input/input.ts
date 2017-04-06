import { Component, OnInit, ViewChild } from '@angular/core';
import { User, PostData, POST, POST_LIST, POST_LIST_RESPONSE, POST_CREATE, POST_CREATE_RESPONSE, POST_EDIT, POST_EDIT_RESPONSE } from './../../bir-backend/angular-backend';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
@Component({
    selector: 'input-page',
    templateUrl: './input.html',
    styleUrls:['./input.scss']
})
export class InputPage implements OnInit {
   @ViewChild('inputReceipt') public inputReceipt:ModalDirective;
    data : POST = {};
    inputs = <Array<POST>> [];
    idx: number;
    formInput: POST_CREATE = {};
    totalAmountDue:number = 0;
    totalInputTax:number = 0;
    totalAmoutOfPurchase:number = 0;
    constructor( 
        private user: User,
        public post: PostData,
        private router: Router,
        private route : ActivatedRoute
    ) {
                // this.form.Supplier = this.data.Supplier;
        // this.form.TIN = this.data.TIN;
        
    }

    ngOnInit() {
        if( ! this.user.logged ) return this.router.navigate(['']);

        this.route.params.forEach( ( params ) =>{
            this.idx =parseInt( params['idx'] );
            if( ! this.idx ) return this.router.navigate(['']);
            this.formInput.parent_idx = this.idx.toString();
            this.post.data( this.idx  ).subscribe( res =>{
                    this.data = res.data.post;
                    this.formInput.Supplier = this.data.Supplier;
                    this.formInput.TIN = this.data.TIN
                    
                    
            }); 
            this.loadInputs();
        }) 

    }

  public hideChildModal():void {
    this.inputReceipt.hide();
    this.formInput.AmountDue = null;
  }

    onClickPost() {
        this.formInput.post_config_id = 'bir';
        this.formInput.AmountOfPurchase = this.formInput.AmountDue /1.12;
        this.formInput.InputTax = this.formInput.AmountOfPurchase * 0.12;
        this.post.create( this.formInput ).subscribe( ( res  ) =>{
            console.log( 'res input --> ' , res.data );
            this.inputs.push( res.data );
            this.updateSubTotal();
            this.hideChildModal();
        }, error => this.post.alert( error ) );
    }

    updateSubTotal() {
        this.gettingTotal();
        let req: POST_EDIT = {};
        req.idx = this.idx;
        req.TotalAmountDue = this.totalAmountDue;
        req.TotalAmountOfPurchase = this.totalAmoutOfPurchase;
        req.TotalInputTax = this.totalInputTax;
        this.post.edit( req ).subscribe( ( res : POST_EDIT_RESPONSE ) => {
            console.info( 'updateSubTOTAL --> ' , res );
        });
    }

    onClickDelete( val ) {
        if( ! confirm( `Are you sure you want to delete` ) ) return;
        this.post.delete( parseInt(val) ).subscribe( ( res ) =>{
            console.info(res );
            this.inputs = this.inputs.filter( ( file) => file.idx != val);
            this.updateSubTotal();
        }, err => this.post.alert( err ));
    }


    onClickBack() {
        // window.close();
        this.router.navigate(['encode']);
    }

    onClickAddReceipt() {
        this.inputReceipt.show();
    }

    loadInputs() {
        let req: POST_LIST = {};
        req.extra = {
            'post_config_id' : 'bir'
        }
        req.where = `parent_idx = ${this.idx} AND deleted IS NULL`;
        this.post.list( req ).subscribe( ( res : POST_LIST_RESPONSE ) => {
            this.inputs = res.data.posts;
            console.info('inputsload --> ' , this.inputs );
            this.gettingTotal();
        }, error => this.post.alert( error ) );
    }
    gettingTotal() {
            this.totalAmountDue = 0;
            this.totalAmoutOfPurchase = 0;
            this.totalInputTax = 0;
            this.inputs.forEach(res => {
                console.info('amount of purchase --> ', this.totalAmountDue , res.AmountDue );
                this.totalAmountDue += parseFloat( res.AmountDue.toString() );
                console.info( ' input tax ' , this.totalInputTax, parseFloat( res.InputTax.toString() ) );
                this.totalInputTax += parseFloat( res.InputTax.toString() );
                console.info( ' amout due' , this.totalAmoutOfPurchase, parseFloat( res.AmountOfPurchase.toString() ) );
                this.totalAmoutOfPurchase += parseFloat( res.AmountOfPurchase.toString() );

            });
            console.info( ' total  amount due ----- > ' , this.totalAmountDue );
            console.info( ' total input tax ----- > ' , this.totalInputTax );
            console.info( ' total amount of purchase ----- > ' , this.totalAmoutOfPurchase );
      
    }
}