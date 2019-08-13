import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router'
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';


declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  show:boolean=true
  map: any;
  address:string;
  markerOptions: any = {position: null, 
    map: null,
     title: null,
     animation: google.maps.Animation.DROP};
  marker: any;
  personid =null;
  public Longitudenow:number;
  public Latitudenow:number;
  public latitude:number;
  public longitude:number;
 personInfo:any;
 FullAddress:string;
 UpdateLatitudeLongitude:any;
  constructor(
    private launchNavigator:LaunchNavigator,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private activatedRoute :ActivatedRoute,
    public api: RestApiService,
    private storage: Storage
  ) { }

  ngOnInit() {
   // this.loadMap();
   this.personid = this.activatedRoute.snapshot.paramMap.get('id');
   this.GetPersonInfo();

   this.geolocation.getCurrentPosition().then(position =>{
    this.Latitudenow = position.coords.latitude;
    this.Longitudenow = position.coords.longitude;
},error=>{
    console.log('error',error);
});
 
  }


  GetPersonInfo(){
    this.storage.get('CUSTOMERCODE').then((val) => {
      console.log(val)
            this.api.getpersonInfo(val,this.personid)
            .subscribe(res => {
              this.personInfo = res
      
 
          
      for (let item of this.personInfo){
     this.address =item.FullAddress
     this.latitude =item.Latitude;
     this.longitude =item.Longitude;
        this.loadMap(item.Latitude1,item.Longitude1)
      }
    
   
      
      
              console.log();
            }, err => {
              console.log(err);
             // alert(err)
            });
        
            });
      
  }

  loadMap(Latitude1,Longitude1) {
  //  this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(  Latitude1,  Longitude1);
      this.latitude=Latitude1
   this.longitude =Longitude1
    
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
     // this.getAddressFromCoords(Latitude1, Longitude1);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.markerOptions.position = latLng;
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'My Location';
      this.marker = new google.maps.Marker(this.markerOptions);


  /*this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });*/
      this.show=false
 
  //  }).catch((error) => {
   //   console.log('Error getting location', error);
   // });
  }


 
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
       this.address = "ไม่พบที่อยู่!";
      });
 
  }

  loadMapnow() {
    this.show=true
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(  resp.coords.latitude, resp.coords.longitude);
      this.Latitudenow =resp.coords.latitude;
      this.Longitudenow =resp.coords.longitude
      let mapOptions = {
        center: latLng,
        zoom: 18,
        
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.markerOptions.position = latLng;
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'ตำแหน่งของฉัน';
      this.marker = new google.maps.Marker(this.markerOptions);


      this.map.addListener('tilesloaded', () => {
        console.log('accuracy',this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
      this.show=false
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 

updatemap(){
  this.storage.get('CUSTOMERCODE').then((val) => {
    console.log(val)
          this.api.UpdateLatitudeLongitude(val,this.personid,this.Latitudenow,this.Longitudenow)
          .subscribe(res => {
            this.UpdateLatitudeLongitude = res
    

        
    for (let item of this.UpdateLatitudeLongitude){
      
   
   if(item.St == "1"){
     alert('อัพเดทตำแหน่งสำเร็จ')
    this.loadMapnow();

   }else{
     alert('อัพเดทตำแหน่งไม่สำเร็จ')
   }
    }
  
 
    
    
            console.log( );
          }, err => {
            console.log(err);
           // alert(err)
          });
      
          });
    
}
mapNv(){
  let at = this.latitude  + ','+this.longitude 
  let options: LaunchNavigatorOptions = {
    start:[this.Latitudenow,this.Longitudenow],
    
		app: this.launchNavigator.APP.GOOGLE_MAPS
	};
	this.launchNavigator.navigate(at , options)
	.then(success =>{
		console.log(success);
	},error=>{
		console.log(error);
	})
}



 back(){
  this.router.navigateByUrl('/tabs/tab2')
 }
 
}
