import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  productos: Product [];
  constructor(private productService: ProductsService, public route: Router) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this.productService.listarProductos().subscribe(
      (resp: any) => {
        console.log(resp.product);
        this.productos = resp.product;
      },
      (error:any)=>{
        Swal.fire('ERROR!','No se pudo cargar la lista de productos','error');
      }
    )
  }

  eliminar(id) {
    this.productService.eliminarProducto(id).subscribe(
      (resp: any) => {
        Swal.fire(resp.titulo, resp.mensaje, resp.tipo).then((result) => {
      if (result.value) {
        this.route.navigate(['/productos']);
      }
    })  
      },
      (error:any)=>{
        Swal.fire('ERROR!','No se pudo cargar la lista de productos','error');
      }
    )
  }
}
