import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ArrayIsEmpty, HasStringValue, PjKeyValue, PjProperty } from 'src/component/components.global';
import { HelperService } from 'src/service/helper.service';
import { I18nresourceModel } from './i18nresource.model';
import { FieldspecModel } from './model.metadata';

// 货币的数据， 对应后端的 com.polarj.model.component.MoneyInfo
export class MoneyInfo {
    currency = 'USD';
    sign = '$';
    amount: number;
    constructor(amount: number, currency?: string, sign?: string) {
        this.amount = amount;
        if (HasStringValue(currency)) {
            this.currency = currency || 'USD';
        }
        if (HasStringValue(sign)) {
            this.sign = sign || '$';
        }
    }
    static formattedString(money: MoneyInfo | undefined): string {
        if (money != null) {
            return (money.sign || '$') + (money.amount || 0).toFixed(2);
        }
        return '';
    }

    static times(m?: MoneyInfo, qty?: number): MoneyInfo {
        if (m == null || qty == null || qty === 0) {
            return new MoneyInfo(0);
        }
        let nm: MoneyInfo = JSON.parse(JSON.stringify(m));
        nm.amount = m.amount * qty;
        return nm;
    }
    static add(...moneys: Array<MoneyInfo | undefined>): MoneyInfo | undefined {
        if (moneys == null || moneys.length == 0 || moneys[0] == null) {
            return;
        }
        let amount = new MoneyInfo(0, moneys[0].currency, moneys[0].sign);
        let b = true;
        moneys.forEach(m => {
            if (m != null) {
                amount.amount += m.amount;
                if (m.currency != amount.currency) {
                    b = false;
                }
            }
        });
        if (!b) {
            amount.amount = 0;
        }
        return amount;
    }
    static substuct(m1:  MoneyInfo | undefined, m2: MoneyInfo | undefined): MoneyInfo | undefined {
        if (m1 == null || m2 == null ) {
            return new MoneyInfo(0);
        }
        let nm: MoneyInfo = JSON.parse(JSON.stringify(m1));
        nm.amount = m1.amount - m2.amount;
        return nm;
    }
}

export class EnumValuesForSearching {
    fieldName?: string;
    values?: string;
}

export class RangeValueForSearching {
    fieldName?: string;
    fromValue?: string;
    toValue?: string;
}

export class BaseModel {

    constructor(entityName?: string) {
        this.entityName = entityName;
    }

    id?: number;
    tempId?: number; // will generated automatically locally to distinguish the new entity.
    curPageSize?: number;
    pageIndex?: number;
    i18nResources?: I18nresourceModel[];
    fieldI18nResources?: PjKeyValue<I18nresourceModel[]>;
    sortField?: string;
    sortDesc?: boolean; // DESC(from big to small) or ASC(from small to big)

    // file-plan1
    // 需要上传的文件信息，全部保存在最顶层业务模型的fileInfos中（包括直接属性是文件类型或者是另外一个包含文件属性的业务模型）
    // 文件上传有两种方式： 
    // 1. 使用多个FileUploader来上传文件，每次上传一个文件
    // 2. 使用一个FileUploader来上传文件，一次性上传所有文件）
    // 先尝试第一种方式
    fileInfoDesc?: FileInfoDesc; // 目前业务模型中支持有一个带附件的属性字段

    // fileInfos: FileInfoDesc[]; // 用于支持带多个附件的属性字段（主子模型是一对多关系）
    // 保存模糊搜索的输入值，
    smartSearchText?: string;

    // urlParams发送到后端去的urlParams
    urlParams?: string;
    urlPath?: string;

    entityName?: string;
    rangeValues?: RangeValueForSearching[];
    eanumEnumValueForSearchings?: EnumValuesForSearching[];
    relatedId?: number;

    [key: string]: any;
    // 上传的数据中该列表中的数据为空，可以在修改时清除数据
    valueRemovedFields?: Array<string>;

