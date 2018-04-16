import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef: BsModalRef;
  isNew : Boolean = true;
  constructor(private productService: ProductService, private modalService: BsModalService) { }

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
  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
          });
    }else{
      this.productService.patchProduct(form.value._id, form.value)
          .subscribe(data => {
            this.productService.getProducts();
            this.resetForm(form);
            this.modalRef.hide();
          })
    }
  }
  onDelete(_id : String){
    this.productService.deleteProduct(_id)
        .subscribe(x => {
          this.productService.getProducts();
          this.modalRef.hide();
        })
  }
}
