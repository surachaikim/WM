import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RestApiService } from '../rest-api.service';
import { PaydebtPage } from '../paydebt/paydebt.page';

import { NavController,ModalController,PopoverController} from '@ionic/angular'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { Device } from '@ionic-native/device/ngx';
import { ViewChild } from '@angular/core';
import {IonRouterOutlet,} from '@ionic/angular';
import {  ViewChildren, QueryList } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
//import { read } from 'fs';
import {Router} from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
  
})
export class Tab2Page {
//export class Tab2Page implements  OnDestroy, AfterViewInit {
 // backButtonSubscription; 





  
  data = [];
  Id:string=""
  DataMamber:any;

  CompanyInfo:any;
  idcard: string="";
  firstname:string="";
  lastname:string="";
  personid:string="";
  Opt:string="";
  checkData:"";
  encodeData: any;
  scannedData =null;
  Uuid:string="1234567890";
  VFName:string="";
  UserId:string="";
  BranchName:string="";
  CustomerCode:string="";
  title:string="";
  chkPerson:string="";
  public ReceiveUser:string="MdEsjk5d2P"
  public ReceivePassWord:string="Fs8SawmkSJ"
  UUid :string="1234567890"
  state:boolean =false
  SearchLoanAccountRes:any;
  SearchLoanAccountResNew= [];
  barcodeScannerOptions: BarcodeScannerOptions;

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  
  constructor(private keyboard: Keyboard,private router: Router, private platform: Platform,private device: Device,private storage: Storage,public alertController: AlertController,private barcodeScanner: BarcodeScanner,private modalController:ModalController, private nav : NavController,public api: RestApiService,private http: HttpClient, private nativeHttp: HTTP, private plt: Platform,  public loadingController: LoadingController) {

 //   this.statusBar.overlaysWebView(true);


 


        //OptionsScanner
        this.barcodeScannerOptions = {
          showTorchButton: true,
          showFlipCameraButton: true
        };

  

        this.storage.get('USER_INFO').then((val) => {
          this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
           this.VFName =val.CompName
           this.BranchName=val.BranchName
           this.CustomerCode =val.CustomerCode
          });


//alert(this.device.uuid)

     //   this.checkregister();


  }
 



 

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'ไม่พบสมาชิก',
      buttons: ['OK']
    });

    await alert.present();
  }


  async scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData.text;
           this.Id =this.scannedData
           if (this.scannedData != null){
           // this.getAccountLoan();
          this.SearchLoanAccount()
          } else{
           this.presentAlert();
          }
         
        
      })
      
      .catch(err => {
        console.log("Error", err);
      });
  }
 



  SearchLoanAccount(){

    this.storage.get('CUSTOMERCODE').then((val) => {
console.log(val)
      this.api.SearchPerson(val,this.Id)
      .subscribe(res => {
        this.SearchLoanAccountRes = res

        this.SearchLoanAccountResNew = [];
        for(let i = 0;i < res.length; i++){
          if(this.SearchLoanAccountResNew.indexOf(res[i]) == -1){
            this.SearchLoanAccountResNew.push(res[i])
          }
      }


       for (let o of this.SearchLoanAccountRes){

       // let unique_array = []
     

          if(o.AccountNo === ""){
            this.state =true
            return;
          }
          this.state =false
       }



        console.log(this.SearchLoanAccountRes);
      }, err => {
        console.log(err);
       // alert(err)
      });
  
      });

  
        
  }






 
async openModel(){
  if(this.personid == ""){
    return;
  }
 if(this.personid !="" ){



  const modal = await this.modalController.create({
    component:PaydebtPage,
    componentProps:{
      data: this.personid,
      data1: this.firstname + this.lastname
    }
  });
  modal.present();
  
}
else{
  alert("ไม่มีรายการชำระ")
}
}





 onSearch(event){
 

this.SearchLoanAccount();

this.keyboard.hide();
  }


  onCancel(event){


      }


  
 async getAccountLoan(PersonID,PersonName){
  this.Id=""
  this.SearchLoanAccountResNew =[];
  
    const modal = await this.modalController.create({
      component:PaydebtPage,
      componentProps:{
        data: PersonID,
        data1: PersonName
      }
    });
    modal.present();

  }

  map(id){
    this.nav.navigateForward('map/'+id)
   // this.router.navigate(['map']);
  }
  opmap(){
    
  }
  /*ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
 
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }*/
}
