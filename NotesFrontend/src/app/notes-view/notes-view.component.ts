import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.css']
})
export class NotesViewComponent implements OnInit {
  recentNotes: any[] = [];
  notesCount: number = 0;
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getRecentNotes();
    this.getCountOfNotes();
  }

  getRecentNotes(): void {
    this.notesService.getRecentNotesForCurrentUser().subscribe(
      (notes) => {
        this.recentNotes = notes;
        console.log(notes);
      },
      (error) => {
        // Handle and display the error as needed
        console.error('Error fetching recent notes:', error);
      }
    );
  }

  // Function to delete a note by its ID
  deleteNoteButtonClicked(noteId: number): void {
    this.notesService.deleteNoteById(noteId).subscribe(
      (response) => {
        // Handle successful deletion here, e.g., remove the note from the UI
        console.log(`Note deleted successfully.`);
        window.location.reload(); // Reload the page
      },
      (error) => {
        // Handle error here, e.g., show an error message to the user
        console.error(`Error deleting note with ID ${noteId}:`, error);
        window.location.reload(); // Reload the page
      }
    );
  }

  // Function to format createdAt date
  formatCreatedAt(createdAt: string): string {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Function to get the count of notes
  getCountOfNotes(): void {
    const userId = this.notesService.getUserIdFromLocalStorage();
  
    if (userId !== null) {
      this.notesService.countNotes(userId).subscribe(
        (count) => {
          this.notesCount = count;
        },
        (error) => {
          // Handle and display the error as needed
          console.error('Error fetching notes count:', error);
        }
      );
    } else {
      // Handle the case where the user ID is null (not logged in)
      // You can set this.notesCount to 0 or display a message to the user.
    }
  }
}
