import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamComponent } from './create-team.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule,MatSelectModule,MatButtonModule,MatTableModule} from '@angular/material';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
   const data: any = require('../../assets/mock_data/mock-data.json');
   const validPalyersDataForSavingATeam: any = require('../../assets/mock_data/validPlayersList.json');
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamComponent ],
      imports : [FormsModule,HttpModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
     
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('length of the JSON to be more than 11', () => {
      expect(data.length).toBeGreaterThanOrEqual(11);
      //expect(component.filterData(mockResponse)).bo;
  });
  it('should have one wicket keeper', () => {
    expect(component.checkKeeper(data)).toBe(true);
  });
  it('should be a valid JSON', () => {
    
  });

  it('should have one wicket keeper', () => {
    expect(component.checkKeeper(data)).toBe(true);
  });

});

/*
1. json file corrupted
2. connection failure - after application is running stop node.js and test the res status code
3. i/p json file length is < 11  - done
3. i/p json file contains 1 wk - done
4. validation on save
5. should have mini 11 players and 1 wk 
6. connection failure
7. mock json file
*/