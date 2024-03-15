import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/Authentication/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  
  constructor(private authService: AuthService,private router:Router) {}

  signIn() {
    this.authService.signIn(this.email, this.password)
      .subscribe({
        next: (response) => {
          if(response){
          alert('Sign-in successfully');
          this.authService.login();
          localStorage.setItem("id",JSON.parse(response.id))
          this.authService.setUserRole(response.role);
          this.router.navigate(["/Home"]);
        }
        else{
          alert("Wrong email or password")
        }

        },
        error: (err) => {
          alert('Sign-in failed:');
        }
});
  }
}
