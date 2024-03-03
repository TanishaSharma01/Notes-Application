import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {
  noteForm: FormGroup; // Define the FormGroup

  constructor(private formBuilder: FormBuilder, private notesService: NotesService) {
    this.noteForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500), Validators.pattern(/^[@;&,*+\-a-zA-Z0-9\s]*$/)]] // Add validation rules if needed
    });
  }

  ngOnInit(): void {
  }

  // Function to create and add a new note
  createNote(): void {
    if (this.noteForm.invalid) {
      // Handle form validation errors
      return;
    }

    const content = this.noteForm.value.content;

    this.notesService.createNoteForCurrentUser(content).subscribe(
      (response) => {
        // Note created successfully, you can handle the response as needed
        console.log('Note created:', response);

        // Optionally, you can redirect the user or perform other actions
        // For example, navigate to the list of notes
        // this.router.navigate(['/notes']);
      },
      (error) => {
        // Handle the error appropriately (e.g., show an error message)
        console.error('Error creating a note:', error);
      }
    );

    // Clear the form after creating the note
    this.noteForm.reset();
  }
}