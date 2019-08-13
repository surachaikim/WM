import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  category:any;
  Statement:any;
  VFName:string="";
  UserId:string="";
  BranchName:string="";
  SumAmount :any;
  SumAmountList :any;
  amount:string="00";
  countacc:string="";
  DateToday: string = new Date().toLocaleDateString();
  Time: string = new Date().toLocaleTimeString();
  constructor(private storage: Storage,public api: RestApiService,public loadingController: LoadingController) {

   // this.category = "Dashbord"
   // this.Statement ="Paydebt"

   this.storage.get('USER_INFO').then((val) => {
    this.UserId = val.UserId // ดึงข้อมูลผู้ใช้งาน
     this.VFName =val.CompName
     this.BranchName=val.BranchName
    });
     this.getSumAll();
   //  this.getSumAllList();
  }
  

  
   getSumAll() {
    this.storage.get('CUSTOMERCODE').then((val) => {
   

       this.api.getSumAll(val)
       .subscribe(res => {   
         this.SumAmount = res;   
         for (let i of this.SumAmount){
           if (i.TotalAmount != ""){
             this.amount = i.TotalAmount
           }  
           if (i.CountAcc != ""){
            this.countacc = i.CountAcc
          }    
         }
        
         
         console.log(this.SumAmount)
        
       }, err => {
         console.log('JS Call error: ', err);
      
      //   alert("ไม่สามารถเชื่อต่อ Server")
   
       });
      });
   
  }

 /* getSumAllList() {
    this.storage.get('CUSTOMERCODE').then((val) => {
     

       this.api.getSumAllList(val.UserId )
       .subscribe(res => {   
         this.SumAmountList = res;   
       
         
         console.log(this.SumAmountList)
        
       }, err => {
         console.log('JS Call error: ', err);
      
         alert("ไม่สามารถเชื่อต่อ Server")
   
       });
      });
   
  }
*/
 
ionRefresh(event) {
  console.log('Pull Event Triggered!');
  setTimeout(() => {
    console.log('Async operation has ended');

    this.DateToday = new Date().toLocaleDateString();
    this.Time = new Date().toLocaleTimeString();
    this.getSumAll();
    //complete()  signify that the refreshing has completed and to close the refresher
    event.target.complete();
  }, 2000);
}
ionPull(event){
//Emitted while the user is pulling down the content and exposing the refresher.
console.log('ionPull Event Triggered!');
}
ionStart(event){
//Emitted when the user begins to start pulling down.
console.log('ionStart Event Triggered!');
}
   





}
