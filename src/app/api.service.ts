import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getdata(path:string){
    return this.http.get(path);
  }

  // setlocal(name:string, data:any){
  //   return localStorage.setItem("name",JSON.stringify(data));
  // }

  // getlocal(name:string){
  //   return JSON.parse(<any>localStorage.getItem(name))
  // }


}
