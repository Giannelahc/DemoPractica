import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produc-registro',
  templateUrl: '../form-product/form-product.component.html',
  styleUrls: ['./produc-registro.component.css']
})
export class ProducRegistroComponent implements OnInit {

  public formulario: FormGroup;

  constructor(public fb: FormBuilder,private productService: ProductsService,private route: Router) { }

  ngOnInit(): void {
    this.rellenarFormulario();
  }

  rellenarFormulario() {
    this.formulario = this.fb.group({
      nombre: [''],
      tipo: [''],
      descripcion: ['']
    });
  }
  
   obtenerValores() {
    var prod : Product = {
      name: this.formulario.get('nombre').value,
      type: this.formulario.get('tipo').value,
      description: this.formulario.get('descripcion').value
    }
    return prod;
   }
  
  actualizarDatos() {
    if (this.formulario.valid) {
      let producto = this.obtenerValores();
      this.productService.registrarProducto(producto).subscribe(
        (resp: any) => {
          this.redirigirLogin(resp);
        }
      )
    }
  }

  redirigirLogin(resp: any) {
    Swal.fire({
      title: resp.titulo,
      text: resp.mensaje,
      icon: resp.tipo,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        this.route.navigate(['/productos']);
      }
    })
  }
}
