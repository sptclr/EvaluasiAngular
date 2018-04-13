//Khusus Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

//module http
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { routingComponents } from './app-routing.module';

//Component Parent
import { AppComponent } from './app.component';

//Khusus Component Tambahan / Child
import { CompaniesComponent } from './pages/companies/companies.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuaccessComponent } from './pages/menuaccess/menuaccess.component';
import { RolesComponent } from './pages/roles/roles.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';

//Khusus Service component
import { EmployeeService } from './services/employee.service';
import { MenuService } from './services/menu.service';
import { MenuaccessService } from './services/menuaccess.service';
import { ProductService } from './services/product.service';
import { RoleService } from './services/role.service';
import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    ProductsComponent,
    MenuaccessComponent,
    RolesComponent,
    MenuComponent,
    EmployeesComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        //service
        EmployeeService,
        MenuService,
        MenuaccessService,
        ProductService,
        RoleService,
        CompanyService,
        UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
