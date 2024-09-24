import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Note } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class NotesDataService {
  notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([])
  notes$: Observable<Note[]> = this.notesSubject.asObservable()

  getNotes(): Note[] {
    return this.notesSubject.getValue()
  }

  createNote() {
    const stateNotes = this.notesSubject.getValue()
    this.notesSubject.next(stateNotes)
  }

  deleteNote() {
    const stateNotes = this.notesSubject.getValue()
    this.notesSubject.next(stateNotes)
  }
}
