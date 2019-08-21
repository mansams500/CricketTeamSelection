import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team.component';
import { HttpModule } from '@angular/http';
 import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatTableModule} from '@angular/material';
import {CricketTeamService} from '../services/cricket-team.service';
import { ViewTeamComponent } from './view-team/view-team.component'


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [CreateTeamComponent, ViewTeamComponent],
  providers: [ CricketTeamService ],
})
export class CreateTeamModule { }
