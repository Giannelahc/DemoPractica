import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public listarProductos() {
    let httpHeader = this.autorizacion(); console.log(httpHeader);
    return this.http.get(environment.urlApiRest + 'product',{ headers: httpHeader }).pipe(
      map(response => {
        return response;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public listarPorId(id) {
    let httpHeader = this.autorizacion();
    return this.http.get(environment.urlApiRest + 'product/'+id,{ headers: httpHeader }).pipe(
      map(response => {
        return response;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public registrarProducto(producto: Product) {
    let httpHeader = this.autorizacion();
    return this.http.post(environment.urlApiRest + 'product/register', producto,{ headers: httpHeader }).pipe(
      map(response => {
        return response;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public actualizarProducto(producto: Product) {
    let httpHeader = this.autorizacion();
    return this.http.put(environment.urlApiRest + 'product', producto,{ headers: httpHeader }).pipe(
      map(response => {
        return response;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public eliminarProducto(id) {
    let httpHeader = this.autorizacion();
    return this.http.delete(environment.urlApiRest + 'product/'+id,{ headers: httpHeader }).pipe(
      map(response => {
        return response;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  errorHandler(err: HttpErrorResponse) {
    if (err.status == 0) {
      Swal.fire('Error', environment.msg_servicio_no_disponible, 'error')
    } else {
      Swal.fire('Error ' + err.status + ' ' + err.error.mensaje, 'Detalles: ' + err.error.error, 'error');
    }
    return Observable.throw(err);
  }

  private autorizacion() {
    const httpHeaders = new HttpHeaders({
			'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    });
    return httpHeaders;
  }
}
