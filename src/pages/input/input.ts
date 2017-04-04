import { Component, OnInit, ViewChild } from '@angular/core';
import { User, PostData, POST, POST_LIST, POST_LIST_RESPONSE, POST_CREATE, POST_CREATE_RESPONSE } from './../../bir-backend/angular-backend';
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
    form: POST_CREATE = {};
    constructor( 
        private user: User,
        public post: PostData,
        private router: Router,
        private route : ActivatedRoute
    ) {}

    ngOnInit() {
        if( ! this.user.logged ) return this.router.navigate(['']);
        this.route.params.forEach( ( params ) =>{
            this.idx = params['idx'];
            if( ! this.idx ) return this.router.navigate(['']);
            this.form.parent_idx = this.idx.toString();
            this.post.data( parseInt( this.idx.toString() ) ).subscribe( res =>{
                    this.data = res.data.post;
            }); 
            this.loadInputs();
        }) 

    }

  public hideChildModal():void {
    this.inputReceipt.hide();
  }

    onClickPost() {
        this.form.post_config_id = 'bir';
        this.post.create( this.form ).subscribe( ( res : POST_CREATE_RESPONSE ) =>{
            console.log( 'res input --> ' , res );
        }, error => this.post.alert( error ) );
    }

    onClickDelete( val ) {
        if( ! confirm( `Are you sure you want to delete` ) ) return;
        this.post.delete( parseInt(val) ).subscribe( ( res ) =>{
            console.info(res );
            this.inputs = this.inputs.filter( ( file) => file.idx != val);
        }, err => this.post.alert( err ));
    }


    onClickCloseWindow() {
        window.close();
    }

    onClickAddReceipt() {
        this.inputReceipt.show();
    }

    loadInputs() {
        let req: POST_LIST = {};
        req.extra = {
            'post_config_id' : 'bir'
        }
        req.where = `parent_idx = ${this.idx}`
        this.post.list( req ).subscribe( ( res : POST_LIST_RESPONSE ) => {
            this.inputs = res.data.posts;
            console.info('inputsload --> ' , this.inputs );
        }, error => this.post.alert( error ) );
    }
}