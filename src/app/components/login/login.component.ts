import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formulario: FormGroup;
  eventsSubject: Subject<void> = new Subject<void>(); 

  constructor(public route: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    this.eventsSubject.next();
    if (this.formulario.valid) {
      var user = this.obtenerValores();
      this.loginService.inicioSesion(user).subscribe(
        (resp: any) => {
          this.redirigirLogin(resp);
      })
    } else {
      Swal.fire('¡INFO!','Complete los campos obligatorios para continuar','info');
    }
  }

  guardarForm(event: FormGroup) {
    this.formulario = event;
    }

  obtenerValores() {
    var user : User = {
      email: this.formulario.get('email').value,
      password: this.formulario.get('password').value
    }
    return user;
  }

  redirigirLogin(resp: any) {
    Swal.fire({
      title: resp.titulo,
      text: resp.mensaje,
      icon: resp.tipo,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ver productos'
    }).then((result) => {
      if (result.value) {
        this.route.navigate(['/productos']);
      }
    })
  }

}
