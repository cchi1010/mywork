import { Type } from '@angular/core';
import { PjKeyValue, PjFieldValue } from 'src/component/components.global';

export class PjDocumentSectionData {
  title?: string;
  titleSize?: string;
  description?: string;
  spaceBetweenTitleSection?: string;
  parameters?: Array<PjFieldValue>;
  backgoundColor?: string;
  arrangementType?: string;               // col 或者 row
  components?: Array<PjComponentData>;
}

export class PjComponentData {
  componentType?: Type<any>;
  directives?: Array<PjDirectiveData>;
  componentData?: PjKeyValue<any>;
  hasContent?: boolean;
}

export class PjDirectiveData {
  directiveType?: Type<any>;
  directiveData?: PjKeyValue<any>;
}