
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddpinPage } from './addpin.page';

const routes: Routes = [
  {
    path: '',
    component: AddpinPage
  }
];

@NgModule({
  imports: [ 
  
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddpinPage]
})
export class AddpinPageModule {}
