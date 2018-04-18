import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Company } from '../../models/company.model';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  modalRef: BsModalRef;
  isNew : Boolean = true;
  

constructor(private _employeeService: EmployeeService, 
            private modalService: BsModalService, 
            private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.resetForm();
    this._employeeService.getEmployees();
    this._employeeService.getCompanies();
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.reset();
    }
    this.isNew = true;
    this._employeeService.selectedEmployee = new Employee();
    this._employeeService.selectedCompany = new Company();
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
        this.modalRef.hide();
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Data Saved!! New Employee has been Added"],
          dismissible: true,
          timeout: false,
          type: 'success'
        })
      });
    }
    else{
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
    this.openModalEdit(template);
    this.ngFlashMessageService.showFlashMessage({
      messages: ["Data Updated!! Data employee has been updated"],
      dismissible: true,
      timeout: false,
      type: 'success'
    })
    
  }

  onView(template: TemplateRef<any>, _id: String) {
    this._employeeService.getEmployee(_id);
    this.openModalView(template);
  }

  onDelete(_id: String, employee: any){
    //alert(JSON.stringify(employee));
    employee.isDelete=true;
    if (confirm('Are you sure to delete this?') === true) {
      this._employeeService.isDeleteEmployee(_id, employee)
      .subscribe(x => {
        this._employeeService.getEmployees();
        this.ngFlashMessageService.showFlashMessage({
          messages: ["Data Deleted!!"],
          dismissible: true,
          timeout: false,
          type: 'success'
        })
      });
      
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
