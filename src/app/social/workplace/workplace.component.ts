import { Component, OnInit } from '@angular/core';
import {Post, Workplace, Workplace_has_Post, Workplace_has_User} from "../../model/Workplace/workplace.model";
import {User} from "../../model/User/user.model";
import {faPeopleArrows, faUser, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {animate, style, transition, trigger} from "@angular/animations";
import {BehaviorSubject, Subscription} from "rxjs";
import {WorkplaceService} from "../../services/Workplace/workplace.service";
import {AuthService} from "../../auth/auth.service";
import {PostService} from "../../services/Post/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0, marginBottom: 0, marginTop: 0 }),
            animate('0.5s ease-out',
              style({ height: 10, opacity: 1, marginBottom: 10, marginTop: 10  }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 10, opacity: 1, marginBottom: 10, marginTop: 10   }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0, marginBottom: 0, marginTop: 0  }))
          ]
        )
      ]
    )
  ]
})
export class WorkplaceComponent implements OnInit {

  CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  allWorkplaces: Workplace[] = [];
  workplaces: Workplace[] = [];
  workplaceSubject : BehaviorSubject<Workplace[]>=null;
  subscriptionWorkplace : Subscription = null;

  faPeople = faPeopleArrows;
  faUser = faUser;
  faUserCircle = faUserCircle;

  showCreate: Boolean = false;
  showCreateText: String = 'CREATE A WORKSPACE';
  showJoin: Boolean = false;
  showJoinText: String = 'JOIN A WORKSPACE';

  userInputCode: String = '';
  userCreateName: String = '';

  userInputPost: String = '';

  chosenWorkplace: Workplace;
  chosenWorkplacePosts: Post[] = [];
  chosenWorkplaceUsers: User[];

  newPostText: String = 'Publish';
  showNewPost: Boolean = false;

  currentUser: User;

  allPosts: Post[] = [];

  constructor(private workplaceService: WorkplaceService, private auth: AuthService, private postService: PostService, private router: Router) { }

  ngOnInit(): void {

    this.currentUser = this.auth.getUser();

    this.postService.getAllPosts()
      .subscribe(res => {
        if (res == null) return null;
        else {
          this.allPosts = res;

        }
      });

    this.workplaceService.getAllWorkplaces()
      .subscribe( res => {
        if (res == null) return null;
        else {
          console.log(res);
          this.allWorkplaces = res;
        }
      });

    this.workplaceSubject=this.workplaceService.getWorkplaces(this.currentUser.idUser);
    this.subscriptionWorkplace=this.workplaceSubject
      .subscribe(res => {
        if(res == null) return null;
        else {
          this.workplaces = res;
          console.log(this.workplaces, this.currentUser.idUser);
          if(this.workplaces.length) {
            this.chosenWorkplace = this.workplaces[0];
            console.log(this.chosenWorkplace);
            this.getWorkplaceUsers(this.chosenWorkplace.idWorkplace);
            this.getWorkplacePosts(this.chosenWorkplace.idWorkplace);
          }
        }
      });
  }

  createWorkplace(){

    let id = this.allWorkplaces.length == 0 ? 1 : this.allWorkplaces[this.allWorkplaces.length-1].idWorkplace + 1;

    let tempWorkplace: Workplace = {
      idWorkplace: id,
      name: this.userCreateName,
      code: this.generateString(3, this.CODE_CHARS)
    }
    this.allWorkplaces.push(tempWorkplace);
    this.workplaces.push(tempWorkplace);

    this.workplaceService.addWorkplace(tempWorkplace);

    let wu: Workplace_has_User = {
      idWorkplace: tempWorkplace.idWorkplace,
      idUser: this.currentUser.idUser
    }
    this.workplaceService.userJoinWorkplace(wu);

    this.chosenWorkplace = tempWorkplace;
    this.getWorkplaceUsers(this.chosenWorkplace.idWorkplace);
    this.getWorkplacePosts(this.chosenWorkplace.idWorkplace);

    this.showCreateFun();
    this.userCreateName = '';
}

joinWorkplace(){

  let found = false;

  this.allWorkplaces.forEach((w) => {
    if(w.code === this.userInputCode){
      found = true;
      this.chosenWorkplace = w;
      let wu: Workplace_has_User = {
        idWorkplace: w.idWorkplace,
        idUser: this.currentUser.idUser
      }
      this.workplaceService.userJoinWorkplace(wu);
      console.log(wu);
      this.showJoinFun();
      this.userInputCode = '';
      this.router.navigate(['/social']).then(() => {
        window.location.reload();
      });
    }
  });

  if(!found){
    alert("No workplace with that code!")
  }


}

addPost(){

  let tempPost: Post;
  let id = this.allPosts.length == 0 ? 1 : this.allPosts[this.allPosts.length-1].idPost + 1;
  tempPost = {
    idPost: id,
    text: this.userInputPost,
    timestamp: new Date().toLocaleString(),
    userId: this.currentUser.idUser,
    username: this.currentUser.username
  }

  this.allPosts.push(tempPost);
  this.postService.addPost(tempPost);
  this.chosenWorkplacePosts.push(tempPost);

  let wp: Workplace_has_Post = {
    idWorkplace: this.chosenWorkplace.idWorkplace,
    idPost: tempPost.idPost
  }
  this.workplaceService.addPostToWorkplace(wp);

  this.userInputPost = '';
  this.newPostText = 'Publish'
  this.showNewPost = false;

  this.router.navigate(['/social']).then(() => {
    window.location.reload();
  });

}

  showCreateFun(){
    if(this.showCreate === false){
      this.showCreate = true;
      this.showCreateText = 'CLOSE'
    } else {
      this.showCreate = false;
      this.showCreateText = 'CREATE A WORKSPACE'
    }
  }
  showJoinFun(){
    if(this.showJoin === false){
      this.showJoin = true;
      this.showJoinText = 'CLOSE'
    } else {
      this.showJoin = false;
      this.showJoinText = 'JOIN A WORKSPACE'
    }
  }

  showNewPostFun(){
    if(this.showNewPost === false){
      this.newPostText = 'Cancel'
      this.showNewPost = true;
    } else {
      this.newPostText = 'Publish'
      this.showNewPost = false;
    }
  }

  getWorkplaceUsers(workplaceId){
    this.workplaceService.getWorkplaceUsers(workplaceId)
      .subscribe((res => {
        if(res == null) return
        else {
          this.chosenWorkplaceUsers = res;
        }
      }))
  }
  getWorkplacePosts(workplaceId){
    this.workplaceService.getWorkplacePosts(workplaceId)
      .subscribe((res => {
        if(res == null) return
        else {
          this.chosenWorkplacePosts = res;
        }
      }));
  }

  generateString(len, usableCharachters) {
    let result = '';
    for (let i = len; i > 0; --i)
      result += usableCharachters[Math.floor(Math.random() * usableCharachters.length)];
    return result;
  }

  leaveWorkplace(){
    let wu: Workplace_has_User = {
      idWorkplace: this.chosenWorkplace.idWorkplace,
      idUser: this.currentUser.idUser
    }
    console.log(wu);
    this.workplaceService.leaveWorkplace(wu);
    // this.router.navigate(['/social']).then(() => {window.location.reload();});
  }



}
