import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../model/Product';
import {ProductsService} from '../../../services/products.service'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

  public formulario: FormGroup;
  product: Product;
  constructor(public fb: FormBuilder, private route:ActivatedRoute, private router: Router, private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      let id = params.id;
      this.rellenarFormulario();
      this.getProducto(id);
    });
  }

  getProducto(id) {
    this.productService.listarPorId(id).subscribe(
      (resp: any) => {
        this.product = resp.product;
        this.rellenarFormulario2(resp.product)
      }
    )
  }
  rellenarFormulario() {
    this.formulario = this.fb.group({
      id:[''],
      nombre: [''],
      tipo: [''],
      descripcion: ['']
    });
  }
  rellenarFormulario2(product) {
    this.formulario = this.fb.group({
      id: [product.id],
      nombre: [product.name],
      tipo: [product.type],
      descripcion: [product.description]
    });
  }

  obtenerValores() {
    var prod: Product = {
      id: this.formulario.get('id').value,
      name: this.formulario.get('nombre').value,
      type: this.formulario.get('tipo').value,
      description: this.formulario.get('descripcion').value
    }
    return prod;
  }

  actualizarDatos() {
    if (this.formulario.valid) {
      let producto = this.obtenerValores();
      this.productService.actualizarProducto(producto).subscribe(
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
        this.router.navigate(['/productos']);
      }
    })
  }
}
