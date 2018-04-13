import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgForm } from "@angular/forms";

import { MenuaccessService } from "../../services/menuaccess.service";
import { Menuaccess } from "../../models/menuaccess.model";

@Component({
  selector: 'app-menuaccess',
  templateUrl: './menuaccess.component.html',
  styleUrls: ['./menuaccess.component.css']
})
export class MenuaccessComponent implements OnInit {
  
  modalRef: BsModalRef;
  isNew: Boolean = true;

  constructor(private _menuAccessService: MenuaccessService,
              private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.resetForm();
    this._menuAccessService.getMenuAccesses();
  }

  resetForm(form?: NgForm){
    if (form != null){
      form.reset();
    }
    this._menuAccessService.selectedMenuAccess = new Menuaccess();
  }//end reset

  onSubmit(form: NgForm){
    //alert(JSON.stringify(form.value));
    if(form.value._id == null){
      this._menuAccessService.postMenuAccess(form.value)
                            .subscribe(data => {
                              this._menuAccessService.getMenuAccesses();
                              this.resetForm(form);
                              this.modalRef.hide()
                            })
    } else{
      this._menuAccessService.patchMenuAccess(form.value._id, form.value)
                            .subscribe(data => {
                              this._menuAccessService.getMenuAccesses();
                              this.resetForm(form);
                              this.modalRef.hide();
                            })
    }
  }//end submit

  onEdit(template: TemplateRef<any>, _id: String){
    this._menuAccessService.getMenuAccess(_id);
    this.openModalEdit(template);
  }//end edit

  onDelete(_id){
    this._menuAccessService.deleteMenuAccess(_id)
        .subscribe(x => {
          this._menuAccessService.getMenuAccesses();
          this.modalRef.hide();
        })
  }//end delete

  onView(template: TemplateRef<any>, _id: String) {
    this._menuAccessService.getMenuAccess(_id);
    this.openModalView(template);
  }//end view

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }

  openModalView(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
