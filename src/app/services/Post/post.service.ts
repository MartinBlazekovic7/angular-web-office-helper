import { Injectable } from '@angular/core';
import {DataService} from "../../shared/data.service";
import {Post} from "../../model/Workplace/workplace.model";
import {BehaviorSubject} from "rxjs";
import {Todo} from "../../model/Todo/todo.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  allPosts : Post[] = [];
  postSubject : BehaviorSubject<Post[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) { }

  getAllPosts(){
    this.dataService.getAllPosts()
      .subscribe((res => {
        this.allPosts = res;
        this.postSubject.next([...this.allPosts]);
      }))
    console.log(this.postSubject);
    return this.postSubject;
  }

  addPost(post){
    this.dataService.addPost(post)
      .subscribe((res => {
        this.allPosts.push(post);
        this.postSubject.next([...this.allPosts])
      }))
  }
}
