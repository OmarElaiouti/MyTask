import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICategory } from '../../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedCategorySubject = new BehaviorSubject<string>('all');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/categories`);
  }
  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }
  
}
