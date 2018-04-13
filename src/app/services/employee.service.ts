//khusus module
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//khusus component
@Injectable()
export class EmployeeService {

  private _url = 'http://localhost:3000/api/employees';

  selectedEmployee: Employee;
  employeeList: Employee[];
  constructor(private http: Http) { }

  getEmployees() {
    this.http.get(this._url)
    .map((data: Response) => {
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employeeList = x;
    });
  }

  getEmployee(_id: String) {
    this.http.get(this._url + '/' + _id)
    .map((data: Response) => {
      return data.json() as Employee;
    }).toPromise().then(x => {
      this.selectedEmployee = x;
    });
  }

  postEmployee( employee: Employee) {
    const body = JSON.stringify(employee);
    const headerOptions = new Headers({'Content-Type':'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this._url,body,requestOptions).map(x => x.json());
  }

  patchEmployee(_id, employee: Employee) {
    const headerOptions = new Headers({'Content-Type':'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Patch, headers: headerOptions});
    return this.http.patch(this._url + _id , employee, requestOptions).map(x => x.json());
  }

  deleteEmployee(_id) {
    return this.http.delete(this._url + '/' + _id).map(x => x.json());
  }
}
