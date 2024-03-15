import { Routes } from '@angular/router';
import { ContentComponent } from './Components/Content/content.component';
import { CartComponent } from './Components/Cart/cart/cart.component';
import { CourseDetailsComponent } from './Components/ProductDetails/course-details/course-details.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { AddcourseComponent } from './Components/AddCourse/addcourse/addcourse.component';
import { EditCourseComponent } from './Components/EditCourse/edit-course/edit-course.component';

export const routes: Routes = [
    { path: 'Home', component: ContentComponent},
    { path: 'Cart', component: CartComponent ,canActivate:[authGuard]},
    { path: 'sign-in', component: LoginComponent },
    { path: 'add-course', component: AddcourseComponent },
    { path: 'Edit/:id', component: EditCourseComponent },
    { path: 'courses/:id', component: CourseDetailsComponent },
    { path: '**', redirectTo: '' },

    
];
