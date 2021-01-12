import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate() {
    if (this.loginService.onsession())
      return true;
    else
      this.router.navigate(['/login'])
  }
}
