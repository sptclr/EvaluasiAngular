//khusus module
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//khusus component
import { Role } from '../models/role.model';

@Injectable()
export class RoleService {

  private _url = "http://localhost:3000/api/roles";

  selectedRole : Role;
  roleList : Role[];

  constructor(private http : Http) { }

  getRoles() {
    this.http.get(this._url)
      .map((data: Response) => {
        return data.json() as Role[];
      }).toPromise().then(x => {
        this.roleList = x;
      });
  }

  getRole(_id: String) {
    this.http.get(this._url + '/' + _id)
      .map((data: Response) => {
        return data.json() as Role;
      }).toPromise().then(x => {
        this.selectedRole = x;
      });
  }

  postRole(role: Role) {
    const body = JSON.stringify(role);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this._url, body, requestOptions)
                    .map(x => x.json());
  }

  patchRole(_id, role: Role) {
    const data = JSON.stringify(role);
    
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Patch, headers: headerOptions});
    return this.http.patch(this._url + '/' + _id, role, requestOptions)
                    .map(x => x.json());
  }

  deleteRole(_id) {
    return this.http.delete(this._url + '/' + _id)
                    .map(x => x.json());
  }

}

