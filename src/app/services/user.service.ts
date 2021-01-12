import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import {User} from '../model/User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: User) {
    return this.http.post(environment.urlApiRest + 'register', usuario).pipe(
      map(obj => {
        return obj;
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
}
