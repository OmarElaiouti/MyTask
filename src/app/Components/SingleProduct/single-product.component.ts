import { Component, Input } from '@angular/core';
import { ICourse } from '../../Models/ICourse';
import { ProductDirectiveDirective } from '../../Directives/product-directive.directive';
import { CurrencyPipe  } from '@angular/common';
import { ICategory } from '../../Models/ICategory';
import categories from '../../../assets/categories';
import { Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../Services/CourseService/courses-service.service';
import { UserService } from '../../Services/User/user.service';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [ProductDirectiveDirective,CurrencyPipe,RouterModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  @Input() course!:ICourse
 
  constructor(private router:Router,
    private userServ:UserService,
    private authService:AuthService,
    private courseService:CoursesService
    ){}
 AthService=this.authService

  incrementStudents(): void {
    this.course.enrolled_students++;
  }

  addToCart(course:ICourse,event:Event): void {
  event.stopPropagation();
    let num = Number(localStorage.getItem('id'));
    console.log(num)
    this.userServ.addItemToCart(num, course).subscribe({
      next: (course) => {
        console.log('Item added to cart:', course);
        this.router.navigate(["/Cart"]);

      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
      }
    });

  }

  RouteCourse(){
    const id =this.course.id
    this.router.navigate(['/courses', id]);    
  }

  DeleteCourse(course:ICourse,event:Event){
    this.courseService.DeleteCourse(course).subscribe({
      next: ()=>{
        this.router.navigate(["/Home"]);
        alert("Deleted successfully")
      }
    })
  }
}
