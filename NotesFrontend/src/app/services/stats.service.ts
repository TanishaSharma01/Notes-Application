import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { handleError } from '../utils/ErrorHandling';
const baseUrl='http://localhost:8088/api/v1';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }

  public getCountUser():Observable<any>
  {
    return this.http.get<any>(`${baseUrl}/users/count-users`).pipe(catchError(handleError));
  }
  public getCountNotes()
  {
    return this.http.get(`${baseUrl}/notes/count-notes`).pipe(catchError(handleError));
  }
}

