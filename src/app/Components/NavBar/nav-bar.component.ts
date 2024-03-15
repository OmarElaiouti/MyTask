import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../Services/Category/category.service';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  
constructor(private categoryServ:CategoryService,private authService:AuthService,private r:Router){}  
AthService=this.authService
  routes=[
    {
      path:'/Home',
    title:'Home'
    },
  {
    path:'/Cart',
    title:'Cart'
  },
  
        ]

ShowAll() {
  this.categoryServ.setSelectedCategory("all");
}



}
