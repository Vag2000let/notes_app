import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Note } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {
  apiURL = 'http://localhost:4000'

  constructor(private httpClient: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`${this.apiURL}/notes`)
  }

  createNote(note: Note) {
    return this.httpClient.post<Note>(`${this.apiURL}/create`, note)
  }

  deleteNote(noteId: number) {
    return this.httpClient.delete<Note>(`${this.apiURL}/delete/${noteId}`)
  }
}
