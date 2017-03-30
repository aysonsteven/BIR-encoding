import { Component, OnInit } from '@angular/core';
import { USER_LOGIN, USER_LOGIN_RESPONSE,RESPONSE, User } from './../../bir-backend/angular-backend';
import {map} from "rxjs/operator/map";
@Component( {
  selector: 'header-component',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit{

  loading: boolean = false;
  result: USER_LOGIN_RESPONSE = <USER_LOGIN_RESPONSE> {};
  form: USER_LOGIN = <USER_LOGIN>{};
  userData = {};

  constructor(private user: User) {

  }

  ngOnInit(){
    this.loadData();
  }
  loadData() {
    if( ! this.user.logged ) return;
    this.user.data().subscribe( res =>{
      this.userData = res.data.user;
    }, err => {
      this.onClickLogout();
      alert(" login session expired, Please login again" );
    } );
  }

  onClickLogin() {
    this.user.login(this.form).subscribe(res => {
      this.loadData();
      this.form= <USER_LOGIN>{};
    }, error => {
      alert(error.message);
    });
  }
  onClickLogout(){
    this.user.logout().subscribe( res =>{
      console.log(res);
    })
  }
}
