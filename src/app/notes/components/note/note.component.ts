import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Note } from '../../../interfaces'

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  note: Note = {
    title: '',
    text: ''
  }

  // Отправляем данные родителю
  @Output() eventClickDeleteNote = new EventEmitter()
  // Отправляем id удаляемой заметки
  @Output() eventClickSaveNote = new EventEmitter()
  // Отправляем данные note родителю
  @Output() noteObj = new EventEmitter()

  // Получаем данные от родителя
  // @Input() stateNotes!: Note[]
  // // @Input() noteId!: number

  sendThisNote() {
    console.log('note', this.note)
    this.noteObj.emit(this.note)
  }

  sendSaveNote() {
    if (!this.note.text || !this.note.title) {
      return
    }
    // Отправляем note
    this.eventClickSaveNote.emit(this.note)
    // Отключаем кнопку "Сохранить заметку"
  }

  sendDeleteNote() {
    this.eventClickDeleteNote.emit()
  }
}
