import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../Models/ICategory';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../Services/Category/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../Services/CourseService/courses-service.service';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  categories!: ICategory[];
  searchQuery: string = '';

  constructor(private courseServ:CoursesService, 
    private categoryServ:CategoryService,
    private r: Router,
    private authService:AuthService){
  }
  AthService=this.authService
  ngOnInit(): void {
this.categoryServ.getAllCategories().subscribe({
  next: (categories)=>{
    this.categories=categories;
  },
  error: (err)=>{
    console.log(err)
  }  
});
}

ShowCourseByCategory(category: string) {
  this.categoryServ.setSelectedCategory(category);
  this.r.navigate(["/Home"]);
}

onSearchInputChange(event: any): void {
  const searchQuery = event.target.value;
  this.courseServ.setSearchQuery(searchQuery);
}

logout(): void {
  if(confirm("Are you sure you want to logout?")==true){
    localStorage.removeItem("id")
     this.authService.logout();
     this.authService.setUserRole("");

  }else{
    this.r.navigate(['/Home'])
  }

}

}
