import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  loggedIn = false;
  user:any = null;
  userId:any = null;
  constructor(private http:HttpClient, private registerService: RegisterService) {
    this.loggedIn = this.registerService.isLoggedIn();
    this.user = this.registerService.getLoggedUser();
    this.userId = this.user.userId;
   }
  BASE_URL = 'http://localhost:8088/api/v1';

  // Method to retrieve the user ID from local storage
  getUserIdFromLocalStorage(): number | null {
    return this.userId ? +this.userId : null; // Convert to a number if it exists, or return null
  }

  // Method to fetch recent notes for the currently logged-in user
  getRecentNotesForCurrentUser(): Observable<any> {
    if (this.userId === null) {
      throw new Error('User ID not found in local storage'); // Handle this case appropriately
    }

    const url = `${this.BASE_URL}/notes/user/${this.userId}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response && response.data) {
          return response.data;
        } else {
          throw new Error('Invalid response format from the API');
        }
      }),
      catchError((error: any) => {
        // Handle and log the error appropriately
        console.error('Error fetching recent notes:', error);
        return throwError('An error occurred while fetching recent notes');
      })
    );
  }

  // Method to create a new note for the currently logged-in user
  createNoteForCurrentUser(content: string): Observable<any> {
    if (this.userId === null) {
      throw new Error('User ID not found in local storage'); // Handle this case appropriately
    }
    const url = `${this.BASE_URL}/notes/user/${this.userId}`;
    return this.http.post<any>(url, { content }).pipe(
      catchError((error: any) => {
        // Handle and log the error appropriately
        console.error('Error creating a note:', error);
        return throwError('An error occurred while creating the note');
      })
    );
  }

  //Method to delete a note by its ID for the currently logged-in user
  deleteNoteById(noteId: number): Observable<string> {
    if (this.userId === null) {
      throw new Error('User ID not found in local storage'); // Handle this case appropriately
    }

    const url = `${this.BASE_URL}/notes/${noteId}`;
    return this.http.delete<string>(url);
  }

  // Method to count the number of notes for a specific user
  countNotes(userId: number): Observable<number> {
    if (userId === null) {
      throw new Error('User ID not found'); // Handle this case appropriately
    }

    const url = `${this.BASE_URL}/notes/count/${userId}`;
    return this.http.get<number>(url);
  }
}
