import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchQuery',
  standalone: true
})
export class HighlightSearchQueryPipe implements PipeTransform {

  transform(value: string, searchQuery: string): string {
    if (!searchQuery) {
      return value;
    }
    const regExp = new RegExp(searchQuery, 'gi');
    return value.replace(regExp, match => `<span class="highlight">${match}</span>`);
  }
}