    static generateLabelForObject(elmValue: any, formatter?: string, fSpecs?: Array<FieldspecModel>): string {
        if (elmValue == null || !HasStringValue(formatter) || ArrayIsEmpty(fSpecs)) {
            return '';
        }
        const splitedLabel: string[] = formatter!.split('${');
        const fieldNames: string[] = new Array<string>();
        if (splitedLabel.length > 0) {
            splitedLabel.forEach(function (s): void {
                if (s != null && s.length > 0) {
                    fieldNames.push(s.substr(0, s.indexOf('}')));
                }
            });
        }
        let value = formatter!;
        if (fieldNames.length > 0) {
            fieldNames.forEach(s => {
                let fSpec: FieldspecModel | undefined;
                fSpecs?.forEach(fs => {
                    if (fs.name === s) {
                        fSpec = fs;
                    }
                });
                if (fSpec != null && fSpec.formatter && fSpec.formatter.length > 0) {
                    // 嵌入式数据的数据属性定义了显示格式
                    value = value.replace('${' + s + '}', BaseModel.convertToDisplayString(elmValue, fSpec));
                } else {
                    value = value.replace('${' + s + '}', elmValue[s] || ('no ' + s));
                }
            });
        } else {
            // 在没有定义显示格式的情况下显示嵌入式数据的方式：
            value = '';
            fSpecs?.forEach(fs => {
                value = value + BaseModel.convertToDisplayString(elmValue, fs) + '; ';
            });
        }
        return value;
    }

    static generateSearchCriteria(modelName: string, pageIndex?: number, pageSize?: number, defaultPageSize?: number): BaseModel {
        const cri = new BaseModel(modelName);
        cri.pageIndex = (pageIndex && pageIndex >= 0) ? pageIndex : 0;
        cri.curPageSize = (pageSize && pageSize > 0) ? pageSize : defaultPageSize;
        return cri;
    }

    static generateModel(modelName?: string, entity?: BaseModel): BaseModel {
        if (entity) {
            entity.entityName = modelName;
            return entity;
        }
        const bm = new BaseModel(modelName);
        return bm;
    }

