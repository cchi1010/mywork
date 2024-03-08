import { Injectable } from "@angular/core";
import { Observable, map, from, filter } from "rxjs";
import { HasStringValue, PjKeyValue, PjFieldValue } from "src/component/components.global";
import { BaseModel, PagingData, ServerDataType, StatusInfo } from "src/model/base.model";
import { FieldspecModel, ModelspecModel } from "src/model/model.metadata";
import { PolarJService } from "./polarj.service";
import { TIMEFILTER } from "src/ammall/am-model/ammall-seller.data";



// 1. 所有方法都需要:
//    moduleServiceName: 后端组件服务的名称 (全部转变为小写)
//    modelName: moduleService下的业务模型名称 (全部转变为小写)
// 2. 访问后端服务的链接组成：
//    location.protocol(http: 或者 https:) + '//' + environment.backendHost + ':' 
//        + environment.backendPort + '/' + moduleServiceName + '/' + modelName + '/' 
//        + 服务器后端的 ModelController中的 GetMapping/PostMapping/...等中的值，以及对应
//        方法需要写在URL中的参数
// 3. 返回值为ServiceResponse中的 dataList 或者 PagingData
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  protected _moduleServiceName = '';

  protected getModuleServiceName(): string {
    return '';
  }

  constructor(protected _polarjService: PolarJService) {
    this._moduleServiceName = this.getModuleServiceName();
  }

  getStartEndTime(filter: string): Array<string> {
    let _start = '';
    let _end = new Date().toISOString();
    const now = new Date();
    switch (filter) {
      case TIMEFILTER.PAST7D:
        _start = (new Date((new Date).getTime() - 7 * 24 * 3600 * 1000)).toISOString();
        break;
      case TIMEFILTER.PAST30D:
        _start = (new Date((new Date).getTime() - 30 * 24 * 3600 * 1000)).toISOString();
        break;
      case TIMEFILTER.PAST3M:
        _start = (new Date(now.getFullYear(), now.getMonth() - 3, 1)).toISOString();
        break;
      case TIMEFILTER.PAST6M:
        _start = (new Date(now.getFullYear(), now.getMonth() - 6, 1)).toISOString();
        break;
      case TIMEFILTER.PAST9M:
        _start = (new Date(now.getFullYear(), now.getMonth() - 9, 1)).toISOString();
        break;
      case TIMEFILTER.PASTY:
        _start = (new Date(now.getFullYear() - 1, now.getMonth(), now.getDay())).toISOString();
        break;
      case TIMEFILTER.PAST1Y:
        _start = (new Date(now.getFullYear() - 1, 0, 1)).toISOString();
        _end = (new Date(now.getFullYear() - 1, 11, 31)).toISOString();
        break;
      case TIMEFILTER.PAST2Y:
        _start = (new Date(now.getFullYear() - 2, 0, 1)).toISOString();
        _end = (new Date(now.getFullYear() - 2, 11, 31)).toISOString();
        break;
      case TIMEFILTER.PAST3Y:
        _start = (new Date(now.getFullYear() - 3, 0, 1)).toISOString();
        _end = (new Date(now.getFullYear() - 3, 11, 31)).toISOString();
        break;
      case TIMEFILTER.PAST4Y:
        _start = (new Date(now.getFullYear() - 4, 0, 1)).toISOString();
        _end = (new Date(now.getFullYear() - 4, 11, 31)).toISOString();
        break;
      case TIMEFILTER.PAST5Y:
        _start = (new Date(now.getFullYear() - 5, 0, 1)).toISOString();
        _end = (new Date(now.getFullYear() - 5, 11, 31)).toISOString();
        break;
      case TIMEFILTER.PAST6Y:
        _start = (new Date(now.getFullYear() - 6, 0, 1)).toISOString();
        _end = (new Date(now.getFullYear() - 6, 11, 31)).toISOString();
    }
    return [_start, _end];
  }

  // 用searching string 做基于业务模型的模糊搜索，
  // 获取该业务模型供选择的数据集，数据集中的数据应该是：唯一字段（目前是id），显示字段
  // ModelController.getSelectionValues
  fetchSelectionData(modelName: string, searchingString: string): Observable<string[]> {
    return this._polarjService.getCall({
      moduleServiceName: this._moduleServiceName,
      modelName: modelName,
      requestMappingString: 'selectionvalue',
      urlPara: 'searchString=' + searchingString
    });
  }

  // ViewModelController.getModelMetadata
  fetchMetadata(modelName: string): Observable<ModelspecModel[]> {
    return this._polarjService.getCall({ moduleServiceName: this._moduleServiceName, modelName: modelName, requestMappingString: 'metadata' });
  }

  // @PostMapping("quickSearch"), ModelController.searchBySmartText
  fetchEntitiesBySmartText(modelName: string, smartText: string, pageIndex: number, pageSize: number, sortField?: string, sortDesc?: boolean): Observable<PagingData<BaseModel>> {
    if (HasStringValue(smartText)) {
      let urlPara = 'pageIndex=' + pageIndex + '&pageSize=' + pageSize;
      if (HasStringValue(sortField)) {
        urlPara = 'field=' + sortField;
      }
      if (sortDesc != null) {
        urlPara = urlPara + '&desc=' + sortDesc ? 'true' : 'false';
      }
      return this._polarjService.postCall({
        moduleServiceName: this._moduleServiceName, modelName: modelName,
        requestMappingString: 'quickSearch',
        urlPara: urlPara, para: smartText, pageData: true
      });
    } else {
      return this.fetchEntities(modelName);
    }
  }


  // 1. @PostMapping("search"), ModelController.searchByCriteria
  // 2. @PostMapping("relatedsearch"), ModelController.searchByRelatedId
  fetchEntities(modelName: string, cri?: BaseModel): Observable<PagingData<BaseModel>> {
    let requestMappingString = '';
    let urlPara = '';
    if (cri && cri.relatedId && cri.relatedId > 0) {
      requestMappingString = 'relatedsearch';
      urlPara = 'relatedId=' + cri.relatedId;
    } else {
      requestMappingString = 'search?';
    }
    if (cri && cri.sortField && cri.sortField.length > 0) {
      if (cri.relatedId && cri.relatedId > 0) {
        urlPara = urlPara + '&';
      }
      urlPara = urlPara + 'field=' + cri.sortField;
      if (cri.sortDesc) {
        urlPara = urlPara + '&desc=true';
      }
    }
    return this._polarjService.postCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: requestMappingString, urlPara: urlPara,
      para: cri, pageData: true
    }).pipe(
      filter(v => v != null),
      map(pagingResult => {
        pagingResult.pageSize = cri?.curPageSize || 1;
        return pagingResult;
      }));
  }

  // @GetMapping("{id}"), ModelController.getEntity
  fetchEntityById(modelName: string, id: number): Observable<BaseModel> {
    return this._polarjService.getCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: '' + id, enableErrorMsg: true, singleData: true
    });
  }

  // @GetMapping("byCode/{code}"), ModelController.getEntity
  fetchEntityByCode(modelName: string, code: string): Observable<BaseModel> {
    return this._polarjService.getCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: 'byCode/' + code, enableErrorMsg: true, singleData: true
    });
  }

  // @GetMapping("byNumber/{number}"), ModelController.getEntity
  fetchEntityByNumber(modelName: string, number: string): Observable<BaseModel> {
    return this._polarjService.getCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: 'byNumber/' + number, enableErrorMsg: true, singleData: true
    });
  }
  // 1. @PostMapping("{id}"), ModelController.updateEntity
  // 2. @PostMapping(value = {""}), ModelController.createEntity
  saveEntity(modelName: string, m: BaseModel): Observable<BaseModel> {
    this._resetEmptyStringToNull(m);
    return this._polarjService.postCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: '' + (m.id || ''), para: m, enableErrorMsg: true, singleData: true
    });
  }

  // @PostMapping("remove-request"), ModelController.removeEntities
  deleteEntities(modelName: string, ids: Array<number>): Observable<number> {
    if (ids == null || ids.length == 0) {
      return from([0]);
    }
    return this._polarjService.postCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: 'remove-request',
      urlPara: 'ids=' + ids.join(','), enableErrorMsg: true, singleData: true
    });
  }

  // @PostMapping("{id}/remove"), ModelController.removeById
  deleteEntityById(modelName: string, id: number): Observable<boolean> {
    return this._polarjService.postCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: id + '/remove',
      enableErrorMsg: true, singleData: true
    });
  }
  // @PostMapping("{id}/remove"), ModelController.removeById
  deleteEntityByIdWithAllVariants(modelName: string, id: number): Observable<boolean> {
    return this._polarjService.postCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: id + '/removeExt',
      urlPara: 'includeAllVariants=1',
      enableErrorMsg: true, singleData: true
    });
  }


  // @GetMapping("downloadtemplate"), ModelController.downloadUploadTemplate
  downloadUploadTemplate(modelName: string): void {
    // TODO: 
  }

  downloadAllData(modelName: string, sortField: string, sortDesc: boolean,
    pageIndex: number, pageSize: number, sorts: string[], criteria: any): void {
    this._polarjService.downloadPostCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: 'downloadAllData',
      urlPara: 'field=' + sortField + '&desc=' + sortDesc + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize,
      para: criteria, enableErrorMsg: true
    })
  }
  // @PostMapping("reassignedTo"), ModelController.reassignedToNewOwner
  assignNewOwner(modelName: string, ids: Array<number>, newOwnerId: number): Observable<number> {
    if (ids == null || ids.length == 0) {
      return from([0]);
    }
    return this._polarjService.postCall({
      moduleServiceName: this._moduleServiceName, modelName: modelName,
      requestMappingString: 'reassignedTo',
      urlPara: 'ownerId=' + newOwnerId + '&ids=' + ids.join(','),
      enableErrorMsg: true, singleData: true
    });
  }

  private _resetEmptyStringToNull(entity: BaseModel): void {
    const properties = Object.getOwnPropertyNames(entity);
    const that = this;
    properties.forEach(property => {
      if (entity[property] === '') {
        // 浏览器兼容性代码， 如果不判断属性的可写性，在EDGE下会出错
        const d = Object.getOwnPropertyDescriptor(entity, property);
        if (d?.writable) {
          entity[property] = null;
          if (entity.valueRemovedFields == null) {
            entity.valueRemovedFields = new Array<string>();
          }
          entity.valueRemovedFields.push(property);
        }
      } else if (entity[property] !== null && (typeof entity[property] === 'object')) {
        that._resetEmptyStringToNull(entity[property]);
      }
    });
  }

  static generateModelValuesForDetail(rowData: BaseModel, fieldSpecs?: Array<FieldspecModel>): PjKeyValue<Array<PjFieldValue | Array<PjFieldValue>>> {
    let _modelData: PjKeyValue<Array<PjFieldValue | Array<PjFieldValue>>> = {};
    _modelData['_all'] = new Array<PjFieldValue | Array<PjFieldValue>>();
    fieldSpecs?.forEach(fSpec => {
      if (FieldspecModel.isNormalField(fSpec)) {
        _modelData['_all'].push({ label: fSpec.label || '', textValue: BaseModel.convertToDisplayString(rowData, fSpec) });
      } else {
        if (HasStringValue(fSpec.name) && _modelData[fSpec.name!] == null) {
          _modelData[fSpec.name!] = new Array<PjFieldValue>();
        }
        let compsMetaData = fSpec.componentMetaDatas;
        if (fSpec.dataType === ServerDataType.OBJECT) {
          compsMetaData?.forEach(subFSpec => {
            _modelData[fSpec.name!].push({ label: subFSpec.label || '', textValue: BaseModel.convertToDisplayString(rowData[fSpec.name!], subFSpec) });
          });
        } else if (fSpec.dataType === ServerDataType.ARRAY) {
          if (rowData[fSpec.name!] != null) {
            let _fieldModelData = new Array<PjFieldValue>();
            (rowData[fSpec.name!] as Array<BaseModel>).forEach(fieldValue => {
              _fieldModelData.push({ label: '_fieldTitle', textValue: BaseModel.convertToDisplayString(fieldValue, fSpec) });
              compsMetaData?.forEach(subFSpec => {
                _fieldModelData.push({ label: subFSpec.label || '', textValue: BaseModel.convertToDisplayString(fieldValue, subFSpec) });
              });
            });
            _modelData[fSpec.name!].push(_fieldModelData);
          }
        }
      }
    });
    return _modelData;
  }
}