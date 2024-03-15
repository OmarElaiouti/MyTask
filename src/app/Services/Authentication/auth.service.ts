import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  userRole!: string;;
 

  constructor(private http: HttpClient) { }

  login() {
    // login logic here
    this.isLoggedIn = true;
  }

  logout() {
    // logout logic here
    this.isLoggedIn = false;
  }

  IsLoggedIn(): boolean {
    if(localStorage.getItem("id")){
      
      return true;
    }
    return this.isLoggedIn;
    
  }


  getUserRole(): string | undefined {
    return this.userRole;
  }


  setUserRole(role: string): void {
    this.userRole = role;
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  signIn(email: string, password: string): Observable<any> {
    const url = `http://localhost:3000/users`;
    return this.http.get<any[]>(url).pipe(
      map(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }
}
