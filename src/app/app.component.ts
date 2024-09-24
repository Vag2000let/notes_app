import { Component, inject, OnInit, Output } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NotesComponent } from './notes/notes.component'
import { NoteComponent } from './notes/components/note/note.component'
import { NotesDataService } from './service'
import { Note } from './interfaces'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesComponent, NoteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes_app'
  name = 'Vagan'
}
