import { Component, OnInit,ViewChild } from '@angular/core';
import { map,startWith } from 'rxjs/operators';
import { Http } from '@angular/http';
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { CricketTeamService } from '../services/cricket-team.service'


@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  responseData : any;
  players : any;
  userList = [
  				{
  					"id" : 1,
  					"name" :'manasa'
  				},
  				{
  					"id" : 2,
  					"name" :'surya'
  				},
  				{
  					"id" : 3,
  					"name" :'deepa'
  				}
  			];
  
  bowlerList = [];
  batsmenList = [];
  keeperList = [];
  allrounderList = [];
  playersList = [];
  bowlerName : any;
  displayedColumns: string[];
  dataSource : any;
  listTitle : string;
  selectMode : boolean = false;
  userName : string;
  userID : number;


  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private http: Http,private _service : CricketTeamService) { 
	
	}

  ngOnInit() {
  	
  }
  
	initializePlayers() {
     debugger;
     this.responseData = this.getAllPlayers().subscribe(
      ResponseObj => {
        debugger;
        if(ResponseObj.length != 0){
     	   this.players = ResponseObj;
        	console.log("getAllAccessRoles");
        	console.log(this.players);
        	this.filterData(this.players); 
        	
        }
        else{
           	console.log("Json is empty");
           }     	        
      },	
       error => {console.log(error)});
  }
 getAllPlayers(){
    return this.http.get('getAllPlayersList/').pipe(map((res: any) => res.json())); 
  }

