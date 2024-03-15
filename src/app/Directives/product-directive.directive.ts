import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Colors } from '../Enums/Enums';
@Directive({
  selector: '[appProductDirective]',
  standalone: true
})
export class ProductDirectiveDirective {

  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style.boxShadow =
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px';
  }
  @HostListener('mouseout') onMouseOut() {
    this.elementRef.nativeElement.style.boxShadow = 'none';
  }
  addBorder(
    color: string,
    borderType: string = 'solid',
    borderWidth: string = '2px'
  ) {
    this.elementRef.nativeElement.style.border = `${borderWidth} ${borderType} ${color}`;
  }
  @Input() set appProductDirective(value: number) {
    if (value == 1) {
      this.addBorder(Colors.WARNING, 'dashed');
    } else if (value == 2) {
      this.addBorder(Colors.SUCCESS);
    } else if (value == 0) {
      this.addBorder(Colors.ERROR);
    } else {
      this.addBorder('black');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(
      elementRef.nativeElement,
      'transition-duration',
      '0.3s'
    );

}
}
