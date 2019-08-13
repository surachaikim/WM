import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OnDestroy, AfterViewInit } from '@angular/core'
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public alertController: AlertController,private storage: Storage,private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen) { }

  ngOnInit() {
  }

async  logout(){

 const alert = await this.alertController.create({
        header: 'คุณกำลังจะออก ?',
       /* message: 'Message <strong>text</strong>!!!',*/
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'alertButton',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'ตกลง',
            handler: () => {
              console.log('Confirm Okay');
              this.storage.remove('USER_INFO').then(() => {
            
               // this.router.navigateByUrl('loginpin');
            
                 navigator['app'].exitApp();
              
                  
                   
              });


          
                 
            },
          
          }
        ]
      });
  
      await alert.present();
    }


about(){
  
  this.router.navigate(['about']);
}


  

settingservice(){
  
  this.router.navigate(['settingservice']);
}

   
  
}
