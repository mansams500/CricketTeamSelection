import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {
	parentUserData :any;
	userList = [
  				{
  					"id" : 1,
  					"name" :'Manasa'
  				},
  				{
  					"id" : 2,
  					"name" :'Surya'
  				},
  				{
  					"id" : 3,
  					"name" :'Deepa'
  				}
  			];
  constructor(private router: Router) { }

  ngOnInit() {

  }

  onChangeUsers(e){
   	this.parentUserData = e;
   	 
   }

}
