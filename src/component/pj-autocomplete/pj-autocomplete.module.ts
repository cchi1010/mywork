
import { PjDirectiveModule } from '../../directive/pj-style-directive.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PjAutocompleteComponent } from './pj-autocomplete.component';
import { PjAutocompleteItemComponent } from './pj-autocomplete-item/pj-autocomplete-item.component';
import { PjAutocompleteEmptyComponent } from './pj-autocomplete-empty.component';
import { PjAutocompleteGroupComponent } from './pj-autocomplete-group.component';
import { PjDividerModule } from '../pj-divider/pj-divider.module';
import { PjImageModule } from '../pj-image/pj-image.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjSearchBarModule } from '../pj-search-bar/pj-search-bar.module';
import { PjImageData } from '../components.global';

@NgModule({
  declarations: [PjAutocompleteComponent, PjAutocompleteItemComponent, PjAutocompleteEmptyComponent, PjAutocompleteGroupComponent],
  imports: [CommonModule, PjDividerModule, PjDirectiveModule, PjImageModule, PjButtonModule, PjSearchBarModule],
  exports: [PjAutocompleteComponent, PjAutocompleteEmptyComponent, PjAutocompleteItemComponent, PjAutocompleteGroupComponent],
})
export class PjAutocompleteModule { }
