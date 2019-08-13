
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { PaydebtPageModule } from './paydebt/paydebt.module'

import { ModalPageModule } from './modal/modal.module'
import { ReceiptPageModule } from './receipt/receipt.module'

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule } from '@angular/forms';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { File } from '@ionic-native/file/ngx';
import { DecimalPipe } from '@angular/common';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [
 
  ],
  imports: [ 
     BrowserModule,
    PaydebtPageModule,
  
    ReceiptPageModule,
    ModalPageModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      IonicStorageModule.forRoot(),
   //   IonicModule.forRoot({hardwareBackButton: false}),
       HttpClientModule],
  providers: [
    StatusBar,
    Screenshot,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    BarcodeScanner,
    SocialSharing,
    HTTP,
    Toast,File,FilePath,
    Device,LaunchNavigator,
    Keyboard,
    Base64,DecimalPipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
