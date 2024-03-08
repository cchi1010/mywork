import { TableColumn } from "@swimlane/ngx-datatable";
import { Observable } from "rxjs";
import { APPCONSTANT } from "src/app/app.constant";
import { ArrayIsEmpty, ArrayIsNotEmpty, HasStringValue, isFalse, isTrue, PjDropdownItem, PjKeyValue, PjTabItemData } from "src/component/components.global";
import { BaseModel, InputType, PagingData, SearchType, SelectiveItem, ServerDataType } from "./base.model";
import { FunctionalityModel } from "./functionality.model";
import { I18nresourceModel } from "./i18nresource.model";

export class ModelspecModel extends BaseModel {
    constructor() {
        super('ModelSpecification');
    }
    iconName?: string;
    quickSearchFields?: string;
    sortAscFields?: string[];
    sortDescFields?: string[];
    className?: string;
    label?: string;
    labelFormatter?: string;
    updatable?: boolean;
    deletable?: boolean;
    cloneable?: boolean;
    batchDeletable?: boolean;
    creatable?: boolean;
    downloadable?: boolean;
    downIncAttach?: boolean;
    batchDownIncAttach?: boolean;
    uploadable?: boolean;
    depth?: number;
    downloadLimit?: number;
    showDetailFieldName?: string;
    fieldSpecs?: FieldspecModel[];
    modelFunctionalities?: FunctionalityModel[];
    objectFunctionalities?: FunctionalityModel[];
    groupByFieldListValues?: string[];
    groupByField?: string;
    mappingPath?: string;


    subModelSpecMap?: PjKeyValue<ModelspecModel>;
    version?: string;

    // 判断该业务模型是否有其他业务模型作为属性
    static attachComponentMetadata(moduleName: string, mSpec?: ModelspecModel): ModelspecModel | undefined {
        if (mSpec == null || ArrayIsEmpty(mSpec.fieldSpecs)) {
            return undefined;
        }
        mSpec.fieldSpecs?.forEach(fSpec => {
            const _componentsMetaData = FieldspecModel.getComponentFieldMetadata(moduleName, fSpec);
            if (ArrayIsNotEmpty(_componentsMetaData)) {
                fSpec.componentMetaDatas = _componentsMetaData;
            }
        });
        return mSpec;
    }
    static generateModelFieldsTabData(mSpec?: ModelspecModel): Array<PjTabItemData> {
        let fSpecs = mSpec?.fieldSpecs?.filter(fSpec => fSpec.fieldType?.includes('.model.') && !isTrue(fSpec.managementSeparately));
        if (ArrayIsEmpty(fSpecs)) {
            return [];
        }
        let items = new Array<PjTabItemData>();
        items.push({ title: 'Info', isActived: true, value: '_all' });
        fSpecs?.forEach(fSpec => {
            items.push({ title: fSpec.label || '', isActived: false, value: fSpec.name });
        });
        return items;
    }
    static generateModelName(mSpec: ModelspecModel): string {
        const clazzName = mSpec.className;
        if (clazzName == null || clazzName.length == 0) {
            return '';
        }
        return clazzName.substring(clazzName.lastIndexOf('.') + 1).toLowerCase();
    }

    static generateColumnHeaders(modelSpec: ModelspecModel): Array<TableColumn> {
        if (modelSpec == null) {
            return [];
        }
        if (ArrayIsEmpty(modelSpec.fieldSpecs)) {
            return [];
        }
        // for(let field of modelSpec.fieldSpecs!)
        let columns = new Array<TableColumn>();
        modelSpec.fieldSpecs!.sort(FieldspecModel.compare).filter(
            f => isFalse(f.tableViewHidden)
        ).forEach(field => {
            let col: TableColumn = {};
            col.name = field.label;
            col.prop = field.name;
            col.maxWidth = 250;
            col.minWidth = 150;
            columns.push(col);
        });
        return columns;
    }

    static generateGroupbyTabItemsData(modelSpec: ModelspecModel): Array<PjTabItemData> {
        if (ArrayIsEmpty(modelSpec.groupByFieldListValues)) {
            return [];
        }
        let ptids = new Array<PjTabItemData>();
        ptids.push({ title: 'All', isActived: true, value: '' });
        modelSpec.groupByFieldListValues?.forEach(field => {
            let ptid: PjTabItemData = { title: field, isActived: false, value: field };
            ptids.push(ptid);
        });
        return ptids;
    }
    static generateSearchingFields(modelSpec: ModelspecModel): Array<FieldspecModel> {
        if (modelSpec == null) {
            return [];
        }
        if (ArrayIsEmpty(modelSpec.fieldSpecs)) {
            return [];
        }
        let fSpecs = new Array<FieldspecModel>();
        modelSpec.fieldSpecs?.filter(
            fSpec => fSpec.searchType !== SearchType.NONE
        ).forEach(fSpec => fSpecs.push(fSpec));
        return fSpecs;
    }
    static generateQuickSearchLabel(modelSpec: ModelspecModel): string {
        const fNames = modelSpec.quickSearchFields?.split(',');
        if (ArrayIsEmpty(fNames)) {
            return '';
        }
        let searchLabel = '';
        fNames?.forEach(fName => {
            searchLabel = searchLabel + ModelspecModel._generateSearchFieldLabel(modelSpec.fieldSpecs || [], fName.trim());
        });
        return searchLabel.substring(0, searchLabel.length - 1);
    }

