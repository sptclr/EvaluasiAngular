import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef: BsModalRef;
  isNew : Boolean = true;
  constructor(private productService: ProductService, 
              private modalService: BsModalService,
              private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
    this.resetForm();
    this.productService.getProducts();
  }
  resetForm(form?: NgForm){
    if (form != null){
      form.reset();
    }
    this.isNew = true;
    this.productService.selectedProduct = new Product();
  }
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }
  onEdit(template: TemplateRef<any>, _id : String){
    this.productService.getProduct(_id);
    this.openModal(template);
    this.isNew = false;
  }
  onSubmit(form: NgForm){
    if(form.value._id == null){
      this.productService.postProduct(form.value)
          .subscribe(data => {
            this.productService.getProducts();
            this.resetForm(form);
            this.modalRef.hide();
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Data berhasil disimpan!!"],
              dismissible: true,
              timeout: false,
              type: 'success'
            })
          });
    }else{
      this.productService.patchProduct(form.value._id, form.value)
          .subscribe(data => {
            this.productService.getProducts();
            this.resetForm(form);
            this.modalRef.hide();
            this.ngFlashMessageService.showFlashMessage({
              messages: ["Data berhasil diubah!!"],
              dismissible: true,
              timeout: false,
              type: 'success'
            })
          })
    }
  }
  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onDelete(_id){
    //if ( confirm('Are you sure to delete this record?') === true) {
    this.productService.isDeleteProduct(_id)
        .subscribe(x => {
          this.productService.getProducts();
          this.modalRef.hide();
          this.ngFlashMessageService.showFlashMessage({
            messages: ["Data berhasil dihapus!!"],
            dismissible: true,
            timeout: false,
            type: 'success'
          })
        })
    //}
  }
}
