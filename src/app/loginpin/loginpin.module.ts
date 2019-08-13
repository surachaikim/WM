
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginpinPage } from './loginpin.page';

const routes: Routes = [
  {
    path: '',
    component: LoginpinPage
  }
];

@NgModule({
  imports: [ 
 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginpinPage]
})
export class LoginpinPageModule {}
