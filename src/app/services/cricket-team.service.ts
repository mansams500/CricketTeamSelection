import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent ,HttpHeaders,HttpParams} from "@angular/common/http";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'}
  )

export class CricketTeamService {
  ApplicationURL : any;

  constructor(private http: HttpClient,private httpobj : Http) {

  }
  saveTeam(Players_List,User_Id): Observable<any> {
     debugger;
     console.log(Players_List);
    const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

    const url = '/saveTeamDetails';
    //let reportStatusId = approve ? "3" : "4";

    return this.http.post(url, {
      "User_Id":User_Id,
      "Players_List":Players_List
    },
    {headers});
  }

   getAllPlayers()
   {
       return this.http.get('getAllPlayersList/'); 
   }

   checkUserExist(User_Id){
        //return this.http.get('checkUserTeamExist/'+ User_Id).pipe(map(res => res )); 
        return this.http.get('checkUserTeamExist/'+ User_Id); 
   }

   deleteTeam(User_ID){
        return this.http.get('deleteFile/'+User_ID); 
    }
 
  }



