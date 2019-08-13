import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RestApiService } from '../rest-api.service';
import { NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { NavController,ModalController,PopoverController} from '@ionic/angular'
import { CurrencyPipe } from '@angular/common';
import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
import { Alert, Button } from 'selenium-webdriver';
import { ReceiptPage } from '../receipt/receipt.page';
import { ModalPage } from '../modal/modal.page';
import {IonSlides} from '@ionic/angular';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-paydebt',
  templateUrl: './paydebt.page.html',
  styleUrls: ['./paydebt.page.scss'],
})
export class PaydebtPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
Id = null;
name= null;
DataLoan:any;
Acc =null;
AccountNo =null;
UserId:string="";
save:any;
Payresult:string ="" ;
Payresult1:string ="";
DateToday: string = new Date().toLocaleDateString();
Time: string = new Date().toLocaleTimeString();
VFName:string="";
VFNo:string="";
CompanyInfo:any;
screen: any;
St:string="";
  state: boolean = false;
  UUid :any=[11,111]
  DetailPayByAccountNo:any;
  mulct:string="0";
  trackfee:string="0";
  closefee:string="0";
  capitalbalance:string="0";
  CUSTOMERCODE:string="";
  realinterest:string="";
  minpayment:string="0";
  showbt:boolean=false
  public AddLoan: any = [];
  slideNumber :number =0
countLoan =0
Checked:boolean

  constructor(private decimalPipe: DecimalPipe,private storage: Storage,private base64:Base64, private screenshot: Screenshot,private alertController: AlertController,private modalController:ModalController,private navParams:NavParams, public api: RestApiService,private activatedRoute :ActivatedRoute) { 

    this.Id =this.navParams.get('data')
    this.name =this.navParams.get('data1')
    //this.Id =this.activatedRoute.snapshot.paramMap.get('Data')
    
     
       
          this.getLoanbyId();
        
  
        this.storage.get('USER_INFO').then((val) => {
          this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
           this.VFName =val.CompName
          });
       
    //this.checkregister()
  }

  ngOnInit() {

  }

  ChkPay(){
    

     this.Payresult = Number(this.minpayment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
     //this.updateList(this.minpayment);
  
  }


  updateList(ev){
  
    this.Payresult1 = this.currencyFormatted(ev.target.value)
    this.Payresult = this.Payresult1 
    }

    currencyFormatted(amount) {

      var formatedValue = amount;
      var real = '';
      var cents = '';
      var temp = [];
      var i = 0;
      var j = 0;
      var k = 0;
    
      formatedValue = this.clearString(formatedValue.toString(), "0123456789");
    
      if(formatedValue.length > 3) {
    
        real = formatedValue.substr(0, formatedValue.length - 3);
        real = "" + parseInt(real, 10);
        cents = formatedValue.substr(formatedValue.length - 3, 3);
    
        if(real.length > 3) {
          temp = [];
          for(i = real.length - 1, j = 1, k = 0; i > 0 ; i--, j++) {
            if((j % 3) == 0) {
              temp.push(real.substr(i, 3));
              k++;
            }
          }
          temp.reverse();
          real = real.substr(0, real.length - (3 * k)) + ',' + temp.join(',');
        }
        formatedValue = real + ',' + cents   ;
      }
      
      return formatedValue
  
    }
    
    clearString(value, validCharacters) {
      var result = '';
      var index = -1;
      var i = 0;
    
      for(i = 0; i < value.length; i++) {
        index = validCharacters.indexOf(value.charAt(i));
    
       if(index > -1) {
          result += validCharacters.charAt(index);
        }
      }
      return result;
    }    

  onSlideChanged() {

    this.slides.getActiveIndex().then(index => {
      console.log(index);
      this.slideNumber =index
      
for (let i of this.AddLoan){
  if(index == i.id){

    this.AccountNo = i.AccountNo
    
  }

}
 
     
      
    

        

      console.log(this.AddLoan);
   });
 
  


    
   

    }

getLoanbyId(){
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
    this.CUSTOMERCODE = val
    var x= 0
  this.api.GetLoanAccountByPersonId(val,this.Id)
    .subscribe(res => {
      this.DataLoan = res
      for (let i of this.DataLoan){


        this.api.GetDetailPayByAccountNo(val,i.AccountNo,"1")
        .subscribe(res => {
          this.DetailPayByAccountNo = res
    
    
      for (let P of this.DetailPayByAccountNo){
    
        if(P.Mulct !=""){
          this.mulct = P.Mulct
        }
        if(P.CloseFee !=""){
          this.closefee = P.CloseFee
        }
                
        if(P.TrackFee !=""){
          this.trackfee = P.TrackFee
        }
        if(P.CapitalBalance !=""){
          this.capitalbalance = P.Capital
        }
        
        if(P.RealInterest !=""){
          this.realinterest = P.RealInterest
        }
        if(P.MinPayment !=""){
          this.minpayment = P.MinPayment
        }
        
         
        this.AddLoan.push({ //เอาข้อมูลมาจัดใหม่
       
          AccountNo : P.AccountNo, 
          PersonName : P.PersonName,
          TypeLoanName : P.TypeLoanName,
          TrackFee: P.TrackFee,
          Mulct:P.Mulct,
          MinPayment:P.MinPayment,
          StatusPay:P.StatusPay,
          DateLastPay:P.DateLastPay,
          NewBalance:P.NewBalance,
          RealInterest:P.RealInterest,
          TermCapital:P.TermCapital,
          id : this.countLoan ++
           })

     if(this.countLoan==1){
       this.AccountNo =i.AccountNo
     }
    
        
     
      }
    
  
        
        }, err => {
          console.log(err);
          
        });




     
      }
      
      console.log(this.countLoan);
      console.log(res);
     


    }, err => {
      console.log(err);
      
    });
  });
}


