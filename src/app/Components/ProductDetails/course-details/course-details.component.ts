import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../Services/CourseService/courses-service.service';
import { ICourse } from '../../../Models/ICourse';
import { AuthService } from '../../../Services/Authentication/auth.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  disable:boolean = false
  disable1:boolean = false

  course!: ICourse;
  constructor(private route: ActivatedRoute, 
    private coursesServ: CoursesService, 
    private r: Router, 
    private authService: AuthService) { }
  AthService=this.authService

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      const Id = courseId?+courseId:1
      this.coursesServ.getCourseByID(Id).subscribe({
        next: (course)=>{
          this.course=course;
          this.checkIfPreviousCourseExists();
          this.checkIfNextCourseExists();


        },
        error: (err) => { 
          console.error('Error fetching courses:', err);
        }
      })
    });
  }
  checkIfNextCourseExists(): void {
    if (this.course) {
      this.coursesServ.getNextCourseId(this.course.id).subscribe({
        next: (nextId) => {
          this.disable1 = nextId === this.course.id;
        },
        error: (err) => {
          console.error('Error checking previous course ID:', err);
        }
      });
    }
  }
  goToNextCourse(): void {
    if (this.course) {
      this.coursesServ.getNextCourseId(this.course.id).subscribe({
        next: (nextId) => {

          this.r.navigate(['courses', nextId]);
        },
        error: (err) => {
          console.error('Error getting next course ID:', err);
        }
      });
    }
  }
  checkIfPreviousCourseExists(): void {
    if (this.course) {
      this.coursesServ.getPrevCourseId(this.course.id).subscribe({
        next: (prevId) => {
          this.disable = prevId === this.course.id;
        },
        error: (err) => {
          console.error('Error checking previous course ID:', err);
        }
      });
    }
  }

  goToPreviousCourse(): void {
    if (this.course) {
      this.coursesServ.getPrevCourseId(this.course.id).subscribe({
        next: (prevId) => {

          this.r.navigate(['courses', prevId]);
        },
        error: (err) => {
          console.error('Error getting previous course ID:', err);
        }
      });
    }
  }

  editProduct(): void {
    this.r.navigate(['/Edit', this.course.id]); 
  }

}


