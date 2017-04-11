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
import { InputPage } from '../pages/input/input';

import { HeaderComponent } from './../components/header/header';
import { TableComponent } from '../components/table/table';
import { CompleteViewComponent } from '../pages/completeview/completeview';

import { HeadingComponent } from '../components/heading/heading';
import { JumbotronHeaderComponent } from '../components/jumbotron-header/jumbotron-header';
import { HelpUserComponent } from '../components/help-model/user/user';
import { FooterComponent } from '../components/footer/footer';

///added module
import { AngularBackend } from './../bir-backend/angular-backend';
import { AngularBackendComponentModule } from './../bir-backend/modules/angular-backend-components.module';
const appRoutes: Routes = [
  { path: 'help/:model', component: HelpPage },
  { path: '', component: HomePage },
  { path: 'encode/:month/:year', component: EncodePage },
  { path: 'profile', component: ProfilePage},
  { path: 'inputs/:idx/:month/:year', component: InputPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HelpPage,
    EncodePage,
    HeaderComponent,
    ProfilePage,
    InputPage,
    TableComponent,
    CompleteViewComponent,
    HeadingComponent,
    JumbotronHeaderComponent  ,
    HelpUserComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot( appRoutes ),
    AngularBackend,
    Ng2TableModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AngularBackendComponentModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ PaginationConfig ]
  
})
export class AppModule {}