    static isImageField(e: BaseModel, fSpec: FieldspecModel): boolean {
        if (e == null) {
            return false;
        }
        if (fSpec.name == null || e[fSpec.name] == null) {
            return false;
        }
        let fileType = (e[fSpec.name]['fileType']);
        if (fileType == null || fileType === undefined) {
            return false;
        }
        fileType = fileType.toLowerCase();
        if (fSpec.dataType === null || fSpec.dataType === undefined) {
            return false;
        }
        if (fSpec.dataType !== ServerDataType.FILE) {
            return false;
        }
        if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') {
            return true;
        }
        return false;
    }

    static generateRowData(rowData: BaseModel, fieldSpecs?: Array<FieldspecModel>): PjProperty {
        if (rowData == null || ArrayIsEmpty(fieldSpecs)) {
            return {};
        }
        let data: PjProperty = {};
        fieldSpecs?.forEach(fSpec => {
            let v = BaseModel.convertToDisplayString(rowData, fSpec);
            if (v != null && fSpec.name != null) {
                data[fSpec.name] = v;
            }
        });
        return data;
    }

    static convertToDisplayString(e: BaseModel, fSpec: FieldspecModel, fieldName?: string): string {
        let t: BaseModel;
        if (fieldName && e) {
            t = e[fieldName];
        } else {
            t = e;
        }
        if (t == null || fSpec.name == null) {
            return 'N/A';
        }
        const typeStr: string = fSpec.dataType || '';
        let v = '';
        switch (typeStr) {
            // TODO: 在这里进行数据的格式化
            case ServerDataType.NUMBER:
                if (t[fSpec.name] === null || t[fSpec.name] === undefined) {
                    return '';
                }
                return HelperService.formatNumber(t[fSpec.name], fSpec.formatter) || '';
            case ServerDataType.EMAIL:
            case ServerDataType.STRING:
                if (fSpec.isSelection && fSpec.selLabelField != null && fSpec.selectiveItems != null) {
                    for (let i = 0; i < fSpec.selectiveItems.length; i++) {
                        if (fSpec.selectiveItems[i].value === t[fSpec.name]) {
                            return fSpec.selectiveItems[i].label || '';
                        }
                    }
                }
                return t[fSpec.name] || '';
            case ServerDataType.BOOLEAN:
                for (let i = 0; fSpec.selectiveItems != null && i < fSpec.selectiveItems.length; i++) {
                    if (t[fSpec.name] != null && fSpec.selectiveItems[i].value === t[fSpec.name].toString()) {
                        return fSpec.selectiveItems[i].label || '';
                    }
                }
                return '';
            case ServerDataType.FILE:
                return t[fSpec.name] == null ? '' : (t[fSpec.name]['fileName'] == null ? '' : t[fSpec.name]['fileName']);
            case ServerDataType.DATE:
                if (t[fSpec.name]) {
                    return HelperService.formatDateTime((new Date(t[fSpec.name])), fSpec.formatter);
                } else {
                    return '';
                }

            case ServerDataType.OBJECT:
                if (fSpec.fieldType === t['modelName'] && fSpec.componentMetaDatas != null && fSpec.componentMetaDatas.length > 0) {
                    return BaseModel._generateLabelForObject(t, fSpec.formatter, fSpec.componentMetaDatas);
                }
                if (t[fSpec.name] == null) {
                    return '';
                }
                if (fSpec.componentMetaDatas != null && fSpec.componentMetaDatas.length > 0) {
                    v = BaseModel._generateLabelForObject(t[fSpec.name], fSpec.formatter, fSpec.componentMetaDatas);
                } else {
                    if (fSpec.isSelection) {
                        // 这个数据是一个枚举类型数据，或者独立管理的实体类数据，
                        v = t[fSpec.name][fSpec.selLabelField || ''];
                        if (v == null) {
                            v = '';
                        }
                    } else {
                        v = BaseModel._generateLabelForObject(t[fSpec.name], fSpec.formatter, fSpec.componentMetaDatas);
                    }
                }
                return v;
            case ServerDataType.ARRAY:
                if (fSpec.fieldType === t['modelName'] && fSpec.componentMetaDatas != null && fSpec.componentMetaDatas.length > 0) {
                    return BaseModel._generateLabelForObject(t, fSpec.formatter, fSpec.componentMetaDatas);
                }
                if (t[fSpec.name] == null || t[fSpec.name].length === 0) {
                    return '';
                }
                if (!fSpec.managementSeparately && fSpec.componentMetaDatas == null) {
                    return 'All ' + fSpec.label;
                }
                for (let i = 0; i < t[fSpec.name].length; ++i) {
                    if (fSpec.embedded) {
                        // 处理当数组元素是嵌入式数据的情况
                        v = v + BaseModel._generateLabelForObject(t[fSpec.name][i], fSpec.formatter, fSpec.componentMetaDatas);
                    } else if (fSpec.isSelection || (fSpec.componentMetaDatas == null && fSpec.managementSeparately)) {
                        v = v + t[fSpec.name][i][fSpec.selLabelField || ''];
                    } else {
                        v = v + BaseModel._generateLabelForObject(t[fSpec.name][i], fSpec.formatter, fSpec.componentMetaDatas);
                    }
                    if (i < (t[fSpec.name].length - 1)) {
                        v = v + ' ┋ ';
                    }
                }
                return v.trim();
            case ServerDataType.IMAGE:
                return t[fSpec.name];
            case ServerDataType.JSON:
                return t[fSpec.name];
        }
        return '';
    }

    // private static _formatNumber(v: number | string, fmt: string | undefined): string {
    //     if (!fmt) {
    //         fmt = '0.[00]';
    //     }
    //     return _fmtNum(v).format(fmt);
    // }

    private static _generateLabelForObject(elmValue: any, formatter: string | undefined, fSpecs: Array<FieldspecModel> | undefined): string {
        if (!elmValue) {
            return '';
        }
        const splitedLabel: string[] = formatter != null ? formatter.split('${') : [];
        const fieldNames: string[] = new Array<string>();
        if (splitedLabel.length > 0) {
            splitedLabel.forEach(function (s): void {
                if (s != null && s.length > 0) {
                    fieldNames.push(s.substring(0, s.indexOf('}')));
                }
            });
        }
        let value = formatter;
        if (fieldNames.length > 0) {
            fieldNames.forEach(s => {
                if (fSpecs != null && fSpecs.length > 0) {
                    let fSpec!: FieldspecModel;
                    fSpecs.forEach(fs => {
                        if (fs.name === s) {
                            fSpec = fs;
                        }
                    });
                    if (fSpec && fSpec.formatter && fSpec.formatter.length > 0) {
                        // 嵌入式数据的数据属性定义了显示格式
                        value = value?.replace('${' + s + '}', BaseModel.convertToDisplayString(elmValue, fSpec));
                    } else {
                        value = value?.replace('${' + s + '}', elmValue[s] || ('no ' + s));
                    }
                } else {
                    value = value?.replace('${' + s + '}', elmValue[s] || '');
                }
            });
        } else {
            // 在没有定义显示格式的情况下显示嵌入式数据的方式：
            value = '';
            if (fSpecs != null && fSpecs.length > 0) {
                fSpecs.forEach(fs => {
                    value = value + BaseModel.convertToDisplayString(elmValue, fs) + '; ';
                });
            }
        }
        return value || '';
    }

    static createModelForm(_formBuilder: UntypedFormBuilder, entity: BaseModel, fieldSpecs: FieldspecModel[], isNewEntity: boolean): UntypedFormGroup {
        let obj!: BaseModel;
        fieldSpecs.forEach(fSpec => {
            obj[fSpec.name || ''] = BaseModel._generateFieldForm(_formBuilder, entity, fSpec, isNewEntity);
        });
        // TODO:  obj.i18nResources = _formBuilder.array(BaseModel._generateI18nResourceArray(_formBuilder, entity == null ? undefined : entity.i18nResources));
        return _formBuilder.group(obj);
    }

    static generateFieldFormArray(_formBuilder: UntypedFormBuilder, modelForm: UntypedFormGroup, fSpec: FieldspecModel): UntypedFormArray | undefined {
        if (fSpec.name == null || fSpec.name.length == 0) {
            return;
        }
        modelForm.controls[fSpec.name] = <UntypedFormArray>_formBuilder.array([]);
        return <UntypedFormArray>modelForm.controls[fSpec.name];
    }

    static createSearchForm(_formBuilder: UntypedFormBuilder, entity: BaseModel, fieldSpecs: FieldspecModel[]): UntypedFormGroup {
        const obj = new BaseModel(entity.entityName);
        fieldSpecs.forEach(fSpec => {
            if (fSpec.isRangeValues) {
                obj[fSpec.name + '.from'] = BaseModel._generateSearchForm(_formBuilder, entity, fSpec);
                obj[fSpec.name + '.to'] = BaseModel._generateSearchForm(_formBuilder, entity, fSpec);
            } else {
                if (fSpec.name != null && fSpec.name.length > 0) {
                    obj[fSpec.name] = BaseModel._generateSearchForm(_formBuilder, entity, fSpec);
                }
            }
        });
        return _formBuilder.group(obj);
    }

    private static _generateFieldForm(_formBuilder: UntypedFormBuilder, entity: BaseModel, fSpec: FieldspecModel, isNewEntity: boolean): any {
        if (fSpec.name == null || fSpec.name.length == 0) {
            return null;
        }
        const validators: Validators[] = new Array<Validators>();
        if (fSpec.required) {
            validators.push(Validators.required);
        }
        if (fSpec.maxLength && fSpec.maxLength !== 0 && fSpec.maxLength != null) {
            validators.push(Validators.maxLength(fSpec.maxLength));
        }
        if (fSpec.minLength && fSpec.minLength != null) {
            validators.push(Validators.minLength(fSpec.minLength));
        }
        if (fSpec.dataType === ServerDataType.NUMBER) {
            if (fSpec.maxVal && fSpec.maxVal != null) {
                validators.push(Validators.max(Number.parseInt(fSpec.maxVal, 10)));
            }
            if (fSpec.minVal && fSpec.minVal != null) {
                validators.push(Validators.min(Number.parseInt(fSpec.minVal, 10)));
            }
        }

        if (fSpec.componentMetaDatas != null && fSpec.componentMetaDatas.length > 0) {
            if (fSpec.dataType === ServerDataType.OBJECT) {
                return BaseModel.createModelForm(_formBuilder, entity[fSpec.name], fSpec.componentMetaDatas, isNewEntity);
            }
            if (fSpec.dataType === ServerDataType.ARRAY) {
                if (entity != null && entity[fSpec.name] != null && entity[fSpec.name].length > 0) {
                    const controls = <UntypedFormArray>_formBuilder.array([BaseModel.createModelForm(_formBuilder, entity[fSpec.name][0], fSpec.componentMetaDatas, isNewEntity)]);
                    for (let i = 1; i < entity[fSpec.name].length; i++) {
                        controls.push(BaseModel.createModelForm(_formBuilder, entity[fSpec.name][i], fSpec.componentMetaDatas, isNewEntity));
                    }
                    return controls;
                }
                return null;
            }
        }
        let v: string | null = '';
        if (entity != null && entity[fSpec.name] != null) {
            if (fSpec.name === 'id' && isNewEntity) {
                v = null;
            } else {
                v = entity[fSpec.name];
            }
        }
        if (fSpec.selectiveItems != null && fSpec.selectiveItems.length > 0) {
            BaseModel._setSelectiveItemCheckedFlag(entity, fSpec);
        }
        if (fSpec.isSelection && fSpec.selMultiChoice) {
            const elms = new Array<BaseModel>();
            fSpec.selectiveItems?.forEach(vv => {
                const elm = BaseModel.generateModel();
                if (vv.checked) {
                    elm.id = Number.parseInt(vv.value || '', 10);
                    elms.push(elm);
                }
            });
            return _formBuilder.array(elms);
        }
        if (fSpec.dataType === ServerDataType.DATE) {
            if (v != null && v !== '') {
                return [new Date(v), validators];
            }
            return v;
        }
        if (fSpec.dataType === ServerDataType.EMAIL) {
            validators.push(Validators.email);
            return [v, validators];
        }

        return [v, validators];
    }

    private static _generateI18nResourceArray(_formBuilder: UntypedFormBuilder, resources: I18nresourceModel[] | undefined): UntypedFormGroup[] {
        const groups = new Array<UntypedFormGroup>();
        if (resources) {
            resources.forEach(resource => {
                groups.push(BaseModel._generateI18nResourceForm(_formBuilder, resource));
            });
        }
        return groups;
    }

    private static _generateI18nResourceForm(_formBuilder: UntypedFormBuilder, i18nRes: I18nresourceModel): UntypedFormGroup {
        return _formBuilder.group({
            id: i18nRes.id,
            i18nKey: i18nRes.i18nKey,
            languageId: i18nRes.languageId,
            i18nValue: i18nRes.i18nValue
        });
    }

    private static _setSelectiveItemCheckedFlag(entity: BaseModel, fSpec: FieldspecModel): void {
        if (fSpec.name == null || fSpec.name.length == 0) {
            return;
        }
        if (entity == null || entity[fSpec.name] == null) {
            return;
        }
        fSpec.selectiveItems?.forEach(selectiveItem => {
            if (fSpec.name != null && fSpec.name.length > 0) {
                const dataType: string = fSpec.dataType || '';
                if (dataType === ServerDataType.ARRAY) {
                    selectiveItem.checked = BaseModel._containValue(entity[fSpec.name], selectiveItem.value);
                } else if (dataType === ServerDataType.OBJECT) {
                    selectiveItem.checked = (entity[fSpec.name].id === Number.parseInt(selectiveItem.value || '', 10));
                } else if (dataType === ServerDataType.BOOLEAN) {
                    selectiveItem.checked = ((entity[fSpec.name] + '') === selectiveItem.value);
                } else {
                    if (entity[fSpec.name] && entity[fSpec.name].length > 0) {
                        selectiveItem.checked = (entity[fSpec.name] === selectiveItem.value
                            || entity[fSpec.name] === selectiveItem.label);
                    }
                }
            }
        });
    }

    private static _containValue(values: Array<BaseModel> | undefined, curValue: string | undefined): boolean {
        if (values) {
            for (let i = 0; i < values.length; i++) {
                const v: number = values[i].id || 0;
                if (Number.parseInt(curValue || '', 10) === v) {
                    return true;
                }
            }
        }
        return false;
    }


    private static _generateSearchForm(_formBuilder: UntypedFormBuilder, entity: BaseModel, fSpec: FieldspecModel): any {
        if (fSpec.name == null || fSpec.name.length == 0) {
            return null;
        }
        if (fSpec.isIndirectUpdate && fSpec.name !== 'id' && !fSpec.i18nKeyField) {
            return null;
        }
        if (fSpec.componentMetaDatas != null && fSpec.componentMetaDatas.length > 0) {
            if (fSpec.dataType === ServerDataType.OBJECT) {
                return BaseModel.createSearchForm(_formBuilder, entity[fSpec.name], fSpec.componentMetaDatas);
            }
            if (fSpec.dataType === ServerDataType.ARRAY) {
                const controls = <UntypedFormArray>_formBuilder.array([BaseModel.createSearchForm(_formBuilder, entity[fSpec.name], fSpec.componentMetaDatas)]);
                return controls;
            }
        }
        let v = '';
        if (entity != null && entity[fSpec.name] != null) {
            v = entity[fSpec.name];
        }
        if (fSpec.selectiveItems != null && fSpec.selectiveItems.length > 0) {
            BaseModel._setSelectiveItemCheckedFlag(entity, fSpec);
        }
        if (fSpec.isSelection && fSpec.selMultiChoice) {
            const elms = new Array<BaseModel>();
            fSpec.selectiveItems?.forEach(vv => {
                const elm = BaseModel.generateModel();
                if (vv.checked) {
                    elm.id = Number.parseInt(vv.value || '', 10);
                    elms.push(elm);
                }
            });
            return _formBuilder.array(elms);
        }
        if (fSpec.dataType === ServerDataType.DATE) {
            if (v !== '') {
                return [new Date(v)];
            }
            return v;
        }
        if (fSpec.dataType === ServerDataType.EMAIL) {
            return [v, [Validators.email]];
        }
        if (fSpec.dataType === ServerDataType.NUMBER) {
            return [v];
        }
        return [v];
    }
}

