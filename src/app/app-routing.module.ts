import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'loginpin', loadChildren: './loginpin/loginpin.module#LoginpinPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'paydebt', loadChildren: './paydebt/paydebt.module#PaydebtPageModule' },
  { path: 'confirm', loadChildren: './confirm/confirm.module#ConfirmPageModule' },
  { path: 'receipt', loadChildren: './receipt/receipt.module#ReceiptPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'addpin', loadChildren: './addpin/addpin.module#AddpinPageModule' },
  { path: 'settingservice', loadChildren: './settingservice/settingservice.module#SettingservicePageModule' },
  { path: 'setting-service2', loadChildren: './setting-service2/setting-service2.module#SettingService2PageModule' },
  { path: 'map/:id', loadChildren: './map/map.module#MapPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
     // RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
