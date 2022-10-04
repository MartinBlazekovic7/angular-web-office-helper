import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DataService} from "../../shared/data.service";
import {Note} from "../../model/Note/note.model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  allNotes : Note[] = [];
  notes : Note[] = [];
  noteSubject : BehaviorSubject<Note[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {}

  getAllNotes(){
    this.dataService.getAllNotes()
      .subscribe((res => {
        this.allNotes = res;
        this.noteSubject.next([...this.allNotes]);
      }))
    return this.noteSubject;
  }

  getNotes(userId){
    this.dataService.getNotes(userId)
      .subscribe((res => {
        this.notes = res;
        this.noteSubject.next([...this.notes]);
      }))
    return this.noteSubject;
  }

  addNote(note){
    this.dataService.addNote(note)
      .subscribe((res => {
        this.notes.push(note);
        this.noteSubject.next([...this.notes])
      }))
  }

  editNote(note){
    this.dataService.editNote(note)
      .subscribe((res => {
        this.notes[this.notes.findIndex(n => n.idNote === note.idTodo)] = note;
        this.noteSubject.next([...this.notes]);
      }))
  }

  deleteNote(idNote){
    this.dataService.deleteNote(idNote)
      .subscribe((res => {
        this.notes=this.notes.filter(n => n.idNote!=idNote);
        this.noteSubject.next([...this.notes]);
      }));
  }
}