export class Attachment extends BaseModel {
    uploadTime?: Date;
    description?: string;
    uri?: string;
    fileInfo?: FileInfo;
    isPrivate?:boolean;
    
    static getImageTrueURI(attachment?: Attachment): string {
        if (attachment == null) {
            return '';
        }
        if (HasStringValue(attachment.uri)) {
            return attachment.uri!;
        }
        return attachment.fileInfo?.hashFileName || '';
    }

    static getImagesTrueUri(attachments?: Array<Attachment>): Array<string> {
        if (ArrayIsEmpty(attachments)) {
            return [];
        }
        let ss = new Array<string>();
        attachments?.forEach(attachment => {
            let s = Attachment.getImageTrueURI(attachment);
            if (HasStringValue(s)) {
                ss.push(s);
            }
        });
        return ss;
    }
    static getUriFromFileInfo(att?:Attachment):Attachment|undefined{
        if(att==null){
            return att;
        }
        if (HasStringValue(att.uri)) {
            return att;
        }else if(HasStringValue(att.fileInfo?.content)){
            att.uri = att.fileInfo?.content;
        return att;
        }
        return att;
    }

    static convertToImageSrc(item:Attachment):string{
      if (item.fileInfo?.content != null) {
        return item.fileInfo?.content;
      } else if (item.fileInfo?.byteContent!=null) {
        return('data:image/'+(item.fileInfo?.fileType||'jpeg')+';base64,'+item.fileInfo?.byteContent);
      } 
        return item.uri || '';
    }
}