closeModel(){
this.modalController.dismiss()
}








GetDetailPay() {
  var AccountNo1 
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)

    

  this.api.GetDetailPayByAccountNo(val,this.AccountNo,"1")
    .subscribe(res => {
      this.DetailPayByAccountNo = res


  for (let i of this.DetailPayByAccountNo){



if(i.Mulct !=""){
  this.mulct = i.Mulct
}
if(i.CloseFee !=""){
  this.closefee = i.CloseFee
}
        
if(i.TrackFee !=""){
  this.trackfee = i.TrackFee
}
if(i.CapitalBalance !=""){
  this.capitalbalance = i.CapitalBalance
}

if(i.RealInterest !=""){
  this.realinterest = i.RealInterest
}
if(i.MinPayment !=""){
  this.minpayment = i.MinPayment
}







this.openModelPay();
this.closeModel();

    
  console.log(this.mulct)
  }

      console.log(res);
    
    }, err => {
      console.log(err);
      
    });

  });



}

SaveLoan(){
  this.openModelPay();
  this.closeModel();
}

async openModelPay(){

    const modal = await this.modalController.create({
      component:ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps:{
        data: this.CUSTOMERCODE,
        data1: this.mulct,
        data2: this.trackfee,
        data3: this.closefee,
        data4: this.capitalbalance,
        data5: this.realinterest,
        data6: this.Payresult.replace(/[^0-9.]/g, ""),
        data7: this.AccountNo,
        data8: this.minpayment,
      }
    });
    this.showbt=false
    modal.present();
  

 
  
}





async AlertCF(AccountNo,MinPayment){

 


var Minpay =this.minpayment

  const alert = await this.alertController.create({
    header: 'สัญญา :' + AccountNo,
  cssClass: 'alertCF',
    inputs: [

    
      {
        name: 'Pay1',
        type: 'text',
        disabled:true,      
       // value: this.Payresult,
       value: 'ยอดจ่ายขั้นต่ำ '+  Number(Minpay).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') // Number convert stringToint
       
      },
    
      {
        name: 'Pay',
        type: 'number',
       // value: this.Payresult,
        placeholder: 'ยอดที่ชำระ',
       
      },
    
    ],
    buttons: [
      {
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'alertButton',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'ตกลง',
        cssClass: 'alertButton',
        handler: data => {
          console.log('Confirm Ok');
          console.log(data.Pay);
         this.showbt =true
         this.Payresult =data.Pay.replace(/[^0-9.]/g, "");
         this.Acc = AccountNo
        }
      }
    ]
  });

  await alert.present();
  
}







}
