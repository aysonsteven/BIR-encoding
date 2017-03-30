import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './../../bir-backend/angular-backend';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
@Component({
  selector: 'encode-page',
  templateUrl: 'encode.html'
})
export class EncodePage implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;

  constructor( private user: User, private router: Router ) {

  }

 
  public hideChildModal():void {
    this.childModal.hide();
  }

  public ngOnInit():void {
    if( ! this.user.logged ) this.router.navigate(['']);
  }

  checklogin() {

  }

  onClickManage() {
    window.open("help","items", "width=550,height=600, status=no, menubar=no" );
  }

  onClickAddSupplier() {
    this.childModal.show();
  }


}


