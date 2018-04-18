import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompanyService } from '../../services/company.service';
import { NgForm } from '@angular/forms';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  modalRef: BsModalRef;
  isNew : Boolean = true;
  constructor(private companyService: CompanyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this.companyService.getCompanies();
  }
  resetForm(form?: NgForm){
    if (form != null){
      form.reset();
    }
    this.isNew = true;
    this.companyService.selectedCompany = new Company();
  }
  // open modal
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }
  onEdit(templateEdit: TemplateRef<any>, _id : String){
    this.companyService.getCompany(_id);
    this.openModal(templateEdit);
    this.isNew = false;
  }

  onView(templateView: TemplateRef<any>, _id : String){
    this.companyService.getCompany(_id);
    this.openModal(templateView);
    this.isNew = false;
  }

  onSubmit(form: NgForm){
    if(form.value._id == null){
      this.companyService.postCompany(form.value)
          .subscribe(data => {
            this.companyService.getCompanies();
            this.resetForm(form);
            this.modalRef.hide();
          });
    }else{
      this.companyService.patchCompany(form.value._id, form.value)
          .subscribe(data => {
            this.companyService.getCompanies();
            this.resetForm(form);
            this.modalRef.hide();
          })
    }
  }
  onDelete(_id : String){
    if(confirm('Are you sure want to delete this record?') === true){
      this.companyService.deleteCompany(_id)
          .subscribe(x => {
            this.companyService.getCompanies();
          })
    }
  }

}
