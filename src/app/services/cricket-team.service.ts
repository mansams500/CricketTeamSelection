import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent ,HttpHeaders,HttpParams} from "@angular/common/http";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'}
  )

export class CricketTeamService {
  API_URL = "http://localhost:3077";
  ApplicationURL : any;

  constructor(private http: HttpClient,private httpobj : Http) {

  }
  saveTeam(Players_List,User_Id): Observable<any> {
     debugger;
     console.log(Players_List);
    const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*");

    const url = `${this.API_URL}/saveTeamDetails`;
    //let reportStatusId = approve ? "3" : "4";

    return this.http.post(url, {
      "User_Id":User_Id,
      "Players_List":Players_List
    },
    {headers});
  }

 
  }



