
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaydebtPage } from './paydebt.page';

const routes: Routes = [
  {
    path: '',
    component: PaydebtPage
  }
];

@NgModule({
  imports: [ 
 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaydebtPage]
})
export class PaydebtPageModule {}
