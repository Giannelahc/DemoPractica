import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  autenticado: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
     this.loginService.seguridadCambio.subscribe(status => {
       this.autenticado = status;
     })
  }

  cerrarSesion() {
    this.loginService.logout();
  }

}
