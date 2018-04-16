import { Component, OnInit, TemplateRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Role } from '../../models/role.model';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private _roleService: RoleService,
              private modalService: BsModalService,
              private flashMessage: FlashMessage) { }

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

  onSubmit(form: NgForm) {
    //alert(JSON.stringify(form.value));
    if (form.value._id == null) {
      this._roleService.postRole(form.value)
        .subscribe(data => {
          this._roleService.getRoles();
          this.resetForm(form);
          this.modalRef.hide();
          this.flashMessage.success('Success message');
        })
    }
  }
  
  onView(template: TemplateRef<any>, _id: String) {
    this.modalRef = this.modalService.show(template);
    this._roleService.getRole(_id);
  }

  //Edit
  onEdit(template: TemplateRef<any>, _id: String) {
    this.modalRef = this.modalService.show(template);
    this._roleService.getRole(_id);
  }

  onUpdate(form: NgForm) {
    this._roleService.patchRole(form.value._id, form.value)
      .subscribe(data => {
        this._roleService.getRoles();
        this.resetForm(form);
        this.modalRef.hide();
      })
  }

  //Delete
  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // onDelete(_id) {
  //   this._roleService.deleteRole(_id)
  //     .subscribe(x => {
  //       this._roleService.getRoles();
  //       this.modalRef.hide();
  //     });
  // }
  onDelete(_id) {
    this._roleService.isDeleteRole(_id)
      .subscribe(x => {
        this._roleService.getRoles();
        this.modalRef.hide();
      });
  }


}