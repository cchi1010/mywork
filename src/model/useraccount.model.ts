import { HasStringValue, PjAddress } from "src/component/components.global";
import { Attachment, BaseModel } from "./base.model";

export class UseraccountModel extends BaseModel {

    constructor() {
        super('UserAccount');
    }

    anonUser?: boolean;
    loginName?: string;
    nickName?: string;
    password?: string;
    newPassword?: string;
    defaultRole?: string;
    status?: string;
    admin?: boolean;
    // logoImage?: string;
    userSetting?: UserconfigModel;
    contact?: PjAddress;
    userAccountRoles?: BaseModel[];

    // 登录后或者刷新页面时从后端获取的相关信息
    userId?: number;
    viewLanguageId?: string;
    workLanguageId?: string;
    pageSize?: number;
    roleCodes?: string[];
    jwtToken?: string;
    profilePicture?: Attachment;

    isExpired?: boolean;


    captchaResp?: string; // 用于传递登录时候的captcha字符串
    // 登录后或者刷新页面时从后端获取的相关信息
    static createEntity(entity: UseraccountModel): UseraccountModel {
        if (entity == null) {
            const ua = new UseraccountModel();
            ua.userSetting = new UserconfigModel();
            ua.contact = new BaseModel('Contact');
            return ua;
        } else {
            if (entity.contact == null) {
                entity.contact = new BaseModel('Contact');
            }
            if (entity.userSetting == null) {
                entity.userSetting = new UserconfigModel();
            }
            return entity;
        }
    }

    static validForRegister(useracc: UseraccountModel): boolean {
        if(!HasStringValue(useracc.loginName)) {
            return false;
        }
        if(!HasStringValue(useracc.nickName)) {
            return false;
        }
        if(!HasStringValue(useracc.password)) {
            return false;
        }
        return true;
    }

    static validForSellerRegister(useracc: UseraccountModel): boolean {
      if(!HasStringValue(useracc.loginName)) {
          return false;
      }
      if(!HasStringValue(useracc.password)) {
          return false;
      }
      return true;
  }

    // 服务器暂时没有业务模型属性：
}

export class UserconfigModel extends BaseModel {
    constructor() {
        super('UserAccountConfig');
    }
    viewLang?: string;
    workLang?: string;
    pageSize?: number;
    hiddenFields?: string;
    tableHiddenFields?: string;
    firstPageUrl?: string;
}
