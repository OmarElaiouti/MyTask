import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../../Models/ICourse';
import { CoursesService } from '../../../Services/CourseService/courses-service.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../Services/User/user.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: ICourse[] = [];
  totalPrice: number = 0;
  userId!:number;
  cartSubscription!: Subscription;

  constructor(private userService: UserService,private router:Router ) { }

  ngOnInit(): void {
    // Retrieve the logged-in user's ID from localStorage
    this.userId = Number(localStorage.getItem('id'));

      this.cartSubscription = this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.cartItems = user.cart;
          this.calculateTotalPrice();
        },
        error: (error) => {
          console.error('Error fetching cart items:', error);
        }
      });
  
    
  }
 

  calculateTotalPrice(): void {

    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  DeleteFromCart(course: ICourse): void {
    this.userService.removeFromCart(this.userId,course);
    this.cartItems = this.cartItems.filter(item => item.id !== course.id);
    this.calculateTotalPrice();

     
}

}

