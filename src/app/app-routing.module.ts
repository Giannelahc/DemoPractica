import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component'
import { LoginComponent } from './components/login/login.component'
import {ListadoComponent} from './components/listado/listado.component'
import { ProducRegistroComponent } from './components/product/produc-registro/produc-registro.component';
import { FormProductComponent } from './components/product/form-product/form-product.component';
import {SeguridadService} from './auth/seguridad.service'


const routes: Routes = [
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ListadoComponent,  canActivate: [SeguridadService]},
  { path: 'edit/:id', component: FormProductComponent, canActivate: [SeguridadService] },
  { path: 'registroProducto',component: ProducRegistroComponent, canActivate: [SeguridadService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
