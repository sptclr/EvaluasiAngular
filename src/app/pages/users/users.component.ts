import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { UserService} from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { EmployeeService } from '../../services/employee.service'

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm, Validator, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User} from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  modalRef : BsModalRef;
  isNew: Boolean = true;

  constructor(private userService: UserService,
              private roleService: RoleService,
              private employeeService: EmployeeService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this.userService.getUsers()
    this.roleService.getRoles()
    this.employeeService.getEmployees()
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.reset();
    }
    this.isNew = true;
    this.userService.selectedUser = new User();
  }

  openModal( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (form.value._id == null) {
      this.userService.postUser(form.value)
        .subscribe(data => {
          this.userService.getUsers();
          this.resetForm(form);
          this.modalRef.hide();
        })
    }else {
      this.userService.patchUser(form.value._id, form.value)
        .subscribe(data => {
          this.userService.getUsers();
          this.resetForm(form);
          this.modalRef.hide();
      });
    }
  }

  onEdit(template: TemplateRef<any>, _id: String) {
    this.userService.getUser(_id);
    this.openModal(template);
    this.isNew = false;
  }

  onView(template: TemplateRef<any>, _id: String) {
    this.userService.getUser(_id);
    this.openModal(template);
    this.isNew = false;
  }

  onDelete(_id: String) {
    if ( confirm('Are You Sure to delete thid record?') === true) {
      this.userService.deleteUser(_id)
        .subscribe(x => {
          this.userService.getUsers();
        });
    }
  }
}
