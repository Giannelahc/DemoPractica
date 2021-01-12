import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup} from '@angular/forms';
import { User } from 'src/app/model/User';
import Swal from 'sweetalert2';
import { UserService} from '../../services/user.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public formulario: FormGroup;
  eventsSubject: Subject<void> = new Subject<void>(); 

  constructor(public route: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  guardarDatos() {
    this.eventsSubject.next();
    if (this.formulario.valid) {
      var user = this.obtenerValores();
      this.userService.registrarUsuario(user).subscribe(
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
      password: this.formulario.get('password').value,
      enabled: true,
      role: {
        authority : "ROLE_USER"
      }
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
      confirmButtonText: 'Iniciar sesión'
    }).then((result) => {
      if (result.value) {
        this.route.navigate(['/login']);
      }
    })
  }
}
