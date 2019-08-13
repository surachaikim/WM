import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://mixproadvance.ddns.net/mbsmobile/mbsmobile.asmx/";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  public ReceiveUser:string="MdEsjk5d2P"
  public ReceivePassWord:string="Fs8SawmkSJ"
  
  UUid :string="259979739d8442a0"
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('ไม่สามารถเชื่อมต่อ Service ได้ กรุณาติดต่อ MixproAdvanc.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  constructor(private device: Device, private http: HttpClient,private platform: Platform) {
   // this.UUid = this.UUid
   }

  
  checkregister(UUid:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url = apiUrl +'CheckRegisterNo?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.device.serial 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


  GetCustomerName(CustomerCode: string): Observable<any> {
   
    const url = apiUrl+'GetCustomerName?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   GetRegister(CustomerCode: string): Observable<any> {
   
  
    const url = apiUrl+'GetRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&RegisterNo='+  this.device.serial 
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));

      
   }

   AddRegister(CustomerCode: string,FirstName:string,LastName:string,Email:string,Mobile:string): Observable<any> {
   
 
    const url = apiUrl+'AddRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&FirstName='+ FirstName +'&LastName='+ LastName +
                   '&Email='+ Email + '&Mobile=' + Mobile +'&RegisterNo='+  this.device.serial  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   ActiveRegister1(CustomerCode: string,ReferenceCode:string,UserName:string,password:string): Observable<any> {
   
    const url = apiUrl+'ActiveRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&ReferenceCode='+ ReferenceCode +'&UserName='+ UserName +
                   '&password='+ password  +'&RegisterNo='+  this.device.serial 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   AddPassCode(CustomerCode: string,pin:string): Observable<any> {
   
 
    const url = apiUrl+'AddPassCode?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&PassCode='+ pin +'&RegisterNo='+  this.device.serial 
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   
   GetLoginpin(CustomerCode: string,pin: string): Observable<any> {
   

    
    const url = apiUrl+'GetRegister?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&RegisterNo='+  this.device.serial 
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
 
 

   }

   SearchPerson(CustomerCode: string,textSearch: string): Observable<any> {
   

  const url = apiUrl+'SearchPerson?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&CustomerCode='+CustomerCode+'&RegisterNo='+  this.device.serial   +'&textSearch='+textSearch
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));



  
   }

  

   GetLoanAccountByPersonId(CustomerCode: string,Id: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'GetLoanAccountByPersonId?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial   +'&PersonId='+ Id +'&CustomerCode='+CustomerCode
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }




   GetDetailPayByAccountNo(CustomerCode: string,LoanNo: string,StatusPay:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'GetDetailPayByAccountNo?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial   +'&LoanNo='+ LoanNo +'&CustomerCode='+CustomerCode +'&StatusPay='+StatusPay
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }



   LoanPayment(CustomerCode: string,LoanNo: string,StatusPay:string,FlagSave:string,TotalPayAmount:string,MulctPay:string,TrackFee:string,CloseFee:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'LoanPayment?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.device.serial   +'&LoanNo='+ LoanNo +'&CustomerCode='+CustomerCode +'&StatusPay='+StatusPay+
            '&FlagSave='+ FlagSave + '&TotalPayAmount='+TotalPayAmount + '&MulctPay='+MulctPay + '&TrackFee='+TrackFee +'&CloseFee='+CloseFee
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }




   getSumAll(CustomerCode: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    
    const url =apiUrl + 'GetSumTransactionByDate?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +  this.device.serial   +'&CustomerCode='+ CustomerCode+'&Date1='+'' + '&Date2='+''
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   getSumAllList(CustomerCode: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'GetTransactionMobile?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial   +'&CustomerCode='+ CustomerCode+'&Date1='+'' + '&Date2='+''
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   getpersonInfo(CustomerCode: string,PersonId: string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'GetPersonInfo?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial   +'&CustomerCode='+ CustomerCode+'&PersonId='+ PersonId
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

   UpdateLatitudeLongitude(CustomerCode: string,PersonId: string,Latitude:Number,Longitude:Number): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'UpdateLatitudeLongitude?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial   +'&CustomerCode='+ CustomerCode+'&PersonId='+ PersonId +'&Latitude='+Latitude+'&Longitude='+Longitude
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   InsertloanTrans(AccountNo: string,Amount:string,user:string,AccountName:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'InsertLoanTrans?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial    +'&AccountNo='+ AccountNo+ '&AccountName='+AccountName +'&Amount='+Amount+'&UserId='+user
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }


   
   InsertRegister(AccountNo: string,Amount:string,user:string,AccountName:string): Observable<any> {
    // const url = `${apiUrl}/${code}/${pin}`;
    const url =apiUrl + 'InsertLoanTrans?ReceiveUser=' + this.ReceiveUser + '&ReceivePassWord='+ this.ReceivePassWord  +'&RegisterNo=' +   this.device.serial  +'&AccountNo='+ AccountNo+ '&AccountName='+AccountName +'&Amount='+Amount+'&UserId='+user
  
     return this.http.get(url).pipe(
       map(this.extractData),
       catchError(this.handleError));
   }

}
