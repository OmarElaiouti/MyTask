import { Component, Input } from '@angular/core';
import{ProductsComponent} from '../Products/products.component'
import { CartComponent } from "../Cart/cart/cart.component";

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    imports: [ProductsComponent, CartComponent]
})
export class ContentComponent {

 
  
}
