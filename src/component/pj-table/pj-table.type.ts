import { PjDropdownItem } from '../components.global';

export interface PjTabelCheckedItem {
  row: any,
  selected: boolean,
  curPage?: number,
  pageSize?: number
}

export interface PjTabelButtonClick {
  action?: string;
  row?: any;
}
export interface PjTabelTextEntryChange {
  text?: string;
  dataName?: string;
  row?: any;
  dataType?: string;
  arrayIndex?: number;
}
export interface PjTabelIcons {
  firstIcon?: string;
  secondIcon?: string;
  label?: string;
  leftIconName?: string;
  dropdown?: Array<PjDropdownItem>;
}
export interface PjTabelHeaderChange {
  oldName: string,
  newName: string
}
export interface PjTabelFooterChange {
  curPageNum: number,
  curPageSize: number
}

export const PJ_TABLE_BUTTONACTION_CONST = {
  HISTORY: 'History',
  EDIT: 'Edit',
  CHECK: 'check',
  CHECKLIST: 'checklist',
  SHOWVARIANT: 'showVariant',
  DELETE:'delete',
  HIDEVARIANT: 'hideVariant',
  ADDNEWCOLUMN: 'addNewColumn',
  DELETECOLUMN: 'delete-column',
  TEXTINPUTBUTTON:'textinputButton',
};