    static generateClassLevelMenus(modelSpec: ModelspecModel): Array<PjDropdownItem> {
        return ModelspecModel._generateMenus(modelSpec.modelFunctionalities);
    }

    static generateInstanceLevelMenus(modelSpec: ModelspecModel): Array<PjDropdownItem> {
        return ModelspecModel._generateMenus(modelSpec.objectFunctionalities);
    }

    private static _generateSearchFieldLabel(fSpecs: FieldspecModel[], fName: string): string {
        if (ArrayIsEmpty(fSpecs)) {
            return '';
        }
        if (!HasStringValue(fName)) {
            return '';
        }
        let searchLabel = '';
        if (fName.indexOf('.') === -1) {
            let a = fSpecs.filter(fSpec => fSpec.name === fName);
            if (ArrayIsNotEmpty(a)) {
                return (a[0].label || '') + '/';
            }
        } else {
            const attrName = fName.substring(0, fName.indexOf('.'));
            for (const fSpec of fSpecs) {
                if (fSpec.name === attrName) {
                    searchLabel = fSpec.label + '.' + ModelspecModel._generateSearchFieldLabel(fSpec.componentMetaDatas || [],
                        fName.substring(fName.indexOf('.') + 1));
                }
            }
        }
        return searchLabel;
    }
    private static _generateMenus(funs?: Array<FunctionalityModel>): Array<PjDropdownItem> {
        if (ArrayIsEmpty(funs)) {
            return [];
        }
        let clms = new Array<PjDropdownItem>();
        funs?.forEach(fun => {
            let pdi = FunctionalityModel.convertToPjDropdownItem(fun);
            if (pdi != null) {
                clms.push(pdi);
            }
        });
        return clms.sort(FunctionalityModel.compare);
    }
}

export class FieldspecModel extends BaseModel {
    constructor() {
        super('FieldSpecification');
    }
    // 没有用到 show: string; // could be 'checked' or empty
    position?: number;
    classFullName?: string;
    changeActionUrls?: string;
    dataType?: string;
    pattern?: string;
    // 简单数据类型使用这个格式字符串
    formatter?: string;
    required?: boolean;
    // 没有用到 adminReserved: boolean;
    isIndirectUpdate?: boolean;
    isSelection?: boolean;
    selClassName?: string;
    selValueField?: string;
    selTriggerFields?: string;

    // object或者object array的数据，使用如下的格式字符串
    selLabelField?: string;
    labelFieldFormatter?: string;
    // object或者object array数据的唯一标识属性
    uniqueField?: string;

    minVal?: string;
    maxVal?: string;
    minLength?: number;
    maxLength?: number;
    defaultValue?: string;
    selMultiChoice?: boolean;
    fieldFullName?: string;
    name?: string;
    fieldType?: string;
    tip?: string;
    label?: string;
    value?: string;
    tableViewHidden?: boolean;
    detailViewHidden?: boolean;
    i18nKeyField?: boolean;
    i18nField?: boolean;
    componentMetaDatas?: FieldspecModel[];
    hideComponent?: boolean; // 服务器没有
    selectiveValues?: string[];
    isValid?: boolean; // 服务器没有
    sortable?: boolean;
    usedForSorting?: boolean; // 服务器没有
    descSort?: boolean; // 服务器没有
    searchType?: string;
    clearSearchCondition?: boolean; // 服务器没有
    embedded?: boolean;
    managementSeparately?: boolean;

    editForCreationOnly?: boolean;

    parentFieldSpecification?: FieldspecModel; // 服务器没有
    gtxs?: boolean;
    gtsm?: boolean;
    gtmd?: boolean;
    gtlg?: boolean;
    fxhide?: boolean;

    selFetchValueAsync = false; // 是否异步获取枚举数据
    enumHoldDefaultValue = false; // 枚举数据是否是其他属性的缺省值
    selectiveItems?: SelectiveItem[];
    inputType?: string;
    inputTypeForSearching?: string;
    isRangeValues?: boolean;
    isEnumerationValues?: boolean;
    i18nResourcesForField?: I18nresourceModel[]; // 服务器没有


