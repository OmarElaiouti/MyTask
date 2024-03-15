import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../Models/IUser';
import { Observable, map, mergeMap, of } from 'rxjs';
import { ICourse } from '../../Models/ICourse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Fetch user data by ID
  getUserById(userId: number): Observable<IUser> {
    return this.http.get<any>(`http://localhost:3000/users/${userId}`);
  }

  // Update user data (including cart) by ID
  updateUser(userId: number, userData: IUser): Observable<IUser> {
    return this.http.put<any>(`http://localhost:3000/users/${userId}`, userData);
  }

  // Add item to user's cart
  addItemToCart(userId: number, course: ICourse): Observable<IUser> {
    return this.getUserById(userId).pipe(
      mergeMap((user: IUser) => {

        user.cart.push(course);

        return this.updateUser(userId, user);
      })
    );
  }

  removeFromCart(userId: number, course: ICourse): void {
    this.getUserById(userId).subscribe({
      next: (user) => {
        user.cart = user.cart.filter(c => c.id !== course.id);
        this.updateUser(userId, user).subscribe({
          next: () => {
            console.log('Course removed from cart successfully');
          },
          error: (error) => {
            console.error('Error updating user after removing course from cart:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching user for removing course from cart:', error);
      }
    });
  }

  
}
