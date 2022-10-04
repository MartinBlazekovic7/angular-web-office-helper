import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Todo} from "../model/Todo/todo.model";
import {Note} from "../model/Note/note.model";
import {CalendarEvent} from "../model/Calendar/calendar.model";
import {Post, Workplace} from "../model/Workplace/workplace.model";
import {User} from "../model/User/user.model";
import {TimerEntry} from "../model/TimerEntry/timer-entry.model";
import {Workday} from "../model/WorkDay/workday.model";

interface ResponseUser {
  status: String;
  users: User[];
}

interface ResponseTodo {
  status: String;
  todos: Todo[];
}

interface ResponseNote {
  status: String;
  notes: Note[];
}

interface ResponseCalendarEvent {
  status: String;
  events: CalendarEvent[];
}

interface ResponseWorkplace {
  status: String;
  workplaces: Workplace[];
}

interface ResponsePost {
  status: String;
  posts: Post[];
}

interface ResponseTEntry {
  status: String;
  tentries: TimerEntry[];
}

interface ResponsePEntry {
  status: String;
  pentries: Workday[];
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_USERS = 'http://localhost:8081/api/users';

  API_TODOS = 'http://localhost:8081/api/todos';
  API_ALL_TODOS = 'http://localhost:8081/api/allTodos';

  API_NOTES = 'http://localhost:8081/api/notes';
  API_ALL_NOTES = 'http://localhost:8081/api/allNotes';

  API_EVENTS = 'http://localhost:8081/api/events';
  API_ALL_EVENTS = 'http://localhost:8081/api/allEvents';

  API_TIMER_ENTRIES = 'http://localhost:8081/api/tentries';
  API_ALL_TIMER_ENTRIES = 'http://localhost:8081/api/allTentries';

  API_PAYCHECK_ENTRIES = 'http://localhost:8081/api/pentries';

  API_WORKPLACES = 'http://localhost:8081/api/workplaces';
  API_ALL_WORKPLACES = 'http://localhost:8081/api/allWorkplaces';
  API_WORKPLACE_USERS = 'http://localhost:8081/api/workplaceUsers'

  API_POSTS = 'http://localhost:8081/api/posts';
  API_ALL_POSTS = 'http://localhost:8081/api/allPosts';
  API_WORKPLACE_POSTS = 'http://localhost:8081/api/workplacePosts';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.API_USERS)
      .pipe(map((res: User[]) => {
        return res;
      }))
  }

  addUser(user){
    return this.http.post(this.API_USERS, user);
  }



  getAllTodos(){
    return this.http.get(this.API_ALL_TODOS)
      .pipe(map((res: ResponseTodo) => {
        console.log(res);
        return res.todos;
      }))
  }
  getTodos(userId){
    return this.http.get(this.API_TODOS+`/${userId}`)
      .pipe(map((res: ResponseTodo) => {
        return res.todos;
      }))
  }
  addTodo(todo){
    return this.http.post(this.API_TODOS,todo);
  }
  editTodo(todo){
    return this.http.put(this.API_TODOS, todo);
  }
  deleteTodo(idTodo){
    return this.http.delete(this.API_TODOS+`/${idTodo}`);
  }

  getAllNotes(){
    return this.http.get(this.API_ALL_NOTES)
      .pipe(map((res: ResponseNote) => {
        console.log(res);
        return res.notes;
      }))
  }

  getNotes(userId){
    return this.http.get(this.API_NOTES+`/${userId}`)
      .pipe(map((res: ResponseNote) => {
        return res.notes;
      }))
  }


  addNote(note){
    return this.http.post(this.API_NOTES,note);
  }
  editNote(note){
    return this.http.put(this.API_NOTES, note);
  }
  deleteNote(idNote){
    return this.http.delete(this.API_NOTES+`/${idNote}`);
  }



  getAllEvents(){
    return this.http.get(this.API_ALL_EVENTS)
      .pipe(map((res: ResponseCalendarEvent) => {
        console.log(res);
        return res.events;
      }))
  }
  getEvents(userId){
    return this.http.get(this.API_EVENTS+`/${userId}`)
      .pipe(map((res: ResponseCalendarEvent) => {
        return res.events;
      }))
  }
  addEvent(event){
    return this.http.post(this.API_EVENTS,event);
  }
  deleteEvent(idEvent){
    return this.http.delete(this.API_EVENTS+`/${idEvent}`);
  }


  getAllTimerEntries(){
    return this.http.get(this.API_ALL_TIMER_ENTRIES)
      .pipe(map((res: ResponseTEntry) => {
        console.log(res);
        return res.tentries;
      }));
  }
  getTimerEntries(userId){
    return this.http.get(this.API_TIMER_ENTRIES+`/${userId}`)
      .pipe(map((res: ResponseTEntry) => {
        return res.tentries;
      }));
  }
  addEntry(entry){
    return this.http.post(this.API_TIMER_ENTRIES,entry);
  }
  stopEntry(entry){
    return this.http.put(this.API_TIMER_ENTRIES, entry);
  }
  deleteTimerEntry(userId){
    return this.http.delete(this.API_TIMER_ENTRIES+`/${userId}`);
  }

  getPaycheckEntries(userId){
    return this.http.get(this.API_PAYCHECK_ENTRIES+`/${userId}`)
      .pipe(map((res: ResponsePEntry) => {
        return res.pentries;
      }));
  }
  addPaycheckEntry(entry){
    return this.http.post(this.API_PAYCHECK_ENTRIES,entry);
  }
  deletePaycheckEntry(userId){
    return this.http.delete(this.API_PAYCHECK_ENTRIES+`/${userId}`);
  }


  getAllWorkplaces(){
    return this.http.get(this.API_ALL_WORKPLACES)
      .pipe(map((res: ResponseWorkplace) => {
        console.log(res);
        return res.workplaces;
      }))
  }

  getWorkplaces(userId){
    return this.http.get(this.API_WORKPLACES+`/${userId}`)
      .pipe(map((res: ResponseWorkplace) => {
        return res.workplaces;
      }))
  }

  addWorkplace(workplace){
    return this.http.post(this.API_ALL_WORKPLACES, workplace);
  }



  getWorkplacePosts(workplaceId){
    return this.http.get(this.API_POSTS+`/${workplaceId}`)
      .pipe(map((res: ResponsePost) => {
        return res.posts;
      }))
  }

  getWorkplaceUsers(workplaceId){
    console.log(workplaceId);
    return this.http.get(this.API_WORKPLACE_USERS+`/${workplaceId}`)
      .pipe(map((res: ResponseUser) => {
        return res.users;
      }))
  }

  userJoinWorkplace(wu){
    console.log(wu);
    return this.http.post(this.API_WORKPLACES,wu);
  }
  leaveWorkplace(wu){
    console.log(wu);
    return this.http.delete(this.API_WORKPLACES+`/${wu.idWorkplace}`+`/${wu.idUser}`)
  }


  getAllPosts(){
    return this.http.get(this.API_ALL_POSTS)
      .pipe(map((res: ResponsePost) => {
        console.log(res);
        return res.posts;
      }))
  }

  addPost(post){
    return this.http.post(this.API_POSTS,post);
  }

  addPostToWorkplace(wp){
    return this.http.post(this.API_WORKPLACE_POSTS, wp);
  }

}
