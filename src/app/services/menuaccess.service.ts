//khusus module
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Http, Response, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

//khusus component
import { Menuaccess } from '../models/menuaccess.model';

@Injectable()
export class MenuaccessService {

  private _url = "http://localhost:3000/api/menuaccesses";

  selectedMenuAccess: Menuaccess;
  selectedMenuAccessList: Menuaccess[];

  constructor(private http: Http) { }

  getMenuAccesses(){
    this.http.get(this._url)
        .map((data: Response) => {
          return data.json() as Menuaccess[];
        }).toPromise().then(x => {
          this.selectedMenuAccessList = x;
        })
  }//end get all

  postMenuAccess(menuaccess: Menuaccess){
    const body = JSON.stringify(menuaccess);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this._url, body, requestOptions)
                    .map(x => x.json());
  }//end post

  getMenuAccess(_id : String){
    this.http.get(this._url + '/' + _id)
             .map((data: Response) => {
               return data.json() as Menuaccess;
             }).toPromise().then(x => {
               this.selectedMenuAccess = x;
             })
  }//end get by id

  patchMenuAccess(_id, menuaccess: Menuaccess){
    const data = JSON.stringify(menuaccess);
    const headerOptions = new Headers({'Content-Type' : 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Patch, headers: headerOptions});
    return this.http.patch(this._url + '/' + _id, menuaccess, requestOptions)
                  .map(x => x.json())
  }//end patch menu access

  deleteMenuAccess(_id){
    return this.http.delete(this._url + '/' + _id)
                  .map(x => x.json())
  }//end delete

}//end class MenuAccessService
