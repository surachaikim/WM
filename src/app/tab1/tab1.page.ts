import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  DateToday: string = new Date().toLocaleDateString();
  Time: string = new Date().toLocaleTimeString();
  data = [];
  constructor(private http: HttpClient, private nativeHttp: HTTP, private plt: Platform,  public loadingController: LoadingController) {}





  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');

      this.DateToday = new Date().toLocaleDateString();
      this.Time = new Date().toLocaleTimeString();
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



  async getDataStandard() {
    let loading = await this.loadingController.create({
      
    });
    await loading.present();
 
    this.http.get('https://swapi.co/api/films').pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      this.data = data['results'];
    }, err => {
      console.log('JS Call error: ', err);
    });
  }
 
  async getDataNativeHttp() {
    let loading = await this.loadingController.create({

    });
    await loading.present();
 
    // Returns a promise, need to convert with of() to Observable (if want)!
    from(this.nativeHttp.get('http://swapi.co/api/films', {}, {'Content-Type': 'application/json'})).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(data => {
      let parsed = JSON.parse(data.data);
      this.data = parsed.results;
    }, err => {
      console.log('Native Call error: ', err);
    });
  }
 
  getDataEverywhere() {
    if (this.plt.is('cordova')) {
      this.getDataNativeHttp();
    } else {
      this.getDataStandard();
    }
  }
 

}