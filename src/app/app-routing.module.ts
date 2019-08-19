import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateTeamComponent } from './create-team/create-team.component';

const routes: Routes = [
   {
    path: "",
    redirectTo: "/createPlayers",
    pathMatch: "full"
  },
  { path: "createPlayers", component: CreateTeamComponent }
    
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