export class SizeAndWeight {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
}

export enum InputType {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    SINGLE_SELECT = 'singleSelect',
    MULTI_SELECT = 'multipleSelect',
    AUTOCOMPLETE = 'autocomplete',
    DATE = 'date',
    DATETIME = 'datetime',
    DATE_RANGE = 'dateRange',
    NUMBER_RANGE = 'numberRange',
    I18NTEXT = 'textfori18n',
    EMAIL = 'email',
    FILE = 'file',
    EMBEDDED = 'embedded',
    JSON = 'json',
    IMAGE = 'image'
}

export enum ServerDataType {
    NUMBER = 'number',
    EMAIL = 'email',
    STRING = 'string',
    BOOLEAN = 'boolean',
    FILE = 'file',
    DATE = 'date',
    OBJECT = 'object',
    ARRAY = 'array',
    IMAGE = 'image',
    JSON = 'json'
}

export enum SearchType {
    NONE = 'NONE',
    VALUE = 'VALUE',
    ENUMVALUE = 'ENUMVALUE',
    RANGE = 'RANGE'
}

// 暂时放弃该实现方案，把业务模型中需要上传的数据直接转换成base64之后提交给后端。代码中注释为file-plan1为与该方案相关的部分
// 保存业务模型中的文件型数据， fieldName为使用'-'分开的级联名称
// 按照数组的方式组织文件名：
// 存在的组合情况：
// 属性名-null： 业务模型的属性是文件类型
// 属性名-下标： 业务模型的属性是文件类型数组
// 属性名-null-属性名-null： 业务模型的属性是业务模型（属性业务模型），属性业务模型的属性是文件类型
// 属性名-null-属性名-下标： 业务模型的属性是业务模型（属性业务模型），属性业务模型的属性是文件类型数组
// 属性名-下标-属性名-null： 业务模型的属性是业务模型数组（属性业务模型），属性业务模型的属性是文件类型
// 属性名-下标-属性名-下标： 业务模型的属性是业务模型数组（属性业务模型），属性业务模型的属性是文件类型数组
export class FileInfoDesc {
    id?: number; // 文件类型属性所属业务类型的ID值
    fieldName?: string;
    file?: FileInfo;
}

