//khusus module
import { Injectable } from '@angular/core';
import { User} from '../models/user.model';
import { Role} from '../models/role.model';
import { Employee } from '../models/employee.model';
import { HttpClient} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//khusus component
@Injectable()
export class UserService {

  private _url = 'http://localhost:3000/api/users';
  private _url1 = 'http://localhost:3000/api/roles';
  private _url2 = 'http://localhost:3000/api/employees';

  selectedUser: User;
  userList: User [];
  selectedRole: Role;
  roleList: Role [];
  selectedEmployee : Employee;
  employeeList: Employee [];
  constructor(private http: Http) { }

  getUsers() {
    this.http.get(this._url)
    .map((data: Response) => {
      return data.json() as User[];
    }).toPromise().then(x => {
      this.userList = x;
    });
  }

  getRoles() {
    this.http.get(this._url1)
    .map((data: Response) => {
      return data.json() as Role[];
    }).toPromise().then(x => {
      this.roleList = x;
    });
  }

  getEmployees() {
    this.http.get(this._url2)
    .map((data: Response) => {
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employeeList = x;
    });
  }

  getUser(_id: String) {
    this.http.get(this._url + '/' + _id)
    .map((data: Response) => {
      return data.json() as User;
    }).toPromise().then(x => {
      this.selectedUser = x;
    });
  }

  postUser(user: User) {
    const body = JSON.stringify(user);
    const headerOptions = new Headers({ 'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post(this._url, body, requestOptions).map(x => x.json());
  }

  patchUser(_id, user: User) {
    const body = JSON.stringify(user);
    const headerOptions = new Headers({ 'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({ method: RequestMethod.Patch, headers: headerOptions });
    return this.http.patch(this._url + '/' + _id, user, requestOptions).map(x => x.json());
  }

  deleteUser(_id) {
    return this.http.delete(this._url + '/' + _id).map(x => x.json());
  }

  isDeleteUser(_id) {
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    return this.http.put(this._url + '/' + _id, requestOptions).map(x => x.json());
  }

}
