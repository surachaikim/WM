
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceiptPage } from './receipt.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiptPage
  }
];

@NgModule({
  imports: [ 
  
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceiptPage]
})
export class ReceiptPageModule {}