export class FileInfo {
    fileType?: string;
    content?: string;
    byteContent?: any;
    fileName?: string;
    hashFileName?: string;
    blobContent?: File;
}

// 对应后端的com.polarj.common.web.model.ClientRequest<T>
export class ClientRequest {
    nonceToken?: string;
    data: any;
    captchaResp?: string;
}

// 对应后端的com.polarj.common.StatusInfo
export class StatusInfo {
    referenceNo?: string;
    error?: boolean;
    code?: string;
    desc?: string;
}


// 对应后端的com.polarj.common.web.model.ServerResponse<T>
export class ServerResponse {
    nonceToken?: string;
    totalRecords?: number;
    totalPages?: number;
    currentPageIndex?: number;
    pageSize?: number;
    dataList?: Array<any>;
    statusList?: Array<StatusInfo>;

    addErrorMessage(errCode: string, errMsg: string): void {
        if (!this.statusList) {
            this.statusList = new Array<StatusInfo>();
        }
        const statInfo = new StatusInfo();
        statInfo.error = true;
        statInfo.desc = errMsg;
        statInfo.code = errCode;
        this.statusList.push(statInfo);
    }
}

export class PagingData<T> {
    totalRecords?: number;
    totalPages?: number;
    currentPageIndex?: number; // 从0!!!开始
    pageSize?: number;
    dataList?: Array<T>;
}

export class SearchFilter {
    criteria?: BaseModel;
    smartSearchText?: string|null;
    filters?: Array<CustomFilter>;
}

export class MerchSearchFilter {
    smartSearchText?: string|null;
    hasCoupon?:boolean;
    hasDiscount?:boolean;
    freeShipping?:boolean;
    mainVariant?:number;
    rangeValues?:Array<RangeValueForSearching>;
    enumValuesForSearching?:Array<EnumValuesForSearching>;
    category?:{id:string};
    shopCode?:string;
}

export class CustomFilter {
    filterName?: string;    // fieldName
    subFieldName?: string;  // fieldName 对应业务模型的 fieldName
    valueFrom?: string;     // 如果有多个值， 则创建多个相同的fieldName
    valueTo?: string;
}

export class SelectiveItem {
    value?: string;
    label?: string;
    checked?: boolean;
    // 数据中保存的是业务模型其他属性的缺省值
    // 应用场景举例：
    // 1. 一个被管理的服务内容会有固定收费
    // 2. 创建收据时引入该服务内容，但是收费的数据可以被修改
    defaultValue?: object = undefined;
}

export class SortType {
    fieldName?: string;
    desc?: boolean;         // desc: 是否为降序
}