import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team.component';
import { HttpModule } from '@angular/http';
 import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatTableModule} from '@angular/material';
import { Ng2CompleterModule } from 'ng2-completer';
import {CricketTeamService} from '../services/cricket-team.service'


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    Ng2CompleterModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  declarations: [CreateTeamComponent],
  providers: [ CricketTeamService ],
})
export class CreateTeamModule { }
