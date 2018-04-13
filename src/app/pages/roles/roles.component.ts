import { Component, OnInit, TemplateRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  modalRef: BsModalRef;
  isNew: Boolean = true;

  constructor(private _roleService: RoleService, private modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this._roleService.getRoles();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this._roleService.selectedRole = new Role();
  }

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

  onView(template: TemplateRef<any>, _id: String) {
    this._roleService.getRole(_id);
    this.openModalView(template);
  }

  onSubmit(form: NgForm) {
    //alert(JSON.stringify(form.value));
    if (form.value._id == null) {
      this._roleService.postRole(form.value)
        .subscribe(data => {
          this._roleService.getRoles();
          this.resetForm(form);
          this.modalRef.hide();
        })
    } else {
      this._roleService.patchRole(form.value._id, form.value)
        .subscribe(data => {
          this._roleService.getRoles();
          this.resetForm(form);
          this.modalRef.hide();
        })
    }
  }

  onEdit(template: TemplateRef<any>, _id: String) {
    //alert(JSON.stringify(category));
    this._roleService.getRole(_id);
    this.openModalEdit(template);
  }

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onDelete(_id) {
    this._roleService.deleteRole(_id)
      .subscribe(x => {
        this._roleService.getRoles();
        this.modalRef.hide();
      });
  }

}