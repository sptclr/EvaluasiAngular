//khusus module
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

//khusus component
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  private _url = 'http://localhost:3000/api/products'
  selectedProduct : Product;
  productList : Product[];
  constructor(private http : Http) { }

  getProducts(){
    this.http.get(this._url)
            .map((data: Response) => {
              return data.json() as Product[];
            }).toPromise().then(x => {
              this.productList = x;
            })
  }

  getProduct(_id){
    this.http.get(this._url + '/' + _id)
            .map((data: Response) => {
              return data.json() as Product;
            }).toPromise().then(x => {
              this.selectedProduct = x;
            })
  }

  postProduct(product: Product){
    const body = JSON.stringify(product);
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});
    return this.http.post(this._url, body, requestOptions).map(x => x.json());
  }

  patchProduct(_id, product: Product){
    const headerOptions = new Headers({'Content-Type': 'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Patch, headers: headerOptions});
    return this.http.patch(this._url + '/' + _id, product, requestOptions).map(x => x.json());
  }

  isDeleteProduct(_id) {
    const headerOptions = new Headers({'Content-Type':'application/json'});
    const requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
    return this.http.put(this._url + '/'  + _id, requestOptions)
                    .map(x => x.json());
  }

  deleteProduct(_id){
    return this.http.delete(this._url + '/' + _id)
    .map(x => x.json());
  }

}

