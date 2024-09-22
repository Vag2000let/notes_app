import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../interfaces';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {  
  note: Note = {
    title: '',
    text: ''  
  }
  IsNoteIncludesNotes: boolean = false

  // Отправляем данные родителю
  @Output() noteObj = new EventEmitter<Note>()
  // Отправляем id удаляемой заметки
  @Output() eventClick = new EventEmitter()

  // Получаем данные от родителя
  @Input() notes!: Note[]
  @Input() noteId!: number

  viewNotesFromParent() {
    // Массив notes из родительского компонента
    console.log('from NotesComponent', this.notes);    
  }

  saveNote(note: Note) {
    if (!note.text || !note.title) {
      return
    }
    // Отправляем note
    console.log('note', note);
    this.noteObj.emit(note)

    this.IsNoteIncludesNotes = true
  }

  // Отправляем id удаляемой заметки
  getNoteId(noteId: number) {
    console.log('noteId', noteId);
    this.noteId = noteId
  }
  
  // Прослушивает событие клика и отправляет ивент когда наступит событие
  sendActionDeleteNote(event: any) {
    // console.log('noteId', noteId);
    
    this.eventClick.emit(event)
  }
}
