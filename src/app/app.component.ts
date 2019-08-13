import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ModalController, ActionSheetController, PopoverController, IonRouterOutlet, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { RestApiService } from '../app/rest-api.service';
import {  ViewChildren, QueryList } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  RegisterCheck:any;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  Uuid :string ="1234567890"
  Checkregister:any



 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public api: RestApiService, 
    private router : Router,
    private storage: Storage,
    public modalCtrl: ModalController,
        private menu: MenuController,
        private actionSheetCtrl: ActionSheetController,
        private popoverCtrl: PopoverController,
        private toast: Toast
  ) {


    
    this.initializeApp();
    this.GetRegister();
   
    
    
  }

  initializeApp() {
    this.platform.ready().then(() => {

      

   //this.router.navigateByUrl('register');
     // this.router.navigateByUrl('addpin');
   //  this.router.navigateByUrl('confirm');
  //his.router.navigateByUrl('receipt');
 // this.router.navigateByUrl('/tabs/tab2');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }






GetRegister(){

  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
    this.api.GetRegister(val)
    .subscribe(res => {
      this.RegisterCheck = res
     for (let i of this.RegisterCheck){
        if(i.St === "0"){
          this.router.navigateByUrl('register')
        }
        else{
          this.router.navigateByUrl('loginpin');
        }

     }

      console.log(res);
    }, err => {
      console.log(err);
      alert(err)
    });

    });

   
      
}






}