filterData(arrayData) {
	debugger;
    arrayData.filter(ob => {
    //console.log("Value:"+ ob.value);
    if (ob.categoryId === 101 ) {
		  this.batsmenList.push(ob);
    } 
    else if(ob.categoryId === 102){
    	this.bowlerList.push(ob);
    }
    else if(ob.categoryId === 103){
    	this.keeperList.push(ob);
    }
    else if(ob.categoryId === 104){
    	this.allrounderList.push(ob);
    }
   // console.log(this.res);
    });
    console.log(this.batsmenList);
    console.log(this.bowlerList);
    console.log(this.keeperList);
    console.log(this.allrounderList);
   }

   onChangeUsers(e){
   	this.selectMode = true;
   	this.userName = e.value["name"];
   	this.userID = e.value["name"];
   	this.initializePlayers();
   }

   onChangeCategoryList(e){
   	console.log(e.value);

   	updateClickCount('add');
   	if(this.playersList.length < 11){
	   this.playersList.push(e.value);
	   	this.initializeTable();
	   	//this.listTitle = findListNames(e.value["categoryId"]);
	   	if( e.value["categoryId"] == 101){
		   	removeFromArrayList(this.batsmenList,e.value["playerId"]);
		   	}
		   	else if( e.value["categoryId"] == 102){
		   		removeFromArrayList(this.bowlerList,e.value["playerId"]);
		   	}
		   	else if( e.value["categoryId"] == 103){
		   		removeFromArrayList(this.keeperList,e.value["playerId"]);
		   	}
		   	else if( e.value["categoryId"] == 104){
		   		removeFromArrayList(this.allrounderList,e.value["playerId"]);
		   	}
   		}
   }
  /* onChangeBowler(e){
   	console.log(e.value);
   	updateClickCount();
   	this.playersList.push(e.value);
   	this.initializeTable();
   	removeFromArrayList(this.bowlerList,e.value["playerId"]);
   }
   onChangeBatsmen(e){
   	console.log(e.value);
   	updateClickCount();
   	this.playersList.push(e.value);
   	this.initializeTable();
   		removeFromArrayList(this.batsmenList,e.value["playerId"]);
   }
   onChangeKeeper(e){
   	console.log(e.value);
   	updateClickCount();
   	this.playersList.push(e.value);
   	this.initializeTable();
   	removeFromArrayList(this.keeperList,e.value["playerId"]);
   	}
   onChangeAllRounder(e){
   	console.log(e.value);
   	updateClickCount();
   	this.playersList.push(e.value);
   	this.initializeTable();
   	removeFromArrayList(this.allrounderList,e.value["playerId"]);
   }*/

 	initializeTable(){
 		debugger;
 		this.displayedColumns = ['playerName','categoryName','action'];
 		//this.displayedColumns = this.columnNames.map(x => x.id);
 		this.dataSource = new MatTableDataSource(this.playersList);
 		this.dataSource.sort = this.sort;
 		
 	}
 	deletePlayers(e){
 		console.log(e);
 		/*this.listTitle = findListNames(e.value["categoryId"]);*/
 		updateClickCount('delete');
 		if(this.playersList.length > 0){
	 		if( e["categoryId"] == 101){
		   		this.batsmenList.push(e);
		   	}
		   	else if( e["categoryId"] == 102){
		   		this.bowlerList.push(e);
		   	}
		   	else if( e["categoryId"] == 103){
		   		this.keeperList.push(e);
		   	}
		   	else if( e["categoryId"] == 104){
		   		this.allrounderList.push(e);
		   	}
	   	
 		for(let i=0; i< this.playersList.length; i++){
 			if(this.playersList[i].playerId == e["playerId"]){
 				this.playersList.splice(i,1);
 				this.initializeTable();
 			}
 		}
 		//e.value["categoryName"].()
 		}
 	}

 	savePlayersData(){ 		
 		if(counter == 11){
 			var isKeeper = checkKeeper(this.playersList);
 		if(isKeeper){
	 		this._service.saveTeam(this.playersList,this.userID).subscribe(
	      response => {
	      	console.log(response);
	      	alert("Team saved sucessfully");
	      	this.playersList = [];
	      	this.selectMode = false;
	      },
	      error => {
	        console.log(error);
	        //alert(error.message);
	      });
 		}
 		else{
 			alert("There should be at least one Wicket Keeper in the Team");
 		}
 	}
 		else if(counter < 11){
 			alert("Players List cannot be less than 11 members");
 		}
 		else{
 			alert("Players List cannot be more than 11 members");
 		}
 	
 	}

}
var flagValue = false;
var counter = 0;
/* var updateClickCount = (function(type){
    var counter=0;

    return function(type){
    	if(counter >= 11){
    		alert("Cannot add more than 11 members");
    	}

    if(type == 'add'){
	    	if(counter >= 11){
	     	alert("Cannot add more than 11 members");

	     }   
	     else if(counter == 11){ flagValue = true;}   
	     else{
	     	++counter;
	     }
	    // do something with counter
	 }
	 else if(type == 'delete'){
	 	--counter;
	 }
	 console.log("Counter "+counter);
    }
})();*/


function updateClickCount(type){
	if(type == 'add'){
	    	if(counter >= 11){
	     	alert("Cannot add more than 11 members");
	     	return;
	     }   
	     else if(counter == 11){ flagValue = true;}   
	     else{
	     	++counter;
	     }
	    }
	 else if(type == 'delete'){
	 	--counter;
	 }
	 console.log("Counter "+counter);
}

var removeFromArrayList = function(listName,playerID){
	for(let i=0; i< listName.length; i++){
	   		if(listName[i].playerId == playerID){
	   			listName.splice(i,1);
	   		}
	   	}
}

var findListNames = function(listId){
	var title = ""; 
	if( listId == 101){
   		title = "batsmenList";
   	}
   	else if(listId == 102){
   		title = "bowlerList";
   	}
   	else if(listId== 103){
   		title = "keeperList";
   	}
   	else if(listId== 104){
   		title = "allrounderList";
   	}
   	return title;
}


function checkKeeper(list){
	var keeperflag = false;
	for(let i=0; i< list.length; i++){
	   		if(list[i].categoryId == 103){
	   			keeperflag = true;
	   		}
	   	}
	   	return keeperflag;
	
}