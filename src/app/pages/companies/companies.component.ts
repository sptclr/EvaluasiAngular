import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import { NgForm, FormGroup } from '@angular/forms';
import { Company } from '../../models/company.model';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  modalRef: BsModalRef;

  form: FormGroup;

  constructor(private companyService: CompanyService,
              private modalService: BsModalService,
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.resetForm();
    this.companyService.getCompanies();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.companyService.selectedCompany = new Company();
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    //alert(JSON.stringify(form.value));
    if (form.value._id == null) {
      this.companyService.postCompany(form.value)
        .subscribe(data => {
          this.companyService.getCompanies();
          this.resetForm(form);
          this.modalRef.hide();
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Data berhasil disimpan!!"],
            dismissible: true,
            timeout: false,
            type: 'success'
          })
        })
    } 
  }

  onView(template: TemplateRef<any>, _id: String) {
    this.modalRef = this.modalService.show(template);
    this.companyService.getCompany(_id);
  }

  //Edit
  onEdit(template: TemplateRef<any>, _id: String) {
    this.modalRef = this.modalService.show(template);
    this.companyService.getCompany(_id);
  }

  onUpdate(form: NgForm) {
    this.companyService.patchCompany(form.value._id, form.value)
      .subscribe(data => {
        this.companyService.getCompanies();
        this.resetForm(form);
        this.modalRef.hide();
      })
  }

  //Delete
  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // onDelete(_id) {
  //   this.companyService.deleteCompany(_id)
  //     .subscribe(x => {
  //       this.companyService.getCompanies();
  //       this.modalRef.hide();
  //     });
  // }
  onDelete(_id) {
    this.companyService.isDeleteCompany(_id)
      .subscribe(x => {
        this.companyService.getCompanies();
        this.modalRef.hide();
      });
  }


}