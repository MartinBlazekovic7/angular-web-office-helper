import { Injectable } from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Todo} from "../../model/Todo/todo.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  allTodos : Todo[] = [];
  todos : Todo[] = [];
  todoSubject : BehaviorSubject<Todo[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  init(){

  }

  getAllTodos(){
    this.dataService.getAllTodos()
      .subscribe((res => {
        this.allTodos = res;
        this.todoSubject.next([...this.allTodos]);
      }))
    console.log(this.todoSubject);
    return this.todoSubject;
  }

  getTodos(userId){
     this.dataService.getTodos(userId)
       .subscribe((res => {
         this.todos = res;
         this.todoSubject.next([...this.todos]);
       }))
    return this.todoSubject;
  }

  addTodo(todo){
    this.dataService.addTodo(todo)
      .subscribe((res => {
        this.todos.push(todo);
        this.todoSubject.next([...this.todos])
      }))
  }

  editTodo(todo){
    this.dataService.editTodo(todo)
      .subscribe((res => {
        this.todos[this.todos.findIndex(t => t.idTodo === todo.idTodo)] = todo;
        this.todoSubject.next([...this.todos]);
      }))
  }

  deleteTodo(idTodo){
    this.dataService.deleteTodo(idTodo)
      .subscribe((res => {
        this.todos=this.todos.filter(t => t.idTodo!=idTodo);
        this.todoSubject.next([...this.todos]);
      }));
  }



}
