import { Component, inject, Input } from '@angular/core'
import { AsyncPipe, CommonModule, NgForOf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NoteComponent } from './components/note/note.component'
import { NotesApiService, NotesDataService } from '../service'
import { Note } from '../interfaces'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss', './components/note/note.component.scss']
})
export class NotesComponent {
  notesApiService = inject(NotesApiService)
  notesDataService = inject(NotesDataService)

  notes: Note[] = []

  // Получаем данные из NoteComponent
  @Input() noteObj!: Note

  ngOnInit() {
    this.notesApiService.getNotes().subscribe((notes) => {
      console.log('notes', notes)

      this.notes = notes
    })
  }

  addNote(note: any) {
    this.notes = [...this.notes, note]
  }

  deleteNote(idx: number) {
    console.log('idx', idx)
    this.notes = this.notes.filter((_, index) => index !== idx)

    this.notesApiService.deleteNote(idx).subscribe((notes) => {
      console.log('deleteNote', notes)
    })
  }

  saveNote(note: Note, idx: number) {
    const newNote = {
      ...note,
      id: idx
    }
    console.log('newNote', newNote)

    this.notesApiService.createNote(newNote).subscribe((note) => {
      console.log('saveNoteFromNoteComponent', note)
    })
  }
}
