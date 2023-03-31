import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // Recherche sur libelle de la catégorie
  transform(items: any[], term: string): any[] {
    if (!items) return [];
    if (!term) return items;
    term = term.toLowerCase();
    return items.filter(item => {
      return item.libelle.toLowerCase().includes(term);
    });
  }

}
