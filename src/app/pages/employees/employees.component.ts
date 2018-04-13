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

  onDelete(_id: String){
    if (confirm('Are you sure to delete this?') === true) {
      this._employeeService.deleteEmployee(_id)
      .subscribe(x => {
        this._employeeService.getEmployees();
      });
    }
  }

}
