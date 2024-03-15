import { Component, Output,EventEmitter, Input, OnInit } from '@angular/core';
import {ICourse} from '../../Models/ICourse';
import { SingleProductComponent } from "../SingleProduct/single-product.component";
import { CartComponent } from "../Cart/cart/cart.component";
import { CoursesService } from '../../Services/CourseService/courses-service.service';
import { CategoryService } from '../../Services/Category/category.service';
import { Subscription } from 'rxjs';
import { HighlightSearchQueryPipe } from '../../Pipes/highlight-search-query.pipe';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [SingleProductComponent, CartComponent,HighlightSearchQueryPipe ]
})
export class ProductsComponent implements OnInit {
  courses: any[] = [];
  mySubscription!: Subscription;

  constructor(private courseServ: CoursesService,private categoryServ: CategoryService) {}

  ngOnInit(): void {
    // Subscribe to selectedCategory$ to get notified when a category is selected
    this.mySubscription = this.categoryServ.selectedCategory$.subscribe(category => {
        if (category!='all') {
            
            this.courseServ.getAllCourses().subscribe({
                next: (courses: ICourse[]) => {
                    this.courses = courses.filter(c => c.category === category);
                },
                error: (err) => { 
                    console.error('Error fetching courses:', err);
                }
            });
        } else {
            this.courseServ.getSearchQuery().subscribe(s=>
                this.courseServ.getAllCourses().subscribe({
                next: (courses: ICourse[]) => {
                    this.courses = courses.filter
                    (course =>
                    course.name.toLowerCase().includes(s.toLowerCase()) ||
                    course.description.toLowerCase().includes(s.toLowerCase())
                    );
                },
                error: (err) => { 
                    console.error('Error fetching courses:', err);
                }
            })
            ) 
            
        }

        
    });
}
ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
  

  
  

