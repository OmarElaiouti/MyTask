import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/Authentication/auth.service';

export const authGuard: CanActivateFn = (route, state) => {


  if (inject(AuthService).IsLoggedIn()) {
    console.log("hi from console true")
    return true; 
  } else {
    
    inject(Router).navigate(['/sign-in']);
    console.log("hi from console")
    return false; 
  }

};
