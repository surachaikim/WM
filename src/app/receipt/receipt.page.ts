import { Component, OnInit } from '@angular/core';
import { Base64 } from '@ionic-native/base64/ngx';
import { Storage } from '@ionic/storage';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams } from '@ionic/angular';
import { NavController,ModalController,PopoverController} from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FilePath } from '@ionic-native/file-path/ngx';
import { getLocaleDateFormat } from '@angular/common';
import { strict } from 'assert';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  DateToday: string = new Date().toLocaleDateString();
  Time: string = new Date().toLocaleTimeString();
  imageList:any;
  screen:any;
  state:boolean =false
  name=null;
  Payresult =null;
  VFName=null;
  Acc=null;
  LoanInterest =null;
  TrackFee=null;
  Mulct=null;
  DocNo=null;
  Capital=null;
  Namepic:string =this.Acc+"_"+this.DateToday
  fileContents:string;
  dirName:string
  fileName:string
  dirPath;
  pic:any;

  constructor(private filePath: FilePath,private file: File,public toastController: ToastController,private router: Router,private activatedRoute :ActivatedRoute,private modalController:ModalController,private navParams:NavParams,private socialSharing: SocialSharing,private storage: Storage,private base64:Base64, private screenshot: Screenshot) { 
    this.Payresult =this.navParams.get('data')
    this.name =this.navParams.get('data1')
     this.VFName =this.navParams.get('data2')
      this.Acc =this.navParams.get('data3')
      this.Mulct =this.navParams.get('data4')
      this.TrackFee =this.navParams.get('data5')
      this.LoanInterest =this.navParams.get('data6')
      this.DocNo =this.navParams.get('data7')
      this.Capital =this.navParams.get('data8')
  }


  ionViewDidEnter(){
    this.screenShot();
  }
  ionViewWillEnter(){

 
      
  }

  ngOnInit() {
    

  }


screenShot(){
  this.screenshot.URI().then(res =>{
this.screen =res.URI
//this.saveimg0();
//this.SavePicture();
this.SavePicture();
this.state =true


  })
}

Share()
{
  this.socialSharing.share(null,null,this.screen,null /* url */)

  .then(()=>{
   // alert("Success");          
  },
  (err)=>{
   // alert(err)
  })


}
reset() {
  this.state = false;
 // var self = this;
 // setTimeout(function(){ 
  //  self.state = false;
 // }, 1000);
}
closeModel(){
  this.reset();
  //this.router.navigate(['/tabs/tab2'])
  this.modalController.dismiss()
  

 // this.router.navigateByUrl('/tabs/tab2');
  }
  back(){
    this.router.navigateByUrl('/tabs/tab2');
  }









  SavePicture(){
  

let name = this.Acc 

  this.screenshot.save('jpg', 80, name).then(res => {


   
   this.presentToast()


 
});
}

  
  




  saveimg0(){
  
    let name = this.Acc 
    var folderName = "WalkMoneyPlus"
    let path =this.file.externalRootDirectory+folderName ;

    
 
    // var data = this.screen(',')[1];
  // let blob =this.b64toblob(data,'image/png')

   this.screenshot.URI(80).then(res => {
    

    this.base64.encodeFile(path).then((base64File :string) =>{
      var res_cut =base64File;

      this.file.checkDir(this.file.externalRootDirectory , 'WalkMoneyPlus').then(response => {
 
   if(response!=null){
   // let contentType= this.getContentType1(res_cut)
    let blob 

    this.file.writeFile(path,name+".jpg",blob, {replace: true}).then(res =>{
      this.presentToast();
    }, err =>{
      console.log(err)
    });
    console.log('Directory exists'+response);
   }

   else{
    this.file.createDir(this.file.externalRootDirectory, 'WalkMoneyPlus', false).then(response => {
      console.log('Directory create'+response);
    
     // let contentType= this.getContentType1(res_cut)
      let blob 

      this.file.writeFile(path,name+".jpg",blob, {replace: true}).then(res =>{
        this.presentToast();
      }, err =>{
        console.log(err)
      });
    }).catch(err => {
      console.log('Directory no create'+JSON.stringify(err));
    }); 
    
   }
      
       
      }).catch(err => {
        console.log('Directory doesn\'t exist'+JSON.stringify(err));
       
      });


    //  var res_cut =base64File;

     
     }, (err) =>{
       console.log(err)


    
      });
   
  

  });




  }

 


 /* SaveImg010() {
  this.screenshot.save('jpg', 80, 'myscreenshot').then(res => {
    this.storage.get('imageSereen').then((val) =>{
    if(val=== null && val ===""){
      let filePath:string =res.filePath 
      this.base64.encodeFile(filePath).then((base64File :string) =>{
       var first =[];

       var res_cut =base64File;
       first.push(res_cut);
       this.storage.set('imageSereen',first);
      
       this.presentToast();
      
      }, (err) =>{
        console.log(err)

      });
    }else{
      let filePath:string =res.filePath 
        this.base64.encodeFile(filePath).then((base64File :string)=>{
          var res_cut =base64File;
          val.push(res_cut);
          this.storage.set('imageSereen',val);
          
        this.presentToast();
        }, (err) =>{
          console.log(err)
        });


    }

    });



  });
 
}*/

async presentToast() {
  const toast = await this.toastController.create({
    message: 'บันทึกภาพลงเครื่องเรียบร้อย',
    duration: 3000,
    cssClass:'iontoast'
  });
  toast.present();
}

/*b64toblob(b64Data,contentType){
  contentType =contentType || '';
  var slicSize =512;
  var byteCharacters =atob(b64Data);
  var byteArrays =[];

  for (var offset =0; offset < byteCharacters.length;offset += slicSize){
var slice =byteCharacters.slice(offset,offset +slicSize);

var byteNumber= new Array(slice.length);
for(var i =0; i< slice.length; i++){
  byteNumber[i] =slice.charCodeAt(i);
}
var byteArray =new Uint8Array(byteNumber);
byteArrays.push(byteArray);

  }
  var blob = new Blob(byteArrays,{type :contentType});
  return blob;
}*/



}
