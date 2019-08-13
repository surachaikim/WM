import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-settingservice',
  templateUrl: './settingservice.page.html',
  styleUrls: ['./settingservice.page.scss'],
})
export class SettingservicePage implements OnInit {
  Service:string="";
  UserName:string="";
PassWord:string="";

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('SERVICE_INFO').then((val) => {
    
      this.Service = val.Service 
       this.UserName = val.UserName 
        this.PassWord = val.PassWord 
        console.log(val)
            });

  }


  Setservice(){
    var ServiceInfo ={
      // set   
      Service: this.Service,        
      UserName: this.UserName,
      PassWord: this.PassWord 

    }
    console.log(this.Service)
    this.storage.set('SERVICE_INFO',ServiceInfo).then((val) =>{
    // เก็บลงเครื่อง
      
    console.log(val)
alert('บันทึกการตั้งค่าสำเร็จ')

      });
  }
}
