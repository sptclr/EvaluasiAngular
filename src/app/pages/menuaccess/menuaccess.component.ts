import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormArray } from "@angular/forms";
import * as _ from 'underscore';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { MenuaccessService } from "../../services/menuaccess.service";
import { Menuaccess } from "../../models/menuaccess.model";
import { RoleService } from '../../services/role.service';
import { MenuService } from '../../services/menu.service';
import { Role } from '../../models/role.model';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-menuaccess',
  templateUrl: './menuaccess.component.html',
  styleUrls: ['./menuaccess.component.css']
})
export class MenuaccessComponent implements OnInit {

  modalRef: BsModalRef;
  isNew: Boolean = true;
  form: FormGroup;
  checkIfOthersAreSelected: boolean;
  page: number = 1;
  

  constructor(
    private modalService: BsModalService,
    private _menuAccessService: MenuaccessService,
    private _roleService: RoleService,
    private _menuService: MenuService,
    private formbuilder: FormBuilder,
    private http: Http,
  ) { }



  ngOnInit() {
    this._menuAccessService.getMenuAccesses();
    this._roleService.getRoles();
    this._menuService.getMenus();
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.isNew = true
    this._menuAccessService.selectedMenuAccess = new Menuaccess();
    this._roleService.selectedRole = new Role();
    this._menuService.selectedMenu = new Menu();
  }//end reset


  // onSubmit(form?: NgForm) {
   
  //   // alert(JSON.stringify(form.value));
  //   if (form.value._id == null) {

  //     this._menuAccessService.postMenuAccess(form.value)
  //       .subscribe(data => {
  //         this._menuAccessService.getMenuAccesses();
  //         this.resetForm(form);
  //         this.modalRef.hide()
  //       });
  //   } else {
  //     this._menuAccessService.patchMenuAccess(form.value._id, form.value)
  //       .subscribe(data => {
  //         this._menuAccessService.getMenuAccesses();
  //         this.resetForm(form);
  //         this.modalRef.hide();
  //       })
  //   }
  // }//end submit

  onEdit(template: TemplateRef<any>, _id: String) {
    this.modalRef = this.modalService.show(template);  
    this._menuAccessService.getMenuAccess(_id);
  }//end edit

  onView(template: TemplateRef<any>, _id: String) {
    this._menuAccessService.getMenuAccess(_id);    
    this.modalRef = this.modalService.show(template);
  }//end onView

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }//end Open Modal

  onDelete(_id: String) {
    this._menuAccessService.putMenuAccess(_id)
      .subscribe(x => {
        this._menuAccessService.getMenuAccesses();
        this.modalRef.hide();
      });
  }//end delete


}//end class
