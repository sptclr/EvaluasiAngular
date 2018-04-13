//khusus module
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';
import { HttpClient } from  '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//khusus component

@Injectable()
export class MenuService {

  private _url = 'http://localhost:3000/api/menus';

  selectedMenu: Menu;
  menuList: Menu [];
  constructor(private http: Http) { }

  getMenus() {
    this.http.get(this._url)
    .map((data: Response) => {
      return data.json() as Menu[];
    }).toPromise().then(x => {
      this.menuList = x;
    });
  }

  getMenu(_id: String) {
    this.http.get(this._url + '/' + _id)
    .map((data: Response) => {
      return data.json() as Menu;
    }).toPromise().then(x => {
      this.selectedMenu = x;
    });
  }

  postMenu(menu: Menu) {
    const body = JSON.stringify(menu);
    const headerOptions = new Headers({ 'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this._url, body, requestOptions).map(x => x.json());
  }

  patchMenu(_id, menu : Menu) {
    const body = JSON.stringify(menu);
    const headerOptions = new Headers({ 'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({ method: RequestMethod.Patch, headers: headerOptions});
    return this.http.patch(this._url + '/' + _id,menu, requestOptions).map(x => x.json());
  }

  deleteMenu(_id) {
    return this.http.delete(this._url + '/' + _id).map(x => x.json());
  }
}
