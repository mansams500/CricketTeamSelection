import { Component, OnInit,ViewChild, Input  } from '@angular/core';
import { map,startWith } from 'rxjs/operators';
import { Http } from '@angular/http';
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { CricketTeamService } from '../services/cricket-team.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
    selector: 'app-create-team',
    templateUrl: './create-team.component.html',
    styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

    responseData : any;
    players : any;
    editedPlayer = [];

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
    editMode :boolean = false;

    @Input() childUserData: any;


    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: Http,private _service : CricketTeamService,public toastr: ToastrManager,) { 

    }

    ngOnInit() {

    }

    ngOnChanges(){
        if(this.childUserData != undefined){
            this.reset();
            this.checkUserTeamExists(this.childUserData.value['name']);
            this.userID = this.childUserData.value['name'];
        }

    }

    checkUserTeamExists(userName){
        this.responseData = this._service.checkUserExist(userName).subscribe(
            ResponseObj => { 
                
                if(ResponseObj["status"] == false){
                    this.editMode = false;
                    this.initializePlayers();

                }
                else {
                    this.playersList = ResponseObj["result"].sort(this.GetSortOrder("playerId"));
                    this.selectMode = true;
                    this.editMode = true;
                    this.initializeTable(this.playersList);
                    this.manipulatedata()
                }

            },  
            error => {
                console.log(error);

            });
    }

    manipulatedata(){
        var tempdata = [];
        this.responseData = this._service.getAllPlayers().subscribe(
            ResponseObj => {
                this.players = ResponseObj["result"];
                if( this.players.length > 0 ) { 

                    tempdata = subtractArrays(this.players,this.playersList);
                    
                }
                this.players = tempdata;

                this.filterData(this.players);

            },  
            error => {
                console.log(error);

            });
    }


    initializePlayers() {
        this.responseData = this._service.getAllPlayers().subscribe(
            ResponseObj => {
                if(ResponseObj["result"].length >= 11){
                    let valid = this.checkKeeper(ResponseObj["result"])
                    if(valid){
                        this.players = ResponseObj["result"];  
                        this.selectMode = true;
                        this.filterData(this.players); 
                    }
                    else{
                        this.toastr.errorToastr("There are no Wicket Keepers in the Players list","Error");
                    }
                }
                else{
                    this.toastr.errorToastr("Players list is less than expected(minimum 11 players)","Error");
                }     	        
            },	
            error => {
                switch(error.status){
                    case 400 :
                    this.toastr.errorToastr("JSON File Corrupted","Error");  
                    break;

                    case 500 :
                    this.toastr.errorToastr("JSON File not","Error");   
                    break;
                    default :
                    this.toastr.errorToastr("Server error!! Please try again later","Error");
                }
            });

    }


    filterData(arrayData) {
        arrayData.filter(ob => {
            switch(ob.categoryId){
                case 101 :
                this.batsmenList.push(ob);
                break;            
                case 102 :
                this.bowlerList.push(ob);
                break;

                case 103 :
                this.keeperList.push(ob);
                break;
                case 104 :
                this.allrounderList.push(ob);
                break;
            }

        });
        
    }

    onChangeUsers(e){
        this.userName = e.value["name"];
        this.userID = e.value["name"];
        this.initializePlayers();
    }

    onChangeCategoryList(e){
        
        updateClickCount('add');
        if(this.playersList.length < 11){
            this.playersList.push(e.value);
            this.initializeTable(this.playersList);
            switch(e.value["categoryId"]){
                case 101 :   
                removeFromArrayList(this.batsmenList,e.value["playerId"]);
                break;
                case 102 :
                removeFromArrayList(this.bowlerList,e.value["playerId"]);
                break;
                case 103 :
                removeFromArrayList(this.keeperList,e.value["playerId"]);
                break;
                case 104 :
                removeFromArrayList(this.allrounderList,e.value["playerId"]);
                break;
            }
        }
    }

    initializeTable(list){
        this.displayedColumns = ['position','playerName','categoryName','action'];

        this.dataSource = new MatTableDataSource(list);
        this.dataSource.sort = this.sort;

    }
    deletePlayers(e){
        updateClickCount('delete');
        if(this.playersList.length > 0){

            switch(e["categoryId"]){
                case 101 : 
                this.batsmenList.push(e);
                break;
                case 102 : 
                this.bowlerList.push(e);
                break;
                case 103 : 
                this.keeperList.push(e);
                break;
                case 104 : 
                this.allrounderList.push(e);
                break;

            }

            for(let i=0; i< this.playersList.length; i++){
                if(this.playersList[i].playerId == e["playerId"]){
                    this.toastr.successToastr(this.playersList[i].playerName +" deleted sucessfully from the team list","Sucess");
                    this.playersList.splice(i,1);
                    this.initializeTable(this.playersList);
                }
            }
          

        }
    }

    savePlayersData(){ 		
        if(this.playersList.length == 11){
            var isKeeper = this.checkKeeper(this.playersList);
            if(isKeeper){
                this._service.saveTeam(this.playersList,this.userID).subscribe(
                    response => {
                        this.toastr.successToastr("Team saved sucessfully","Sucess");
                        this.playersList = [];
                        this.selectMode = false;
                        setTimeout(() => { window.location.reload(); }, 1000);
                    },
                    error => {
                        console.log(error);

                    });
            }
            else{
                this.toastr.errorToastr("There should be at least one Wicket Keeper in the Team","Error");
            }
        }
        else if(counter < 11){
            this.toastr.errorToastr("Players List cannot be less than 11 members","Error");
        }
        else{
            this.toastr.errorToastr("Players List cannot be more than 11 members","Error");
        }

    }

    checkKeeper(list){
        var keeperflag = false;
        for(let i=0; i< list.length; i++){
            if(list[i].categoryId == 103){
                keeperflag = true;
            }
        }
        return keeperflag;

    }

    reset(){
        this.players = [];
        this.bowlerList = [];
        this.batsmenList = [];
        this.keeperList = [];
        this.allrounderList = [];
        this.playersList = [];
        this.initializeTable(this.playersList);

    }

    deleteUserList() {
        this.responseData = this._service.deleteTeam(this.userID).subscribe(
            ResponseObj => {
                this.reset();
                this.initializePlayers();
                this.toastr.successToastr("Team deleted Sucessfully","Sucess");
                setTimeout(() => { window.location.reload(); }, 1000);

            },  
            error => {
                console.log(error);
                this.toastr.errorToastr("Server Error !!","Error");

            });
    }

    GetSortOrder(prop) {  
        return function(a, b) {  
            if (a[prop] > b[prop]) {  
                return 1;  
            } else if (a[prop] < b[prop]) {  
                return -1;  
            }  
            return 0;  
        }  
    }
}


var flagValue = false;
var counter = 0;

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


function subtractArrays(a1, a2) {
    var arr = [];
    a1.forEach((o1) => {
        var found = false;
        a2.forEach((o2) => {
            if (objectsEqual(o1, o2)) {
                found = true;
            }  
        });
        if (!found) {
            arr.push(o1);
        }
    })
    console.log("Subtracted List " + arr)
    return arr;
}

function  objectsEqual(o1, o2) {
    return o1.playerId === o2.playerId
}
