import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from "../note/note.component";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  notes: Note[] = [];
  nodeId: number | null = null

  addNote() {
    const newNote = {
      title: '',
      text: ''  
    }

    this.notes = [...this.notes, newNote]
    console.log('this.notes', this.notes);
  }

  deleteNote(noteId: number) {
    console.log('nodeId', noteId);
    this.notes = this.notes.filter((_, idx) => idx !== noteId)
  }

  getNoteFromNoteComponent(noteData: Note) {
    console.log('noteData', noteData);
    this.notes = [...this.notes, noteData]
    // this.notes.push(noteData)
  }
}
