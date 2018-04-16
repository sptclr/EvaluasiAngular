import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  modalRef: BsModalRef;
  isNew : Boolean = true;

constructor(private _employeeService: EmployeeService, private modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this._employeeService.getEmployees();
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.reset();
    }
    this.isNew = true;
    this._employeeService.selectedEmployee = new Employee();
  }
  
  openModal(template: TemplateRef<any>) {
    this.resetForm();
    this.modalRef = this.modalService.show(template);
  }

  onSubmit(form: NgForm){
    //alert(JSON.stringify);
    if (form.value._id == null) {
      this._employeeService.postEmployee(form.value)
      .subscribe(data => {
        this._employeeService.getEmployees();
        this.resetForm(form);
        // this.modalRef.hide();
      });
    }
    else {
      this._employeeService.patchEmployee(form.value._id, form.value)
      .subscribe(data => {
        this._employeeService.getEmployees();
        this.resetForm(form);
        this.modalRef.hide();
      });
    }
  }

  onEdit(template: TemplateRef<any>, _id: String) {
    this._employeeService.getEmployee(_id);
    this.openModal(template);
    this.isNew = false;
  }

  onView(template: TemplateRef<any>, _id: String) {
    this._employeeService.getEmployee(_id);
    this.openModalView(template);
  }

  onDelete(_id: String, form: NgForm){
    if (confirm('Are you sure to delete this?') === true) {
      this._employeeService.isDeleteEmployee(_id)
      .subscribe(x => {
        this._employeeService.getEmployees();
      });
      // form.value.isDelete=true;
      // this._employeeService.patchEmployee(_id, form.value)
      // .subscribe(data => {
      //   this._employeeService.getEmployees();
      // });
    }
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

}
