import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { RestApiService } from '../rest-api.service';
@Component({
  selector: 'app-addpin',
  templateUrl: './addpin.page.html',
  styleUrls: ['./addpin.page.scss'],
})
export class AddpinPage implements OnInit {
  pin:string= "";
 
  AddPassCodeRes:any;
  pinshow:boolean=true;
  pinconfirm:boolean =false;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  constructor(private router: Router,public api: RestApiService,private storage: Storage,public alertController: AlertController,public loadingController: LoadingController) { }

  ngOnInit() {
  }

  emitEvent() {
    this.change.emit(this.pin);

   //  this.getLogin()
      
    }
    

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = this.pin.slice(0,-1);
      return;
    }

    if (this.pin.length === 6) {
     
      
      return;
      
    }
    this.pin += pin;
   if ( this.pin.length === 6){


    this.storage.get('Pinregister').then((val) => {

      if(val==null){
    
        this.storage.set('Pinregister',this .pin).then((val) => {
         // alert("Pin : "+ val)
          this.pin=""
          this.pinshow =false
          this.pinconfirm= true
          console.log(val)
          });
      }
      
      else{
        this.storage.get('Pinregister').then((val) => {
          
          if (val==this.pin){
            this.storage.remove('Pinregister')
              this.AddPassCode();
          
         
        
           console.log(val)
          }
          else{
        
            this.storage.remove('Pinregister').then((val) => {
              alert('Pin ไม่ตรงกัน กรุณากำหนดใหม่')
              this.pin=""
              this.pinshow =true
              this.pinconfirm= false
              console.log(val)
              });
          }
          
          });
      }
    
      });
    
 
   
  //  this.confirm()


  //this.AddPassCode()
   }
   
  }

  async confirm(){

      const alert = await this.alertController.create({
        header: 'ยืนยัน',
        message: 'PIN ที่กำหนด : '+ this.pin,
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.pin ="";
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'ตกลง',
            handler: () => {
            this.AddPassCode()

              console.log('Confirm Okay');
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    AddPassCode(){
    
      this.storage.get('CUSTOMERCODE').then((val) => {
        console.log(val)
              this.api.AddPassCode(val,this.pin)
              .subscribe(res => {
                this.AddPassCodeRes = res
               for (let i of this.AddPassCodeRes){
                  if(i.St != "0"){
                    this.router.navigate(['loginpin'])
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
