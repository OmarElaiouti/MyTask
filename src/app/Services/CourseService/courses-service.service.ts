import { Injectable } from '@angular/core';
import { ICourse } from '../../Models/ICourse';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  coursesCart!:ICourse[];
  private searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getCouesesByCategoryName(catName: string): Observable<any[]> {
    const url = `http://localhost:3000/courses?Category=${catName}`;
    return this.http.get<any[]>(url);
  }


  getAllCourses(): Observable<any[]> {
    const url = `http://localhost:3000/courses`;
    return this.http.get<any[]>(url);
  }

  getCourseByID(cID: number): Observable<any> {
    const url = `http://localhost:3000/courses/${cID}`;
    return this.http.get<any>(url);
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    const url = `http://localhost:3000/courses/${course.id}`;
    return this.http.put<any>(url, course);
  }

  addCourse(course: any): Observable<any> {
    const url = `http://localhost:3000/courses`;
    return this.http.post<any>(url, course);
  }


  getNextCourseId(currentCourseId: number): Observable<number> {
    return this.getAllCourses().pipe(
      map(courses => {
        const currentIndex = courses.findIndex(course => course.id === currentCourseId);
        return currentIndex !== -1 && currentIndex < courses.length - 1 ? courses[currentIndex + 1].id : currentCourseId;
      })
    );
  }

  getPrevCourseId(currentCourseId: number): Observable<number> {
    return this.getAllCourses().pipe(
      map(courses => {
        const currentIndex = courses.findIndex(course => course.id === currentCourseId);
        return currentIndex !== -1 && currentIndex > 0 ? courses[currentIndex - 1].id : currentCourseId;
      })
    );
  }

  addCourseToCart(course: ICourse) {
    
    this.coursesCart.push(course);
  }

  DeleteCourse(course: ICourse): Observable<void> {
    const url = `http://localhost:3000/courses/${course.id}`;
    return this.http.delete<void>(url);
  }

  

  setSearchQuery(searchQuery: string): void {
    this.searchQuerySubject.next(searchQuery);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }
}
