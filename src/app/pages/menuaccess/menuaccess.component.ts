import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import * as _ from 'underscore';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { MenuaccessService } from "../../services/menuaccess.service";
import { PaginationService } from "../../services/pagination.service";
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

  constructor(
    private modalService: BsModalService,
    private _menuAccessService: MenuaccessService,
    private _roleService: RoleService,
    private _menuService: MenuService,
    private formbuilder: FormBuilder,
    private http: Http,
    private pagerService: PaginationService,
  ) { }

  //Pagination
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  ngOnInit() {
    this._menuAccessService.getMenuAccesses();
    this._roleService.getRoles();
    this._menuService.getMenus();
    this.resetForm();

    // get dummy data
    this.http.get('http://localhost:3000/api/menuaccesses')
      .map((response: Response) => response.json())
      .subscribe(data => {
        // set items to json response
        this.allItems = data;
        // initialize to page 1
        this.setPage(1);
      });

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

  onSubmit(form?: NgForm) {
    //alert(JSON.stringify(form.value));
    if (form.value._id == null) {
      this._menuAccessService.postMenuAccess(form.value)
        .subscribe(data => {
          this._menuAccessService.getMenuAccesses();
          this.resetForm(form);
          this.modalRef.hide()
        });
    } else {
      this._menuAccessService.patchMenuAccess(form.value._id, form.value)
        .subscribe(data => {
          this._menuAccessService.getMenuAccesses();
          this.resetForm(form);
          this.modalRef.hide();
        })
    }
  }//end submit

  onEdit(template: TemplateRef<any>, _id: String) {
    this._menuAccessService.getMenuAccess(_id);
  }//end edit

  onView(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
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

  //pagination
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }//end pagination

}
