import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICourse } from '../../../Models/ICourse';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../Services/CourseService/courses-service.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  courseId!: number;
  course!: ICourse;

  constructor(private route: ActivatedRoute, private router: Router, private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      const Id = courseId?+courseId:1
      this.courseId = Id;
      this.getCourseDetails(Id);
    });
  }

  getCourseDetails(courseId: number): void {
    this.coursesService.getCourseByID(courseId).subscribe({
      next: (course: ICourse) => {
        this.course = course;
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
      }
    });
  }

  updateCourse(): void {
    this.coursesService.updateCourse(this.course).subscribe({
      next: () => {
        alert('Course updated successfully');

        this.router.navigate(['/courses', this.courseId]);
      },
      error: (err) => {
        console.error('Error updating course:', err);
      }
    });
  }
}
