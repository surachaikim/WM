import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
@Component({
  selector: 'app-setting-service2',
  templateUrl: './setting-service2.page.html',
  styleUrls: ['./setting-service2.page.scss'],
})
export class SettingService2Page implements OnInit {
  Service:string="";
  UserName:string="";
PassWord:string="";
  constructor(private storage: Storage,private router: Router) { }

  ngOnInit() {
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
this.router.navigate(['register']);
      });
  }

}
