import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnDataStruct, HasStringValue, KeyValueObjectHasValue, NgFormValidator, PJ_COMPONENT_STYLE, PjCheckboxItem, PjImageTypeConst, PjKeyValue, PjProperty, isTrue } from 'src/component/components.global';
import { PjDropdownItem } from 'src/component/components.global';
import { PJ_TABLE_BUTTONACTION_CONST, PjTabelButtonClick, PjTabelCheckedItem, PjTabelTextEntryChange } from 'src/component/pj-table/pj-table.type';
import { Attachment, FileInfo, MoneyInfo } from 'src/model/base.model';
import { HelperService } from 'src/service/helper.service';
import { PjTabelFooterChange, PjTabelHeaderChange } from './pj-table.type';
import { PJ_TABLE_COMPONENT_CONST } from 'src/ammall/am-model/ammall-seller.data';

@Component({
  selector: 'pj-table',
  templateUrl: './pj-table.component.html',
  styleUrls: ['./pj-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PjTableComponent implements OnInit, OnChanges {
  private imageSize = 56;
  private _imageType = PjImageTypeConst.RECTANGLE;
  private _checkboxItems: Array<PjCheckboxItem> = [];

  @Input()
  columnHeader?: Array<ColumnDataStruct>;

  @Input()
  totalPages?: number;

  @Input()
  totalRecords?: number;

  @Input()
  rows: any[] = [];

  @Input()
  rowCommonInfo?: PjKeyValue<any>;

  @Input()
  height?: number =400;

  @Output()
  textEntryButAction = new EventEmitter<PjTabelButtonClick>();

  @Output()
  headerChange = new EventEmitter<PjTabelHeaderChange>();

  @Output()
  footerChange = new EventEmitter<PjTabelFooterChange>();

  @Output()
  iconAction = new EventEmitter<PjTabelButtonClick>();

  @Output()
  checkedItem = new EventEmitter<PjTabelCheckedItem>()

  @Output()
  textEntryChange = new EventEmitter<PjTabelTextEntryChange>()

  @ViewChild(DatatableComponent)
  table?: DatatableComponent;

  allThisPageRowsChecked: boolean = false;
  priceMistakes: boolean[] = [];
  minpriceMistakes: boolean[] = [];
  priceMistakesInfo: string[] = [];
  minpriceMistakesInfo: string[] = [];
  ColumnMode = ColumnMode;

  private _initFlag: boolean = false;
  hasCheckIconColumn: boolean = false;
  hasActionColumn: boolean = false;
  addCommonItemFlag: boolean = false;
  headerFormControl: Map<string, FormControl<string | null>> = new Map();
  pageFormControl?: FormControl<string | null>;
  tablePageSize = 50;
  currentPageNum = 1;       // 当前页码，从1开始
  priceFormControl?: FormControl<number | null>;

  ngOnInit(): void {
    this.tablePageSize = this.rowCommonInfo?.['totalNumOnOnePage'] || 50;
    this.pageFormControl = new FormControl(this.table?.offset.toString() || '1');
  }
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this._initFlag && this.columnHeader) {
      this._initFlag = true;
      this.columnHeader.sort((e1, e2) => {
        return (e1.columnNo || 0) - (e2.columnNo || 0);
      });

      this.columnHeader?.forEach(item => {
        if (item.dataType === "tableCheckIcon") {
          this.hasCheckIconColumn = true;
        }
      });

      this.columnHeader?.forEach(item => {
        if (item.dataType === "tableAction") {
          this.hasActionColumn = true;
        }
      });

      for (let i = 0; i < this.rows.length; i++) {
        this.priceMistakes[i] = false;
        this.minpriceMistakes[i] = false;
        this.priceMistakesInfo[i] = '';
        this.minpriceMistakesInfo[i] = '';
      }

      for (let i = 0; i < this.columnHeader.length; i++) {
        this._checkboxItems.push({
          label: this.columnHeader[i]['columnTitle'] || "",
          value: i.toString(),
          checked: this.columnHeader[i]['show'] || true
        });
      }

    }
    this.columnHeader?.forEach(column => {
      if (column.headerChangeable && column.columnTitle != undefined) {
        this.headerFormControl?.set(column.columnTitle, new FormControl(column.columnTitle || '', [Validators.required]));
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJPERFIXINPUT)) {
        this.rows.forEach(row => {
          if ((column.dataName != null
          ) && (row[column.dataName] != null)) {

            row[column.dataName + 'Formcontrol'] = new FormControl(
              parseFloat(row[column.dataName].amount).toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
          }
        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJTEXTEDIT)) {
        this.rows.forEach(row => {
          if ((column.dataName != null) && (row[column.dataName] != null)) {
            row[column.dataName + 'Formcontrol'] = new FormControl('', [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
            row[column.dataName + 'Formcontrol'].setValue(row[column.dataName]);
            row[column.dataName + 'Edit'] = false;
          }
        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJINPUTAUTOFILLCLICKTOEDIT)) {
        this.rows.forEach(row => {
          if (this.rowCommonInfo?.['addUndefinedInput']) {
            if (column.dataName != null) {
              row[column.dataName + 'Formcontrol'] = new FormControl(
                parseFloat(row[column.dataName].amount).toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
            }
          } else {
            if ((column.dataName != null) && (row[column.dataName] != null)) {
              row[column.dataName + 'Formcontrol'] = new FormControl(
                parseFloat(row[column.dataName].amount).toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
            }
          }
        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.SHOWINPUT)) {
        this.rows.forEach(row => {
          if (this.rowCommonInfo?.['addUndefinedInput']) {
            if (column.dataName != null) {
              if (!column.canBeUndefined) {
                row[column.dataName + 'Formcontrol'] = new FormControl(
                  row[column.dataName] || '', [NgFormValidator.requiredAndMaxLength(column.maxLength || 32)]);
              }else{
                row[column.dataName + 'Formcontrol'] = new FormControl(
                  row[column.dataName] || '', [NgFormValidator.maxLength(column.maxLength || 32, 'Maxlength limitation')]);
              }
            }
          } else {
            if ((column.dataName != null) && (row[column.dataName] != null)) {
              if (!column.canBeUndefined) {
                row[column.dataName + 'Formcontrol'] = new FormControl(
                  row[column.dataName] || '', [NgFormValidator.requiredAndMaxLength(column.maxLength || 32)]);
              }else{
                row[column.dataName + 'Formcontrol'] = new FormControl(
                  row[column.dataName] || '', [NgFormValidator.maxLength(column.maxLength || 32, 'Maxlength limitation')]);
              }

            }
          }

        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PERFIXEDINPUTDATACELL)) {
        this.rows.forEach(row => {
          if (this.rowCommonInfo?.['addUndefinedInput']) {
            if (column.dataName != null) {
              if (column.mustBeDefined) {
                if (column.dataType != null && column.dataType == 'MoneyInfo') {
                  if (row[column.dataName] != null) {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      parseFloat(row[column.dataName]?.amount).toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
                  } else {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      '', [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
                  }

                } else {
                  if (row[column.dataName] != null) {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      parseFloat(row[column.dataName])?.toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
                  } else {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      '', [Validators.required, NgFormValidator.priceValueGreatThan(0)]);
                  }
                }
              } else {
                if (column.dataType != null && column.dataType == 'MoneyInfo') {
                  if (row[column.dataName] != null) {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      parseFloat(row[column.dataName]?.amount)?.toFixed(2), [NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                  } else {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      '', [NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                  }
                } else {
                  if (row[column.dataName] != null) {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      parseFloat(row[column.dataName])?.toFixed(2), [NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                  } else {
                    row[column.dataName + 'Formcontrol'] = new FormControl(
                      '', [NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                  }
                }
              }

            }
          } else {
            if ((column.dataName != null) && (row[column.dataName] != null)) {
              if (column.mustBeDefined) {
                if (column.dataType != null && column.dataType == 'MoneyInfo') {
                  row[column.dataName + 'Formcontrol'] = new FormControl(
                    parseFloat(row[column.dataName]?.amount).toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                } else {
                  row[column.dataName + 'Formcontrol'] = new FormControl(
                    parseFloat(row[column.dataName]).toFixed(2), [Validators.required, NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                }
              } else {
                if (column.dataType != null && column.dataType == 'MoneyInfo') {
                  row[column.dataName + 'Formcontrol'] = new FormControl(
                    parseFloat(row[column.dataName]?.amount).toFixed(2), [NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                } else {
                  row[column.dataName + 'Formcontrol'] = new FormControl(
                    parseFloat(row[column.dataName]).toFixed(2), [NgFormValidator.priceValueGreatThanOrEmpty(0)]);
                }
              }
            }
          }

        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJCLICKTOEDIT)) {
        this.rows.forEach(row => {
          if ((column.dataName != undefined) && (row[column.dataName] != undefined)) {


            if (column.dataType != undefined && column.dataType.includes('Array')) {
              if (column.arrayIndex != undefined) {
                row[column.dataName + column.arrayIndex.toString() + 'Formcontrol'] = new FormControl();
                row[column.dataName + column.arrayIndex.toString() + 'Formcontrol'].setValue(row[column.dataName][column.arrayIndex]);
                row[column.dataName + column.arrayIndex.toString() + 'Edit'] = false;
              }
            } else {
              row[column.dataName + 'Formcontrol'] = new FormControl();
              row[column.dataName + 'Formcontrol'].setValue(row[column.dataName]);
              row[column.dataName + 'Edit'] = false;
            }


          }
          // row[column.dataName + 'Edit'] = false;
        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJMAPSHOW)) {
        this.rows.forEach(row => {
          if ((column.dataName != undefined) && (row[column.dataName] != undefined)) {
            row[column.dataName + 'map'] = Array.from(row[column.dataName], ([key, value]) => ({ key, value }));
            // row[column.dataName + 'map'].forEach(e => {
            //   if (e.value == 'Click to edit' || e.value == 'Create a value')
            //     e.value = '';
            // });
          }
        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJTREECOLUMN)) {
        this.rows.forEach(row => {
          if (column.dataName != undefined) {
            if (KeyValueObjectHasValue(row[column.dataName])) {
              row.treeStatus = 'collapsed';
            } else {
              row.treeStatus = 'disabled';
            }
          }
        })
      }
      if (column.columnComponent?.includes(PJ_TABLE_COMPONENT_CONST.PJVARIENT)) {
        this.rows.forEach(row => {
          if (column.dataName != undefined) {
            row.showVarient = false;
          }
        })
      }
    })
    this._initialShowColum();
  }
  getTreeFromRelation(): string {
    return this.rowCommonInfo?.['treeFromRelation'] || '';
  }

  getTreeToRelation(): string {
    return this.rowCommonInfo?.['treeToRelation'] || '';
  }

  getRows(): any[] {
    if (this.rows == null || this.rows.length == 0) {
      return [];
    }
    if (!this.addCommonItemFlag && this.hasActionColumn) {
      this.addActionCommonItem(this.rowCommonInfo?.["actionInCommon"]);
      this.addCommonItemFlag = true;
    }
    this.rows = [...this.rows];
    return this.rows;
  }

  showHistory(thisRow: any): void {
    this.iconAction.emit({ row: thisRow, action: 'history' });
  }

  private showColumn?: Array<ColumnDataStruct>;
  private _initialShowColum(): void {
    this.showColumn = JSON.parse(JSON.stringify(this.columnHeader));
    // this.showColumn=[...this.columnHeader||[]];
    this.showColumn?.forEach((item, index) => {
      if (item.columnTitle === "checkIcon" || item.show == false) {
        this.showColumn?.splice(index, 1);
      }
    });
  }

  getColumns(): Array<ColumnDataStruct> | undefined {
    if (this.showColumn == null) {
      this._initialShowColum();
    }
    return this.showColumn;
  }

  isTreeColumn(item: ColumnDataStruct): boolean {
    return item.isTreeColumn || false;
  }


  addProperties(newPropertiesTitle: string, newProperties: any): void {
    this.rows.forEach(function (eachItem) {
      eachItem[newPropertiesTitle] = newProperties;
    })
  }

  addActionCommonItem(newItem: any[]): void {
    this.rows?.forEach(function (eachItem) {
      eachItem["action"].splice(0, 0, ...newItem);
    });
  }

  hasCheckIcon(): boolean {
    return this.hasCheckIconColumn;
  }
  hasRowCheckIcon(thisRow: any): boolean {
    // return !thisRow.belongsTo;
    return !(thisRow.checked == null);
  }

  isPjImage(columeItem?: string): boolean {
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJIMAGE;
  }
  isPjButtonIcon(columeItem?: string): boolean {
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJBUTTONICON;
  }
  isVariant(thisRow: any, dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    } else if (thisRow[dataName] == null) {
      return false;
    }
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJVARIENT;
  }

  showWarning(thisRow: any, dataName?: string): boolean {
    if (dataName == null) {
      return false;
    } else if (thisRow[dataName] == null) {
      return false;
    }

    return isTrue(thisRow[dataName]);
  }

  isPjPerfixInputAndButton(thisRow: any, dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    } else if (thisRow[dataName] == null) {
      return false;
    }
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJPERFIXINPUTBUTTON;
  }

  isPjPerfixInput(thisRow: any, dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    } else if (thisRow[dataName] == null) {
      return false;
    }
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJPERFIXINPUT;
  }
  getPlaceHolder(): string {
    return this.rowCommonInfo?.['placeHolder'] || 'Click to edit';
  }
  isShowInput(thisRow: any, dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    } else if (thisRow[dataName] == null && !this.rowCommonInfo?.['addUndefinedInput']) {
      return false;
    }
    return columeItem === PJ_TABLE_COMPONENT_CONST.SHOWINPUT;
  }
  isLinkGeneric(columeItem?: string): boolean {
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJLINKGENERIC;
  }
  isLinkGenericWarning(columeItem?: string): boolean {
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJLINKGENERICWARNING;
  }
  isTwoLinesText(columeItem?: string): boolean {
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJTWOLINESTEXT;
  }

  isPjBandge(thisRow: any, dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    } else if (!thisRow[dataName]) {
      return false;
    }
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJBADGE;
  }
  isTableTreeColumn(dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    }
    return columeItem === PJ_TABLE_COMPONENT_CONST.PJTREECOLUMN;
  }
  isElse(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.NONE;
  }
  isPjTextEdit(thisRow?: any, columeItem?: string, dataName?: string): boolean {
    if (dataName == null) {
      return false
    } else if (thisRow[dataName] == null) {
      return false;
    }
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJTEXTEDIT;
  }
  isPjClickToEdit(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJCLICKTOEDIT;
  }
  isPjAutofillClickToEdit(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJAUTOFILLCLICKTOEDIT;
  }
  isAmInputChip(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.AMINPUTCHIPCELL;
  }
  isPerfixedInputDataCell(columeItem?: string, thisRow?: any): boolean {
    const hideSituation = this.rowCommonInfo?.['hideSituation'];
    const hidden = !thisRow[hideSituation];
    // const hidden=!thisRow['hasVariant'];
    return columeItem == PJ_TABLE_COMPONENT_CONST.PERFIXEDINPUTDATACELL && hidden;
  }

  isPjInputAutofillClickToEdit(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJINPUTAUTOFILLCLICKTOEDIT;
  }


  isPjImageUpload(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJIMAGEUPLOAD;
  }
  isPjImageUploadDelete(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJIMAGEUPLOADDELETE;
  }
  isPjImageUploadDropdown(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJIMAGEUPLOADDROPDOWN;
  }
  isAmProgressCircle(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.AMPROGRESSCIRCLE;
  }
  isAmProgressCircleText(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.AMPROGRESSCIRCLETEXT;
  }

  isPjButtonIconGroup(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJBUTTONICONGROUP;
  }
  isPjMapShow(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.PJMAPSHOW;
  }
  isPjDateTimeAmPm(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.DATETIMEAMPM;
  }
  isDateTime(columeItem?: string): boolean {
    return columeItem == PJ_TABLE_COMPONENT_CONST.DATETIME;
  }


  isShortLine(thisRow: any, dataName?: string, columeItem?: string): boolean {
    if (dataName == null) {
      return false;
    } else if ((!thisRow[dataName]) && (columeItem === PJ_TABLE_COMPONENT_CONST.PJBADGE || columeItem === PJ_TABLE_COMPONENT_CONST.PJTEXTENTRY || columeItem === PJ_TABLE_COMPONENT_CONST.PJTEXTENTRYBUTTON)) {
      return true;
    }
    return false;
  }



  getIconForSecondButton(row: any, colName?: string): string {
    if (colName != undefined && row[colName].secondIcon != 'more_vert') {
      return row[colName].secondIcon;
    }
    return '';
  }
  getIconForFirstButton(row: any, colName?: string): string {
    if (colName != undefined && row[colName].firstIcon != 'more_vert') {
      return row[colName].firstIcon;
    }
    return '';
  }
  getPercentage(row: any, colName?: string): number {
    if (colName != undefined) {
      return Math.floor(row[colName]) || 0;
    }
    return 0;
  }
  isNone(row: any, colName?: string): boolean {
    if (colName != undefined && row[colName] == 'None') {
      return true;
    }
    return false;
  }
  hasSecondButtonIcon(row: any, colName?: string): boolean {
    if (colName != undefined &&row[colName]==undefined){
      return false;
    }
    if (colName != undefined && row[colName].secondIcon != undefined && row[colName].secondIcon != 'more_vert') {
      return true;
    }
    return false;
  }

  hasButton(row: any, colName?: string): boolean {
    if (colName != undefined &&row[colName]==undefined){
      return false;
    }
    if (colName != undefined && row[colName].label != undefined) {
      return true;
    }
    return false;
  }


  hasFirstButtonIcon(row: any, colName?: string): boolean {
    if (colName != undefined &&row[colName]==undefined){
      return false;
    }
    if (colName != undefined && row[colName].firstIcon != undefined && row[colName].firstIcon != 'more_vert') {
      return true;
    }
    return false;
  }

  hasMoreVertIcon(row: any, colName?: string): boolean {
    if (colName != undefined &&row[colName]==undefined){
      return false;
    }
    if (colName != undefined && (row[colName].secondIcon == 'more_vert' || row[colName].firstIcon == 'more_vert')) {
      return true;
    }
    return false;
  }

  clickFirstActionButton(selectRow: any, colName?: string): void {
    if (colName != undefined && selectRow[colName].firstIcon != undefined) {
      this.iconAction.emit({ row: selectRow, action: selectRow[colName].firstIcon });
    }
  }

  clickSecondActionButton(selectRow: any, colName?: string): void {
    if (colName != undefined && selectRow[colName].secondIcon != undefined) {
      this.iconAction.emit({ row: selectRow, action: selectRow[colName].secondIcon });
    }
  }

  onIconDropdownItemClick(item: PjDropdownItem, rowItem: any): void {
    this.iconAction.emit({ action: item.value||item.iconName, row: rowItem });
  }

  getMenuItems(row: any, column?: string): Array<PjDropdownItem> {
    if (column != undefined && row[column].dropdown != undefined) {
      return row[column].dropdown;
    }

    return [];
  }

  private imageMenuItem: Array<PjDropdownItem> = [{ iconName: 'upload', label: 'Upload image' }, { iconName: 'checklist', label: 'Choose image' }];
  getImageMenuItems(row: any, column?: string): Array<PjDropdownItem> {
    return this.imageMenuItem;
  }

  getStatusColors(info: string): string {
    let statusColor: string = PJ_COMPONENT_STYLE.PRIMARY;
    if (this.rowCommonInfo != null) {
      statusColor = this.rowCommonInfo['statusColor'][info];
    }
    return statusColor;
  }



  isCheckFrozen(): boolean {
    let frozenCheck: boolean = false;
    this.columnHeader?.forEach(item => {
      if (item.dataType === "tableCheckIcon") {
        frozenCheck = item.frozen || false;
      }
    });
    return frozenCheck;
  }

  getHistoryColors(): string {
    return PJ_COMPONENT_STYLE.SECONDARY;
  }

  isAllChecked(): boolean {
    const startPage = this.table?.offset || 0;
    const tempSelected = this._selectedInThisPage();
    if ((startPage == Math.floor(this.rows.length / this.tablePageSize)) && (tempSelected == this.rows.length % this.tablePageSize)) {
      return true;
    }
    if (tempSelected == this.tablePageSize) {
      this.allThisPageRowsChecked = true;
      return true;
    }
    this.allThisPageRowsChecked = false;
    return false;
  }

  isPartSelected(): boolean {
    const tempThisPageChecked = this._selectedInThisPage();
    const isAllSelected = this.isAllChecked();
    if ((tempThisPageChecked == 0) || isAllSelected) {
      return false;
    }
    return true;
  }

  private _selectedInThisPage(): number {
    let tempCurPage = this.table?.offset || 0;
    const endIndex = Math.min((tempCurPage + 1) * this.tablePageSize, this.rows.length);
    return this.rows.slice(tempCurPage * this.tablePageSize, endIndex).filter(item => item.checked == true).length;
  }

  onCheckClick(thisRow: any, value: any): void {
    thisRow.checked = !thisRow.checked;
    this.checkedItem.emit({ row: thisRow, selected: thisRow.checked });
  }

  getChecked(thisRow: any): boolean {
    return thisRow.checked || false;
  }

  isTermsPartSelected(thisRow: any): boolean {
    return thisRow.partChecked || false;
  }


  allRowsSelected(): void {
    this.allThisPageRowsChecked = !(this.allThisPageRowsChecked);
    this.checkedItem.emit({ row: 'all', selected: this.allThisPageRowsChecked, curPage: this.table?.offset, pageSize: this.tablePageSize });
  }

  showType() {
    return this.rowCommonInfo?.["showTypes"];
  }




  getLeftPerfixSign(thisRow: any, dataName?: string): string {
    if (dataName != undefined) {
      return thisRow[dataName].sign || '$';
    }
    return '$';
  }
  trySaveInput(thisRow: any, e: any, dataName?: string): void {
    this.saveInput(thisRow, e.target.value, dataName);
  }

  trySaveInputText(thisRow: any, e: any, dataName?: string, dataType?: string, index?: number): void {
    if (dataType != undefined && dataType.includes('Array')) {
      if (index != undefined) {
        thisRow[dataName + index.toString() + 'Edit'] = false;
        this.saveInputText(thisRow, e.target.value, dataName, dataType, index);
      }
    } else {
      thisRow[dataName + 'Edit'] = false;
      this.saveInputText(thisRow, e.target.value, dataName);
    }

  }

  saveInput(thisRow: any, inNewAmount: string, dataName?: string, dataType?: string, updateBackend?: boolean): void {
    if (dataName != null) {
      const newAmount = parseFloat(inNewAmount).toFixed(2);
      if (thisRow[dataName] == undefined) {
        thisRow[dataName] = new MoneyInfo(parseFloat(newAmount));
      } else {
        thisRow[dataName].amount = parseFloat(newAmount);
      }

      thisRow[dataName + 'Formcontrol'].setValue(newAmount);
    }
    this.textEntryChange.emit({ row: thisRow, dataName: dataName, text: inNewAmount });
    if (updateBackend) {
      this.iconAction.emit({ row: thisRow, action: PJ_TABLE_COMPONENT_CONST.UPDATEBACKEND })
    }
  }
  saveInputText(thisRow: any, info: string, dataName?: string, dataType?: string, index?: number, updateBackend?: boolean): void {
    info=info.trim();
    if (dataType != undefined && dataType.includes('Array')) {
      if (index != undefined) {
        thisRow[dataName + index.toString() + 'Edit'] = false;
        if (dataName != null) {
          thisRow[dataName][index] = info || '';
        }
        this.textEntryChange.emit({ row: thisRow, dataName: dataName, text: info, dataType: 'Array', arrayIndex: index });
      }
    } else {
      thisRow[dataName + 'Edit'] = false;
      if (dataName != null) {
        thisRow[dataName] = info || '';
      }
      this.textEntryChange.emit({ row: thisRow, dataName: dataName, text: info });
    }

    if (updateBackend) {
      this.iconAction.emit({ row: thisRow, action: PJ_TABLE_COMPONENT_CONST.UPDATEBACKEND })
    }
  }

  isInputError(thisRow: any, dataName?: string, dataType?: string, mustGreaterThan?: string, mustLessThan?: string): boolean {
    let tempError = false;
    if (dataType != undefined && dataType == 'MoneyInfo') {
      if (mustGreaterThan != undefined && dataName != undefined && (thisRow[dataName]?.amount < thisRow[mustGreaterThan]?.amount)) {
        tempError = true;
      }
      if (mustLessThan != undefined && dataName != undefined && (thisRow[dataName]?.amount > thisRow[mustLessThan]?.amount)) {
        tempError = true;
      }
    } else {
      if (mustGreaterThan != undefined && dataName != undefined && (thisRow[dataName] < thisRow[mustGreaterThan])) {
        tempError = true;
      }
      if (mustLessThan != undefined && dataName != undefined && (thisRow[dataName] > thisRow[mustLessThan])) {
        tempError = true;
      }
    }
    return tempError;
  }

  getAssistiveText(thisRow: any, dataName?: string): string {
    if (dataName != null) {
      return thisRow[dataName] || '';
    }
    return '';
  }

  getImageInfo(thisRow: any, dataName?: string): string {

    if (dataName != null && thisRow[dataName] != undefined) {
      if (!Array.isArray(thisRow[dataName])) {
        return thisRow[dataName].uri || thisRow[dataName].fileInfo?.content || 'assets/image/empty_asset.png';
      } else {
        return thisRow[dataName][0].uri || thisRow[dataName][0].fileInfo?.content || 'assets/image/empty_asset.png';
      }
    }
    return 'assets/image/empty_asset.png';
  }

  hasThisImage(thisRow: any, dataName?: string, dataType?: string): boolean {

    if (dataName != null && dataType?.includes('Array') && (HasStringValue(thisRow[dataName][0]?.uri) || HasStringValue(thisRow[dataName][0]?.fileInfo?.content))) {
      return true;
    }
    if (dataName != null && (HasStringValue(thisRow[dataName]?.uri) || HasStringValue(thisRow[dataName]?.fileInfo?.content))) {
      return true;
    }
    return false;
  }

  getPicIcon(thisRow: any, dataName?: string): string {
    if (dataName != null && thisRow[dataName] != undefined) {
      return 'close';
    }
    return 'add_circle';
  }
  getPicIconName(thisRow: any, dataName?: string): string {
    if (dataName != null && thisRow[dataName] != undefined) {
      return 'Delete';
    }
    return 'Add';
  }
  deleteThisImage(thisRow: any, dataName?: string): void {
    if (dataName != null && thisRow[dataName] != undefined) {
      thisRow[dataName] = [];
    }
  }
  getChipText(thisRow: any, dataName?: string, dataType?: string, index?: number): string {
    if (dataName != null) {
      if (dataType?.includes('Array') && index != undefined) {
        return thisRow[dataName][index] || '';
      }
      return thisRow[dataName] || '';
    }
    return '';
  }
  getAutofillCellInfo(thisRow: any, dataName?: string, dataType?: string, index?: number): string {
    if (dataName != null) {
      if (dataType?.includes('Array') && index != undefined) {
        return thisRow[dataName][index] || this.rowCommonInfo?.['autofill'] || 'Click to edit';
      }
      return thisRow[dataName] || this.rowCommonInfo?.['autofill'] || 'Click to edit';
    }
    return '';
  }

  getPriceAutofillCellInfo(thisRow: any, dataName?: string, dataType?: string): string {
    if (dataName != null) {
      if (thisRow[dataName].amount == 0) {
        return this.rowCommonInfo?.['autofill'] || 'Click to edit';
      }
      return thisRow[dataName].amount || this.rowCommonInfo?.['autofill'] || 'Click to edit';
    }
    return '';
  }

  getTime(thisRow: any, dataName?: string): string {
    if (dataName != null) {
      return HelperService.formatDateTime(thisRow[dataName], 'hh:mm:ss');
    }
    return ''
  }

  getTimeAmPm(thisRow: any, dataName?: string): string {
    if (dataName != null) {
      return HelperService.formatAMPM(thisRow[dataName]);
    }
    return ''
  }

  getDate(thisRow: any, dataName?: string): string {
    if (dataName != null) {
      return HelperService.formatDateTime(thisRow[dataName], 'yyyy-MM-dd');
    }
    return ''
  }

  getMapInfo(thisRow: any, dataName?: string): Array<{ key: string, value: string }> {
    return thisRow[dataName + 'map'];
  }


  // pj-text-edit component
  onEdit(thisRow: any, dataName?: string): boolean {
    return thisRow[dataName + 'Edit'];
  }

  onEditBtnClick(thisRow: any, dataName?: string): void {
    thisRow[dataName + 'Edit'] = true;
  }

  onSaveInputText(thisRow: any, newInfo: string, dataName?: string): void {
    if (dataName != null && HasStringValue(newInfo)) {
      thisRow[dataName] = newInfo || thisRow[dataName];
      thisRow[dataName + 'Formcontrol'].setValue(newInfo);
      this.textEntryChange.emit({ row: thisRow, dataName: dataName, text: newInfo });
    }

  }

  trySaveEditInput(thisRow: any, e: any, dataName?: string): void {
    this.onSaveInputText(thisRow, e.target.value, dataName);
  }

  onCheckIconClick(thisRow: any, dataName?: string): void {
    thisRow[dataName + 'Edit'] = false;
  }


  // click to edit
  isEditSituation(thisRow: any, dataName?: string, dataType?: string, index?: number): boolean {
    if (dataType?.includes('Array') && index != undefined) {
      return thisRow[dataName + index?.toString() + 'Edit'];
    }
    return thisRow[dataName + 'Edit'];
  }


  onEditTextClick(thisRow: any, dataName?: string, dataType?: string, index?: number): void {
    if (dataType?.includes('Array') && index != undefined) {
      thisRow[dataName + index?.toString() + 'Edit'] = true;
    } else {
      thisRow[dataName + 'Edit'] = true;
    }

  }


  getCellFirstInfo(thisRow: any, firstDataName?: string, dataType?: string): string {
    if (firstDataName != null) {
      return this.getCellInfo(thisRow, firstDataName, dataType);
    }
    return '';
  }

  getCellSecondInfo(thisRow: any, secondDataName?: string, dataType?: string): string {
    if (secondDataName != null) {
      return this.getCellInfo(thisRow, secondDataName, dataType);
    }
    return '';
  }
  getCellInfo(thisRow: any, dataName?: string, dataType?: string, index?: number): string {
    if (dataName != null) {

      if (dataType == 'Date') {
        return HelperService.formatDateTime(thisRow[dataName], 'yyyy-MM-dd');
      }
      if (dataType == 'MoneyInfo') {
        return MoneyInfo.formattedString(thisRow[dataName]);
      }
      if (dataType?.includes('Array') && index != undefined) {
        return thisRow[dataName][index];
      }
      return thisRow[dataName];
    }
    return '';
  }


  getLeftIconName(thisRow: any, dataName?: string): string {
    if (dataName != null) {
      return thisRow[dataName].leftIcon;
    }
    return '';
  }

  getBtnLeftIconName(thisRow: any, dataName?: string): string | undefined {
    if (dataName != null) {
      return thisRow[dataName].leftIconName;
    }
    return;
  }

  getButtonName(thisRow: any, dataName?: string): string {

    if (dataName != null) {
      return thisRow[dataName].label;
    }
    return '';
  }

  getBISecondIconName(thisRow: any, dataName?: string): string {

    if (dataName != null) {
      return thisRow[dataName].secondIcon;
    }
    return '';
  }

  checkedWholeRows(row: any): any {
    return { 'checkedRow': row.checked, 'zindex10': row.menuClick };
  }

  // checkedWholeColumns(column: any): any {
  //   return { 'checkedColumn': column.checked, 'zindex10': column.menuClick };
  // }

  onMenuClick(row: any): any {
    this.rows.forEach(r => r.menuClick = false);
    row.menuClick = true;
  }

  getCheckboxItems(): Array<PjCheckboxItem> {

    return this._checkboxItems;
  }
  onChangeEvent(items: Array<PjCheckboxItem>): void {
    items.forEach((item) => {
      this.columnHeader?.forEach((i) => {
        if (i.columnTitle?.toLowerCase() === item.label?.toLowerCase()) {
          i.show = item.checked;
        }
      });
    });
    this._initialShowColum();
    this.showColumn = [...this.showColumn || []];
  }

  hasTableColSelection(): boolean {
    return this.rowCommonInfo?.['showColSelection'] || false;
  }

  getTBTextInfo(thisRow: any, dataName?: string): string {
    if (dataName != null) {
      return thisRow[dataName].toString();
    }
    return '';
  }

  getTBButtonInfo(): string {
    if (this.rowCommonInfo != null) {
      return this.rowCommonInfo[PJ_TABLE_BUTTONACTION_CONST.TEXTINPUTBUTTON].label;
    }
    return '';

  }

  textEntryButtonClick(thisRow: any): void {
    if (this.rowCommonInfo != null) {
      this.textEntryButAction.emit({ action: this.rowCommonInfo[PJ_TABLE_BUTTONACTION_CONST.TEXTINPUTBUTTON].action, row: thisRow });
    }
  }
  onOneImageUploaded(imagesContent: FileInfo[], row: any, dataName: string, dataType?: string): void {
    let tempAtt = new Attachment();
    tempAtt.fileInfo = imagesContent[0];
    if (dataType?.includes('Array')) {
      row[dataName][0] = tempAtt;
    } else {
      row[dataName] = tempAtt;
    }
  }

  getThisImage(row: any, dataName: string): string {
    if (row[dataName] != undefined) {
      if (Array.isArray(row[dataName])) {
        return row[dataName][0].uri || row[dataName][0].fileInfo?.content || '';
      }
      return row[dataName].uri || row[dataName].fileInfo?.content || '';
    }
    return '';
  }

  // getTotalItemNumOnOnePage(): number {               //不能限制每页的数据数量，因为点击variant后的数量要出现在此页（2023-4-21）
  //   return this.tablePageSize;
  // }

  private _pageSizeLabel?: Array<PjDropdownItem>;
  getFooterPageSizeLabel(): Array<PjDropdownItem> {
    if (this._pageSizeLabel == null) {
      this._pageSizeLabel = [{
        label: '50 rows per page', actionString: '50'
      }, {
        label: '20 rows per page', actionString: '20'
      }, {
        label: '10 rows per page', actionString: '10'
      }, {
        label: '5 rows per page', actionString: '5'
      }];
    }
    return this._pageSizeLabel;

  }
  getTotalPage(): number {
    // return Math.ceil(rowTotal / pageSize);
    return this.totalPages || 1;

  }
  getThisPageTotal(curPage: number, rowCount: number, pageSize: number): number {
    if (curPage == Math.ceil(rowCount / pageSize)) {
      return (rowCount % pageSize);
    }
    return pageSize;
  }
  changePageSize(event: PjDropdownItem): void {
    this.tablePageSize = Number(event.actionString);
    this.footerChange.emit({ curPageNum: 1, curPageSize: Number(event.actionString) });
  }

  nextPage(): void {
    // if ((this.table?.offset != undefined)) {                     //2023.04.22禁用表格自动翻页功能，改为从后端更新数据的翻页方法
    //   this.table.offset += 1;
    //   this.pageFormControl?.setValue((this.table.offset + 1).toString());
    // }
    if (this.currentPageNum < (this.totalPages || 1)) {
      this.currentPageNum += 1;
      this.pageFormControl?.setValue((this.currentPageNum).toString());
      this.setFooterPageNum(this.currentPageNum);
    }
  }

  previousPage(): void {
    // if ((this.table?.offset != undefined) && (this.table.offset > 0)) {            //2023.04.22禁用表格自动翻页功能，改为从后端更新数据的翻页方法
    //   this.table.offset -= 1;
    //   this.pageFormControl?.setValue((this.table.offset + 1).toString());
    // }
    if (this.currentPageNum > 1) {
      this.currentPageNum -= 1;
      this.pageFormControl?.setValue((this.currentPageNum).toString());
      this.setFooterPageNum(this.currentPageNum);
    }
  }

  gotoPage(pageNo: string): void {
    if (!Number(pageNo)) {
      pageNo = '1';
    }
    if (this.table?.offset != undefined) {
      this.table.offset = Number(pageNo) - 1;
      this.pageFormControl?.setValue((this.table.offset + 1).toString());
    }
    this.currentPageNum = Number(pageNo);
    this.setFooterPageNum(this.currentPageNum);
  }

  setFooterPageNum(pageNum: number): void {
    this.footerChange.emit({ curPageNum: Number(pageNum), curPageSize: this.tablePageSize });
  }

  onTableTreeAction(thisRow: any): void {
    if (thisRow.treeStatus === 'collapsed') {
      thisRow.treeStatus = 'expanded';
    } else {
      thisRow.treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }

  getTreeColConstent(thisRow: any, dataName?: string, title?: string): string {
    if ((!dataName) || (!thisRow[dataName])) {
      return '';
    }
    const numStr = this.rows.filter(item => item[this.rowCommonInfo?.['treeFromRelation']] == thisRow[this.rowCommonInfo?.['treeToRelation']]).length.toString();
    return title + '(' + numStr + ')';
  }
  getTreeLeftIcon(thisRow: any): string {
    if (thisRow.treeStatus === 'expanded') {
      return 'expand_more';
    }
    if (thisRow.treeStatus === 'collapsed') {
      return 'chevron_right';
    }
    return '';
  }

  gotoRowItemLink(thisRow: any, actionName?: string): void {
    this.textEntryButAction.emit({ action: actionName, row: thisRow });

  }

  hasFooter(): boolean {
    if (this.rowCommonInfo != undefined) {
      if (this.rowCommonInfo['hasFooter'] != undefined) {
        return this.rowCommonInfo['hasFooter'];
      }
    }
    return true;
  }
  getFooterHeight(): number {
    if (this.hasFooter()&&this.rowCommonInfo!=undefined) {
      return this.rowCommonInfo['footerHeight']||100;
    }
    return 0;
  }
  getHeaderHeight(): number {
    if (this.rowCommonInfo != undefined) {
      return this.rowCommonInfo['headerHeight'] || 60;
    }
    return 50;
  }

  getRowHeight(): number {
    if (this.rowCommonInfo != undefined) {
      return this.rowCommonInfo['rowHeight'] || 90;
    }
    return 70;
  }

  getVarantLeftIconName(thisRow: any): string {
    return thisRow.showVariant ? 'expand_more' : 'chevron_right';
  }
  variantButtonClick(thisRow: any): void {
    if (thisRow.showVariant) {
      this.iconAction.emit({ row: thisRow, action: PJ_TABLE_BUTTONACTION_CONST.SHOWVARIANT });
    } else {
      this.iconAction.emit({ row: thisRow, action: PJ_TABLE_BUTTONACTION_CONST.HIDEVARIANT });
    }
    thisRow.showVariant = !thisRow.showVariant;
  }
  showRowVariant(thisRow: any, dataName?: string): boolean {
    if (dataName != undefined) {
      return thisRow[dataName];
    }
    return false;
  }
  getVariantAndNumber(thisRow: any): string {
    return 'Variants (' + thisRow['variantsCount'] + ')';
  }
  isHeaderChangeable(headerChangeable?: boolean): boolean {
    return headerChangeable || false;
  }

  getHeaderLable(columnTitle?: string): FormControl<string | null> {
    return this.headerFormControl.get(columnTitle || '') || new FormControl<string | null>('');
  }

  trySaveHeader(e: any, columnTitle?: string): void {
    if (e.target.value != undefined && e.target.value.length > 0) {
      this.saveHeader(e.target.value, columnTitle);
    }
  }

  saveHeader(newValue: string, columnTitle?: string): void {
    this.headerChange.emit({ oldName: columnTitle || '', newName: newValue });
  }

  deleteThisColumn(e: boolean, columnTitle?: string): void {
    if (e) {
      this.headerChange.emit({ oldName: columnTitle || '', newName: PJ_TABLE_BUTTONACTION_CONST.DELETECOLUMN });
    }

  }

  canAddNewColumn(): boolean {
    if (this.rowCommonInfo != undefined) {
      return this.rowCommonInfo[PJ_TABLE_BUTTONACTION_CONST.ADDNEWCOLUMN];
    }
    return false;
  }
  addNewColumn(): void {
    this.iconAction.emit({ action: PJ_TABLE_BUTTONACTION_CONST.ADDNEWCOLUMN });
  }

  // getTableHeight(): PjProperty {
  //   return { height: this.height + 'px' };
  // }
  getScrollBarWidth(): PjProperty {
      return { width: 3003+ 'px' };
    }

}



