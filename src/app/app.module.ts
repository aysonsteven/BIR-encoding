import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule, PaginationConfig } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AppComponent } from './app.component';

import { HomePage } from '../pages/home/home';
import { HelpPage } from '../pages/help/help';
import { EncodePage } from '../pages/encode/encode';
import { ProfilePage } from '../pages/profile/profile';

import { HeaderComponent } from './../components/header/header';


///added module
import { AngularBackend } from './../bir-backend/angular-backend';
const appRoutes: Routes = [
  { path: 'help', component: HelpPage },
  { path: '', component: HomePage },
  { path: 'encode', component: EncodePage },
  { path: 'profile', component: ProfilePage}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage,
    EncodePage,
    HeaderComponent,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot( appRoutes ),
    AngularBackend,
    Ng2TableModule,
    PaginationModule,
    ModalModule.forRoot()
  ],
  bootstrap: [ AppComponent ],
  providers: [ PaginationConfig ]
  
})
export class AppModule {}


