import { PjDropdownItem } from "src/component/components.global";
import { BaseModel } from "./base.model";

export class FunctionalityModel extends BaseModel {
    constructor() {
        super('Functionality');
    }
    hasSubMenu?: boolean;
    hasParentMenu?: boolean;
    code?: string;
    label?: string;
    preIconName?: string; // 显示在菜单前面的图标
    iconName?: string;
    positionSn?: number;
    serviceName?: string;
    pathUrl?: string;
    active?: string;

    type?: string;                          // TOOLBAR_MENU/NAV_MENU/MODEL_CLASS_OPERATION/MODEL_INSTANCE_OPERATION
    parentMenu?: FunctionalityModel;
    subMenus?: FunctionalityModel[];
    mainMenu?: boolean;
    // 这是一个批量的操作，针对类操作有效
    // 当一个操作是批量操作的时候， 可以选择多个实例
    batchOperation?: boolean;

    // 需要显示的数字信息，比如在按钮上显示有多少条未读信息，或者是订单数量啥的
    badgeNumber?: number;

    // 是否需要回头支持
    supportBackToLastUsedUrl?: boolean;


    static convertToPjDropdownItem(fun: FunctionalityModel): PjDropdownItem | undefined {
        if (fun == null || fun.label == null) {
            return undefined;
        }
        let pdi: PjDropdownItem = { label: fun.label };
        pdi.position = fun.positionSn;
        pdi.iconName = fun.iconName + '.outlined';
        pdi.actionString = fun.pathUrl;
        return pdi;
    }

    static compare(f1: FunctionalityModel, f2: FunctionalityModel): number {
        return (f1.positionSn || 0) - (f2.positionSn || 0);
    }
}
