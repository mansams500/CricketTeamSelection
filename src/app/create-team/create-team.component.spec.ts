import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamComponent } from './create-team.component';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTeamComponent ]
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
});

/*
1. json file corrupted
2. connection failure - after application is running stop node.js and test the res status code
3. json file length is < 11 
3. json file contains 1 wk
4. validation on save
5. should have mini 11 players and 1 wk
6. connection failure
7. 
*/