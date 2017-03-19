import { Component } from '@angular/core';
import { USER_LOGIN, USER_LOGIN_RESPONSE,RESPONSE } from './../../bir-backend/interface';
import { User } from './../../bir-backend/user';
import {map} from "rxjs/operator/map";
@Component( {
  selector: 'header-component',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  loading: boolean = false;
  result: USER_LOGIN_RESPONSE = <USER_LOGIN_RESPONSE> {};
  form: USER_LOGIN = <USER_LOGIN>{};

  constructor(private user: User) {

  }

  onClickLogin() {
    this.user.login(this.form).subscribe(res => {
      alert(res);
    }, error => {
      alert(error.message);
    });
  }
}
