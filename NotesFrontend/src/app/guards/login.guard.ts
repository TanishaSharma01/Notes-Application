import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { RegisterService } from '../services/register.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggedinGuard implements CanActivate {
  constructor(private authService: RegisterService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // User is logged in, allow access
    } else {
      this.router.navigate(['/login']); // User is not logged in, navigate to the login page
      return false; // Prevent access to the route
    }
  }
}
