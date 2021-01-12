import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/User';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public seguridadCambio: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  public inicioSesion(user: User) {
    let url = environment.urlApiRest + 'auth/login';
    return this.http.post(url,user).pipe(
      map((resp: any) => {
        sessionStorage.setItem("token", resp.token);
        this.seguridadCambio.next(true);
        return resp;
      }),
      catchError((err: HttpErrorResponse) => this.errorHanlder(err))
    )
  }

  public onsession() {
    if (sessionStorage.getItem('token') != null)
      return true;
    else return false;
  }

  public logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.seguridadCambio.next(false);
    this.router.navigateByUrl('/login');
  }

  private errorHanlder(err: HttpErrorResponse) {
		if (err.status == 0) {
			Swal.fire('ERROR', environment.msg_servicio_no_disponible, 'error');
		} else {
			Swal.fire('ERROR', err.error.error_description, 'error');
		}
		return Observable.throw(err);
	}
}
