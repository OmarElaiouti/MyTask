import { Component } from '@angular/core';
import { ICourse } from '../../../Models/ICourse';
import { CoursesService } from '../../../Services/CourseService/courses-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcourse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.css'
})
export class AddcourseComponent {
  newCourse: ICourse = {
    id: 0,
    name: '',
    price: 0,
    category: '',
    description: '',
    instructor: '',
    enrolled_students: 0
  };

  constructor(private courseService: CoursesService, private router: Router) {}

  addCourse() {
    this.courseService.addCourse(this.newCourse).subscribe({
      next: (course) => {
        console.log('Course added successfully:', course);
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Error adding course:', err);
      }
    });
  }
}
