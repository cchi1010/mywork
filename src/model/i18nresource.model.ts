import { BaseModel, ServerDataType } from "./base.model";
import { FieldspecModel } from "./model.metadata";

export class I18nresourceModel extends BaseModel {
    constructor() {
        super('I18nResource');
    }
    i18nKey?: string;
    languageId?: string;
    i18nValue?: string;


    static getFieldResources(entity: BaseModel, fSpec: FieldspecModel, fSpecs: FieldspecModel[] | undefined): I18nresourceModel[] {
        if (fSpec.componentMetaDatas && fSpec.componentMetaDatas.length > 0) {
            fSpec.componentMetaDatas.forEach(subfSpec => {
                if (fSpec.name != null && fSpec.name.length > 0 && entity[fSpec.name] != null) {
                    if (fSpec.dataType === ServerDataType.ARRAY) {
                        if (entity[fSpec.name].length > 0) {
                            for (const subEntity of entity[fSpec.name]) {
                                subfSpec.i18nResourcesForField = I18nresourceModel.getFieldResources(subEntity, subfSpec, fSpec.componentMetaDatas);
                            }
                        }
                    } else if (fSpec.dataType === ServerDataType.OBJECT) {
                        subfSpec.i18nResourcesForField = I18nresourceModel.getFieldResources(entity[fSpec.name], subfSpec, fSpec.componentMetaDatas);
                    }
                }
            });
        }
        if (fSpec.isSelection || !entity || !fSpec.i18nField) {
            return [];
        }
        let res: I18nresourceModel[] = [];
        const i18nKey = I18nresourceModel._getI18nKey(entity, fSpec, fSpecs);
        if (entity.fieldI18nResources) {
            let hasI18nKey = false;
                if (entity.fieldI18nResources[i18nKey] != null) {
                    res = entity.fieldI18nResources[i18nKey];
                    hasI18nKey = true;
                }
            if (!hasI18nKey) {
                res = new Array<I18nresourceModel>();
                entity.fieldI18nResources[i18nKey] = res;
            }
        } else {
            entity.fieldI18nResources = {};
            entity.fieldI18nResources[i18nKey] = new Array<I18nresourceModel>();
            res = entity.fieldI18nResources[i18nKey];
        }
        return res;
    }

    static splitI18nResources(entity: BaseModel, i18nResources?: I18nresourceModel[], fSpecs?: FieldspecModel[]): void {
        if (i18nResources == null || i18nResources.length === 0) {
            // do not have resource in the entity
            return;
        }
        if (fSpecs == null || fSpecs.length == 0) {
            return;
        }
        // it could be multiple fields with i18n resource, so we split into different field.
        entity.fieldI18nResources = {};
        const i18nKeys: string[] = new Array<string>();
        for (let i = 0; i < i18nResources.length; i++) {
            if (i18nResources[i] != null && i18nResources[i].i18nKey != null) {
                if ((i18nResources[i].i18nKey?.length || 0) > 0 && !i18nKeys.includes(i18nResources[i].i18nKey || '')) {
                    i18nKeys.push(i18nResources[i].i18nKey || '');
                }
            }
        }

        for (let j = 0; j < i18nKeys.length; j++) {
            const i18nValues: I18nresourceModel[] = new Array<I18nresourceModel>();
            for (let i = 0; i < i18nResources.length; i++) {
                if (i18nResources[i].i18nKey === i18nKeys[j]) {
                    i18nValues.push(i18nResources[i]);
                }
            }
            entity.fieldI18nResources[i18nKeys[j]] = i18nValues;
        }

        for (let i = 0; i < (fSpecs?.length || 0); i++) {
            if (fSpecs[i].componentMetaDatas != null && (fSpecs[i].componentMetaDatas?.length || 0) > 0 && entity[fSpecs[i].name || '']) {
                if (fSpecs[i].dataType !== ServerDataType.ARRAY) {
                    this.splitI18nResources(entity[fSpecs[i].name || ''],
                        entity[fSpecs[i].name || ''].i18nResources, fSpecs[i].componentMetaDatas);
                } else {
                    for (let j = 0; j < entity[fSpecs[i].name || ''].length; j++) {
                        this.splitI18nResources(entity[fSpecs[i].name || ''][j],
                            entity[fSpecs[i].name || ''][j].i18nResources, fSpecs[i].componentMetaDatas);
                    }
                }
            }
        }
    }

    private static _getI18nKey(e: BaseModel, f: FieldspecModel, fSpecs: FieldspecModel[] | undefined): string {
        if (fSpecs == null || fSpecs.length == 0) {
            return '';
        }
        let i18nKeyField: string = '';
        let i18nKeyFieldValue = 'pending';
        const curFms = fSpecs;
        for (let i = 0; i < curFms.length; i++) {
            if (curFms[i].i18nKeyField) {
                i18nKeyField = curFms[i].classFullName + '.' + f.name;
                if (e[curFms[i].name || '']) {
                    i18nKeyFieldValue = e[curFms[i].name || ''];
                }
                break;
            }
        }
        if (i18nKeyField != null) {
            return i18nKeyField + '.' + i18nKeyFieldValue;
        }
        return '';
    }

}
