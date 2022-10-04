import { Component, OnInit } from '@angular/core';
import {Todo} from "../../model/Todo/todo.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { faPlusCircle, faEdit, faTrash, faStickyNote, faList } from '@fortawesome/free-solid-svg-icons';
import {BehaviorSubject, Subscription} from "rxjs";
import {TodoService} from "../../services/Tools/todo.service";
import {User} from "../../model/User/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {


  allTodos: Todo[] = [];
  todos: Todo[] = [];
  todoSubject : BehaviorSubject<Todo[]>=null;
  subscriptionTodo : Subscription = null;

  faCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrash;
  faList = faList;

  checkboxClicked: Boolean = false;

  addTodoForm: FormGroup;

  addingTodoFormVisible: Boolean = false;

  todosToRemove: number = 0;

  showDeleteButton: Boolean = false;

  currentUser: User;

  constructor(private todoService: TodoService, private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.getUser();

    this.todoSubject=this.todoService.getTodos(this.currentUser.idUser);
    this.subscriptionTodo=this.todoSubject
      .subscribe(res => {
        if(res == null) return null;
        else {
          this.todos=res;
          for(let i = 0; i < this.todos.length; i++){
            if(this.todos[i].completed == true) this.todosToRemove++
          }

          if(this.todosToRemove > 0) this.showDeleteButton = true;
          else this.showDeleteButton = false;
        }
      });

    this.addTodoForm = new FormGroup({
      'text' : new FormControl('', null)
    });


  }

  showForm(){
    this.addTodoForm.reset();
    this.addingTodoFormVisible = !this.addingTodoFormVisible;
  }

  addTodoFormSubmit() {

    this.todoService.getAllTodos()
      .subscribe(res => {
      if(res == null) return null;
      else {
        this.allTodos=res;
      }
    });

    console.log(this.allTodos);

    let id = this.allTodos.length == 0 ? 0 : this.allTodos[this.allTodos.length-1].idTodo + 1;

    let tempTodo: Todo = {
      idTodo: id,
      text: this.addTodoForm.value.text,
      completed: false,
      userId: this.currentUser.idUser
    }

    this.todos.push(tempTodo);
    this.todoService.addTodo(tempTodo);

    this.addingTodoFormVisible = false;
    this.addTodoForm.reset();
  }

  completeThisTodo(i){
    if(!this.todos[i].completed) this.todosToRemove++;
    else this.todosToRemove--;

    if(this.todosToRemove > 0) this.showDeleteButton = true;
    else this.showDeleteButton = false;

    this.todos[i].completed = !this.todos[i].completed;
    this.checkboxClicked = !this.checkboxClicked;

    this.todoService.editTodo(this.todos[i]);

  }

  removeTodos(){


    for(let i = 0; i < this.todos.length; i++){
      if(this.todos[i].completed == true) this.todoService.deleteTodo(this.todos[i].idTodo);
    }
    // this.todos = this.todos.filter(t => t.completed == false)

    this.showDeleteButton = false;
    this.todosToRemove = 0;

  }

}
