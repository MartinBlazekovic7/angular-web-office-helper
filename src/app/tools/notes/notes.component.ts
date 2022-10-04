import { Component, OnInit } from '@angular/core';
import {Note} from "../../model/Note/note.model";
import {FormControl, FormGroup} from "@angular/forms";
import {animate, style, transition, trigger} from "@angular/animations";
import { faPenSquare, faStickyNote, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Todo} from "../../model/Todo/todo.model";
import {BehaviorSubject, Subscription} from "rxjs";
import {NoteService} from "../../services/Tools/note.service";
import {User} from "../../model/User/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class NotesComponent implements OnInit {

  allNotes: Note[] = [];
  notes: Note[] = [];
  noteSubject : BehaviorSubject<Note[]>=null;
  subscriptionNote : Subscription = null;

  faNote = faStickyNote;
  faEdit = faPenSquare;
  faDelete = faTrash;

  showNewNoteDiv: Boolean = false;

  newNoteForm: FormGroup;

  editNoteForm: FormGroup;

  editingNotes: Boolean = false;

  addOrEdit: Boolean = false;

  tempNoteEdit: number = 0;

  currentUser: User;

  constructor(private noteService: NoteService, private auth: AuthService) {
  }

  ngOnInit() {

    this.currentUser = this.auth.getUser();

    this.noteSubject=this.noteService.getNotes(this.currentUser.idUser);
    this.subscriptionNote=this.noteSubject
      .subscribe(res => {
        if(res == null) return null;
        else {
          this.notes=res;
        }
      });

    this.newNoteForm = new FormGroup({
      'heading': new FormControl(null, null),
      'text': new FormControl(null, null)
    });
    this.editNoteForm = new FormGroup({
      'heading': new FormControl(null, null),
      'text': new FormControl(null, null)
    });

  }

  addNewNote() {

    this.noteService.getAllNotes()
      .subscribe(res => {
        if(res == null) return null;
        else {
          this.allNotes=res;
          console.log(this.allNotes);
        }
      });

    let id = this.allNotes.length == 0 ? 0 : this.allNotes[this.allNotes.length-1].idNote + 1;

    let tempNote: Note = {
      idNote: id,
      text: this.newNoteForm.value.text,
      heading: this.newNoteForm.value.heading,
      userId: this.currentUser.idUser
    }

    this.notes.push(tempNote);
    this.noteService.addNote(tempNote);

    this.showNewNoteDiv = false;

    this.newNoteForm.reset();
  }
  removeNote(note) {
    this.noteService.deleteNote(note.idNote);
  }
  editNote(){
    this.notes[this.tempNoteEdit].text = this.editNoteForm.value.text;
    this.notes[this.tempNoteEdit].heading = this.editNoteForm.value.heading;
    this.noteService.editNote(this.notes[this.tempNoteEdit]);
    this.showNewNoteDiv = false;
    this.editNoteForm.reset();
  }

  editNoteDiv(note, i) {
    this.showNewNoteDiv = true;
    this.addOrEdit = true;
    this.tempNoteEdit = i;
    this.editNoteForm.patchValue({text: note.text, heading: note.heading});
  }
}