    // 异步获取枚举数据的方法
    fetchSelectionDataService?: (fSpec: FieldspecModel, value: string) => Observable<PagingData<any>>;

    static isNormalField(fSpec: FieldspecModel): boolean {
        if (fSpec.dataType === ServerDataType.FILE) {
            return true;
        }
        if (fSpec.dataType === ServerDataType.OBJECT && isTrue(fSpec.embedded)) {
            return true;
        }
        if (ArrayIsEmpty(fSpec.componentMetaDatas)) {
            return true;
        }
        return false;
    }
    static compare(fSpec1: FieldspecModel, fSpec2: FieldspecModel): number {
        return (fSpec1.position || 0) - (fSpec2.position || 0);
    }

    static generateInputType(fSpec: FieldspecModel): string {
        let inputType: string = InputType.TEXT;

        if (fSpec.componentMetaDatas != null && fSpec.componentMetaDatas.length > 0) {
            fSpec.componentMetaDatas.forEach(subfSpec => {
                subfSpec.inputType = this.generateInputType(subfSpec);
            });
        }

        if (fSpec.isSelection) {
            if (fSpec.selMultiChoice) {
                inputType = InputType.CHECKBOX;
            } else {
                // this is a enumeration data with single choice
                if (fSpec.selFetchValueAsync) {
                    inputType = InputType.AUTOCOMPLETE;
                } else if (fSpec.selectiveItems != null) {
                    const itemLength = fSpec.selectiveItems.length;
                    if (itemLength <= APPCONSTANT.SELECTIVERSCOPE.RADIO) {
                        inputType = InputType.RADIO;
                    } else if (itemLength <= APPCONSTANT.SELECTIVERSCOPE.SINGLESELECT) {
                        inputType = InputType.SINGLE_SELECT;
                    } else {
                        inputType = InputType.AUTOCOMPLETE;
                    }
                } else {
                    inputType = InputType.RADIO;
                }
            }
        } else if (fSpec.i18nField && !fSpec.isSelection) {
            inputType = InputType.I18NTEXT;
        } else if (fSpec.dataType === ServerDataType.BOOLEAN) {
            inputType = InputType.RADIO;
        } else if (fSpec.dataType === ServerDataType.DATE) {
            inputType = InputType.DATE;
        } else if (fSpec.dataType === ServerDataType.EMAIL) {
            inputType = InputType.EMAIL;
        } else if (fSpec.dataType === ServerDataType.FILE) {
            inputType = InputType.FILE;
        } else if (fSpec.dataType === ServerDataType.OBJECT) {
            if (fSpec.embedded) {
                inputType = InputType.EMBEDDED;
            }
        } else if (fSpec.dataType === ServerDataType.JSON) {
            inputType = InputType.JSON;
        } else if (fSpec.dataType === ServerDataType.IMAGE) {
            inputType = InputType.IMAGE;
        } else {
            inputType = InputType.TEXT;
        }
        return inputType;
    }


    private static _compSpecs: { [key: string]: Array<FieldspecModel> } = {};
    private static _fSpecName: string = '';
    static getComponentFieldMetadata(moduleName: string, fSpec: FieldspecModel): Array<FieldspecModel> {
        if (!HasStringValue(fSpec.fieldFullName) || !HasStringValue(fSpec.fieldType)) {
            return [];
        }
        if (this._fSpecName !== fSpec.fieldFullName && this._compSpecs[fSpec.fieldFullName!] == null) {
            this._fSpecName = fSpec.fieldFullName!;
            let s = localStorage.getItem(APPCONSTANT.LOCAL_STORAGE_ITEM_NAME.METADATA + moduleName);
            if (s !== null && !fSpec.managementSeparately) {
                let mSpecs = JSON.parse(s);
                if (mSpecs[fSpec.fieldType!] != null) {
                    this._compSpecs[this._fSpecName] = mSpecs[fSpec.fieldType!].fieldSpecs;
                }
            }
        }
        return this._compSpecs[fSpec.fieldFullName!];
    }
}

export const PRE_DEFINED_CLASS_OPERATION = {
    CREATE: 'action.createModel',
    UPLOAD: 'action.uploadModel',
    DOWNLOAD: 'action.downloadModel',
    DOWNLOAD_TEMPLATE: 'action.download_templateModel',
    BATCH_DELETE: 'action.butch_deleteModel',
    BATCH_PRINT: 'action.batch_printModel',
}

export const PRE_DEFINED_INSTANCE_OPERATION = {
    CLONE: 'action.cloneModel',
    READ: 'action.readModel',
    UPDATE: 'action.updateModel',
    DELETE: 'action.deleteModel',
    PRINT: 'action.printModel',
    DOWNLOAD: 'action.downloadModel',
}
