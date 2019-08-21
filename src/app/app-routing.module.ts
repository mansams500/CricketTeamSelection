import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ViewTeamComponent } from './create-team/view-team/view-team.component'

const routes: Routes = [
   {
    path: "",
    redirectTo: "/viewTeam",
    pathMatch: "full"
  },
  { path: "createPlayers", component: CreateTeamComponent },
  { path: "viewTeam", component : ViewTeamComponent}
    
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
