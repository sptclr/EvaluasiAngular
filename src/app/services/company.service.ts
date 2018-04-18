import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

@Injectable()
export class CompanyService {

  private _url = 'http://localhost:3000/api/companies'
  
  selectedCompany : Company;
  companyList : Company[];
 
  constructor(private http : Http) { }

  getCompanies(){
    this.http.get(this._url)
            .map((data: Response) => {
              return data.json() as Company[];
            }).toPromise().then(x => {
              this.companyList = x;
            })
  }

  getCompany(_id){
    this.http.get(this._url + '/' + _id)
            .map((data: Response) => {
              return data.json() as Company;
            }).toPromise().then(x => {
              this.selectedCompany = x;
            })
  }

  postCompany(company: Company){
    const body = JSON.stringify(company);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this._url, body, requestOptions)
               .map(x => x.json());
  }

  patchCompany(_id, company: Company){
    const data = JSON.stringify(company);
    
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Patch, headers: headerOptions});
    return this.http.patch(this._url + '/' + _id, company, requestOptions)
                    .map(x => x.json());
  }

  deleteCompany(_id){
    return this.http.delete(this._url + '/' + _id)
                    .map(x => x.json());
  }

  isDeleteCompany(_id) {
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    return this.http.put(this._url + '/' + _id, requestOptions)
                    .map(x => x.json());
  }

}
