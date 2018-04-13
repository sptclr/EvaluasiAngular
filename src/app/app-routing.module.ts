//khusus module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

//khusus component
import { HomeComponent } from './pages/home/home.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuaccessComponent } from './pages/menuaccess/menuaccess.component';
import { ProductsComponent } from './pages/products/products.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';
import { CompaniesComponent } from './pages/companies/companies.component';


const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'menuaccess', component: MenuaccessComponent},
  { path: 'product', component: ProductsComponent},
  { path: 'role', component: RolesComponent},
  { path: 'user', component: UsersComponent},
  { path: 'company', component: CompaniesComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

export const routingComponents = [
            HomeComponent,
            EmployeesComponent,
            MenuaccessComponent,
            MenuComponent,
            CompaniesComponent,
            ProductsComponent,
            UsersComponent,
            RolesComponent,
]
