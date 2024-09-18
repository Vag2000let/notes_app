import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  note: Note = {
    title: '',
    text: ''  
  }

  notes: Note[] = [this.note];

  addNote() {
    const newNote = {
      title: '',
      text: ''  
    }

    this.notes.push(newNote)
  }

  deleteNote(noteId: number) {
    const notesArr = this.notes.filter((_, idx) => idx !== noteId)
    this.notes = notesArr
  }
}
