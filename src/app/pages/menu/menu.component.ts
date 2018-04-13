import { Component, OnInit, TemplateRef } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgForm} from '@angular/forms';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  modalRef : BsModalRef;
  isNew: Boolean = true;

  constructor(private menuService: MenuService, private modalService: BsModalService) { }

  ngOnInit() {
    this.resetForm();
    this.menuService.getMenus()
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.reset();
    }
    this.menuService.selectedMenu = new Menu();
  }

  openModal( template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (form.value._id == null) {
      this.menuService.postMenu(form.value)
        .subscribe(data => {
          this.menuService.getMenus();
          this.resetForm(form);
          this.modalRef.hide();
        })
    }else {
      this.menuService.patchMenu(form.value._id, form.value)
      .subscribe(data => {
        this.menuService.getMenus();
        this.resetForm(form);
        this.modalRef.hide();
      });
    }
  }

  onEdit(template: TemplateRef<any>, _id: String) {
    this.menuService.getMenu(_id)
    this.openModal(template);
    this.isNew = false;
  }

  onView(template: TemplateRef<any>, _id: String) {
    this.menuService.getMenu(_id);
    this.openModal(template);
    this.isNew = false;
  }

  onDelete(_id: String) {
    if (confirm('Are You Sure to delete this record?') === true){
      this.menuService.deleteMenu(_id)
        .subscribe(x => {
          this.menuService.getMenus();
        });
    }
  }
}
