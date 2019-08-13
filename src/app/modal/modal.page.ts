import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RestApiService } from '../rest-api.service';
import { LoadingController } from '@ionic/angular';
import { NavController,ModalController,PopoverController} from '@ionic/angular'
import { ReceiptPage } from '../receipt/receipt.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  coustomercode=null;
  mulct:string="0";
  trackfee:string="0";
  closefee:string="0";
  capitalbalance:string="0";
  realinterest:string="0";
  Payresult:string="0";
  AccountNo=null;
  minpayment:string="0";
  LoanPaymentRes:any;
  AddLoanPaymentRes:any;
  CustomerName:any;
   public CompName:string=""
  constructor(private nav :NavController,private modalController:ModalController, public loadingController: LoadingController,private storage: Storage, public api: RestApiService,private navParams:NavParams) { 

    this.coustomercode =this.navParams.get('data')
    this.mulct =this.navParams.get('data1')
    this.trackfee =this.navParams.get('data2')
    this.closefee =this.navParams.get('data3')
    this.capitalbalance =this.navParams.get('data4')
    this.realinterest =this.navParams.get('data5')
    this.Payresult =this.navParams.get('data6')
    this.AccountNo =this.navParams.get('data7')
    this.minpayment =this.navParams.get('data8')

    this.LoanPay();
  }

  ngOnInit() {
    
  }

  closeModel(){
    this.modalController.dismiss()
    }
    

 async LoanPay(){
  const loading = await this.loadingController.create({
    cssClass: 'transparent',  // css ใส่ไว้ที่ app.scss
    spinner: 'circles',
    duration: 1000

  });
  loading.present();
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
  this.api.LoanPayment(val,this.AccountNo,"1","0", this.Payresult,this.mulct,this.trackfee,this.closefee)
    .subscribe(res => {
      this.LoanPaymentRes = res


      console.log(res);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      console.log(err);
      
    });

  });
}

 async AddLoanpay(){
  const loading = await this.loadingController.create({
    cssClass: 'transparent',  // css ใส่ไว้ที่ app.scss
    spinner: 'circles',
    duration: 1000

  });
  loading.present();
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
  this.api.LoanPayment(val,this.AccountNo,"1","1", this.Payresult,this.mulct,this.trackfee,this.closefee)
    .subscribe(res => {
      this.AddLoanPaymentRes = res
for(let i of this.AddLoanPaymentRes){
  if(i.DocNo !=""){

    this.api.GetCustomerName(this.coustomercode)
  .subscribe(res => {
    this.CustomerName = res
  for (let i1 of this.CustomerName){

    this.closeModel();
  this.openModel(i.DocNo,i.AccountNo,i.AccountName,i.Mulct,i.TrackFee,i.LoanInterest, i1.CustomerName,i.Capital)

  }



      });
    
  }
}



      console.log(res);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      console.log(err);
      
    });

  });

}

async openModel(DocNo,AccountNo,AccountName,Mulct,TrackFee,LoanInterest,CustomerName,Capital){
 

  
 

  const modal = await this.modalController.create({
    component:ReceiptPage,
    componentProps:{
      data: this.Payresult,
     data1: AccountName,
      data2: CustomerName,
     data3: AccountNo,
     data4:Mulct,
     data5:TrackFee,
     data6:LoanInterest,
     data7:DocNo,
     data8:Capital
    }
  });
  modal.present();

}

}
