import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import {ToolsComponent} from "./tools/tools.component";
import {TrackingComponent} from "./tracking/tracking.component";
import {NewsComponent} from "./social/news/news.component";
import {SocialComponent} from "./social/social.component";
import {GamesComponent} from "./games/games.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuard} from "./auth/auth.guard";

const routes : Route[] = [
  {path: 'tools', component: ToolsComponent, canActivate:[AuthGuard]},
  {path: 'tracking', component: TrackingComponent, canActivate:[AuthGuard]},
  {path: 'social', component: SocialComponent, canActivate:[AuthGuard]},
  {path: 'games', component: GamesComponent, canActivate:[AuthGuard]},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
