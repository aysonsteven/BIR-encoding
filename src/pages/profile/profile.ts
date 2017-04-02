import { Component, OnInit } from '@angular/core';
import { User, USER_EDIT, USER_EDIT_RESPONSE, USER_FIELDS} from './../../bir-backend/angular-backend';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.html',
  styleUrls:['./profile.scss']
})

export class ProfilePage implements OnInit{
  form: USER_EDIT = {};
  constructor( private user: User, private router: Router) {}

  ngOnInit() {
    if( ! this.user.logged ) return this.router.navigate(['']);
    this.loadData();
  }

  loadData( ) {
    this.user.data().subscribe( (res) =>{
      this.form.id = res.data.user.id;
      this.form.nickname = res.data.user.nickname;
      this.form.name = res.data.user.name;
      if( res.data.user.email ) this.form.email = res.data.user.email;
      else delete this.form.email;
    }, err => console.error( err ));
  }

  onClickUpdate() {
    this.user.edit( this.form ).subscribe( ( res: USER_EDIT_RESPONSE ) =>{
      console.info( res );
    }, err => console.error( err ));
  }

}

