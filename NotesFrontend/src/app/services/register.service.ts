import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../class/user';
import { handleError } from '../utils/ErrorHandling';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient) { }
  loggedUser: User | null =null;
  BASE_URL = 'http://localhost:8088/api/v1';

  public loginUserFromRemote(user: User):Observable<any>{
    const url= this.BASE_URL+'/users/login';
    return this._http.post<any>(url,user).pipe(
      map((res: any) => {
      this.storeLoggedUser(res.data);
      return res.data;
    })
    );
  }

  //store logged user in local storage
  storeLoggedUser(user: Object) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  //get logged user from local storage
  getLoggedUser() {
    const userStr = localStorage.getItem('loggedUser');
    if (userStr === undefined || userStr === null) {
      return null;
    }
    // console.log('userStr', userStr);
    return JSON.parse(userStr);
  }
  
  //check if logged in
  isLoggedIn() {
    const user = this.getLoggedUser();
    if(user!= null || user != undefined){
      return true;
    }
    else{
      return false;
    }
  }

  //logout user
  logoutUser() {
    const url = this.BASE_URL + '/users/logout';
    return this._http.post(url, {}).pipe(catchError(handleError));
  }

  //register user
  public registerUserFromRemote(user: User):Observable<any>{
    const url= this.BASE_URL+'/users/register';
    return this._http.post<any>(url,user).pipe(catchError(handleError));
  }
}
