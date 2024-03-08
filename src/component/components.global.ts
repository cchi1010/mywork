import { TemplateRef, Type } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PJ_CARD_TYPE } from 'src/app/app.constant';

export interface PjToolbarMenuItem {
  id: number,
  title: string,
}

export interface PjCheckboxItem {
  label?: string;
  value: string;
  checked?: boolean;
  checkedAll?: boolean;
  disabled?: boolean;
}

export interface PjRadioItem {
  label?: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface PjShopItem {
  shopName?: string;
  sponsoredLabel?: string;
}

export interface PjProductItem {
  id?: string;
  image?: PjImageData;
  name?: string;
  number?: string;
  price?: string;
  company?: string;
}

export interface PjProgressStepData {
  status: 'done' | 'current' | 'coming';
  label: string;
  labelColor?: string;
  description?: string;
  lastStep?: boolean;
}

export interface PjRemoveData {
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  title?: string;
  description?: string;
  contentAlign?: string;

}

export interface PjNavbarGroupData {
  groupId: number,
  label: string,
  iconName?: string,
  iconColorType?: string, // 使用PJ_COMPONENT_STYLE
  items: Array<PjNavbarItemData>,
}

export interface PjNavbarItemData {
  id: number,
  groupId?: number,
  title: string,
  imageSrc?: string,
  actived?: boolean,
  subs?: Array<PjNavbarItemData>,
  topicElm?: HTMLElement,
}

export interface PjVideoData {
  index?: number;
  label?: string;
  videoSrc?: string;
  videoType?: string;//PjVideoType;
  width?: number;
  height?: number;
  borderColor?: string;
  actionString?: string;
  thumnbnailSrc?: string;
  noMouseEffection?: boolean; //是否支持hover和press事件，缺省为有。
  badgeLabel?: string;
}

export interface PjTextEntryData {
  labelled?: boolean; // = false;
  label?: string; // = '';
  assistiveText?: string;
  error?: boolean; // = false;
  // errorMsg?: string;
  groupErrorMsg?: string;   // 该组件会显示多属性验证的错误信息
  disabled?: boolean; // = false;
  focused?: boolean; // = false;
  passwordEnabled?: boolean; // = false;
  placeholder?: string;
  leftPadding?: number;
  rightPadding?: number;
  ignoreBlank?: true;
  maxLength?: number;         // 如果有最大长度校验，设置该值可以是输入框只接受这个值指定的字符个数，UTF8下，一个汉字算一个字符
}

export interface PjSwitchData {
  label?: string;
  description?: string;
  enableIconName?: string;
  disableIconName?: string;
  status?: boolean;
}

export interface PjSliderData {
  min: number;          // 范围最小值
  max: number;          // 范围最大值
  lowValue: number;     // 输入的最小值
  highValue?: number;    // 输入的最大值
  interval?: number;     // 最小值和最大值的最小间隔
  valueShown: boolean;  // 是否显示输入的值
  rangeShown: boolean;  // 是否显示范围值
  rangeLabelLocation: string // 范围值显示的位置： 两端both-ends/下面beneath
}

export interface PjCollapsibleSideData {
  consendedIconName: string;
  title?: string;
  closeBtnName?: string;
  closeBtnType?: string;
  folded?: boolean;
  foldedWith?: number;
  width?: number;
}

export interface PjHelperItem {
  style?: string; // value must be one of the const PJ_COMPONENT_STYLE
  title?: string;
  description: string;
  iconName?: string;
  iconClass?: string;
}

export type PjDividerType = 'strong' | 'subtle' | undefined;

export const PjDivderTypeConst = {
  STRONG_DIVIDER: 'strong',
  SUBTLE_DIVIDER: 'subtle',
};

export interface PjDataLabelValue {
  label: string;
  value: string;
}

export interface PjConfirmationData {
  imageSrc: string;
  title: string;
  description: string;
  loginUserEmail: string;
}

export interface PjChipData {
  label: string;
  imageSrc: string;
  selected: boolean;
}

export interface PjArrowGroupData {
  btnType: 'text' | 'elevated';
  btnSize: 'lg' | 'xl';
  hasMask?: boolean;
  forwardDisabled?: boolean;
  backwardDisabled?: boolean;
}

export interface PjAlertData {
  title?: string;
  descriptions?: Array<string>;
  actions?: Array<PjAction>;
  linkAction?: PjAction;
  closeable?: boolean;
}

export interface PjAccordionData {
  iconName?: string;
  label: string;
  description?: string;
  expanded?: boolean;
}

export interface PjStepData {
  index: number;
  title: string;
  value: string;
  enableItemClick?: boolean;  // 是否允许单击标题到对应步骤
  templateRef?: TemplateRef<any> | undefined;
  urlString?: string;
  stepStatus?: PjStepStatus;
  valid?: boolean;        // 该步骤的数据是有效的
  disabled?: boolean;     // 不能去该步骤的页面
}

export enum PjStepStatus {
  ONGOING,
  COMPLETED,
  PENDING
}

export interface PjBreadcrumbItem {
  id?: number;
  label?: string;
  path?: string;
}

export interface PjFieldValue {
  label: string;
  textValue?: string;
  actionValue?: PjAction;
  stringArray?: Array<string>;
  iconPlace?: string;       //设计中新加的位置，标记icon的位置，left或right，如为空值则为right
}

export type PjTabType = 'underlined' | 'pill' | 'text' | 'outlined';
export const PjTabTypeConst = {
  UNDERLINED: 'underlined' as PjTabType,
  PILL: 'pill' as PjTabType,
  TEXT: 'text' as PjTabType,
  OUTLINED: 'outlined' as PjTabType
}

export interface PjTabItemData {
  iconName?: string;
  title: string;
  value?: string;
  badge?: string;
  isActived: boolean;
  contentTemplateRef?: TemplateRef<any>;
}

export interface PjSideMenuItem {
  iconName?: string;
  label: string;
  focused?: boolean;
  expanded?: boolean;
  // item: 没有子菜单，则直接是功能，如果有子菜单，则显示有展开icon，
  // group: 没有子菜单，则只显示该项， 有子菜单，则所有子菜单在其下直接展开
  // divider: 显示分割线
  type: 'item' | 'group' | 'divider';
  badge?: string;
  actionString?: string;
  children?: Array<PjSideMenuItem>;
}

export interface PjDropdownItem {
  iconName?: string;                  // 图标，显示在 label+description 左边
  imageName?: string;                 // 被设置了宽度和高度的图片， 显示在 label+description 左边
  position?: number;                  // item的排序参数
  label: string;                      // Item显示的内容
  value?: string;                     // 作为下拉选项，该选项的值
  description?: string;               // Label下显示的内容
  badgeLabel?: string;                // 在 Item 右边显示的徽章
  groupName?: string;                 // 有相同group name的 toggleable item 只能选其中之一
  groupMadatory?: boolean;            // 在同一组中必须选一个
  toggleable?: boolean;               // 可（选/不选）的项
  selected?: boolean;                 // 该项（toggleable=true）被选中
  divider?: boolean;                  // 仅仅是个分割符，该值为真，则其他值都没有意义
  actionString?: string;              // 如果是菜单项目，单击该项的操作
  disabled?: boolean;                 // 是否禁止点击的项
  subMenus?: Array<PjDropdownItem>;   // 下一级下拉项

}

export function comparePjDropdownItem(i1: PjDropdownItem, i2: PjDropdownItem): number {
  let r: number = 0;
  if (i1.position != null && i2.position != null) {
    r = (i1.position - i2.position);
  } else {
    r = i1.label.localeCompare(i2.label);
  }
  return r;
}

export const PJ_ALIGN_TYPE = {
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right'
}

export const PJ_COMPONENT_CONST = {
  HIDDEN_MASK_STRING: '**********'
}
// 定义组件的外观常量
export const PJ_SIZE = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
  EXTRA_2LARGE: 'xxl',
  EXTRA_3LARGE: 'xxxl',
  BREAKPOINT_SIZE_ARRAY: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
};

export const PJ_LINK_TYPE = {
  CONTENT: 'content',
  INLINE: 'inline',
};

export const PJ_BTN_TYPE = {
  TEXT: 'text',
  OUTLINED: 'outlined',
  FILLED: 'filled',
  ELEVATED: 'elevated',
};

export const DIRECTION = {
  H: 'horizontal',
  V: 'vertical',
};

// alert/notification的样式风格
export const PJ_COMPONENT_STYLE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  BRAND: 'brand',
  NEUTRAL: 'neutral',
  INFO: 'info',
  SUCCESS: 'success',
  WARN: 'warning',
  ERROR: 'error',
  WHITE: 'whiteBtn',
  BLACK: 'blackBtn'
};

export const ELEMENT_STATUS = {
  ACTIVED: 'actived',
  IN_ACTIVED: 'in_actived',
  HOVER: 'hover',
  DISABLED: 'disabled',
};

export const STRENGTH_INDICATOR = {
  STRONG: 'strong',
  MEDIUM: 'medium',
  WEAK: 'weak',
};

export enum PJ_PAYMENT_METHOD {
  CREDIT = 'credit',
  DEBIT = 'debit',
  PAYPAL = 'paypal',
  GOOGLE_PAY = 'google_pay',
  APPLE_PAY = 'apple_pay',
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  UNI_PAY = 'unipay',
  CARD = 'card'
}

export enum PJ_SORT {
  DESC = 'desc', ASC = 'asc'
}
export class PjPaymentInfo {
  id?: number;
  issuer?: string; // 支付手段的发行公司
  type?: string; // 信用卡类别：万事达等， 需要跟图片名称一致，最好做成枚举或者跟信用卡号做一致性匹配
  idNumber?: string; // 数字的话只包含最后四位， 邮件的话包含前和后两位，其他用星号
  holder?: string; // 持卡人名称
  expiration?: string; // 过期日期
  isDefault?: boolean; //是否缺省支付方式，一组里面只能有一个
  isExpirated?: boolean;
  paymentProof?: string; // 支付凭证
  cvv?: string;
  billingAddress?: PjAddress;


  static generateNgFormGroup(validators: PjKeyValue<Array<ValidatorFn>>, paymentInfo?: PjPaymentInfo): FormGroup {
    const fieldNames = ['idNumber', 'holder', 'cvv', 'expiration', 'type'];
    let _frmGrp = NgFormTool.generateFormGroup(fieldNames, paymentInfo, validators);
    return _frmGrp || new FormGroup({});
  }

  static convertSummaryToDataValues(info?: PjPaymentInfo): Array<string> {
    const values = new Array<string>();
    if (info == null) {
      return values;
    }
    values[0] = info.issuer || '';
    values[1] = (info.type || '').toUpperCase();
    values[2] = info.idNumber || '';
    values[3] = info.expiration || '';
    return values;
  }

  static convertToPayOrRefundSummary(info?: PjPaymentInfo): string {
    if (info == null) {
      return '';
    }
    return (info.type || '') + ' ' + (info.idNumber || '');
  }

  // 根据卡号判断卡类型
  static generateCardType(cardNumber: string): string {
    // name: "Visa", length: "13,16",  prefixes: "4", checkdigit: true
    // name: "MasterCard", length: "16",  prefixes: "51,52,53,54,55", checkdigit: true
    // name: "AmEx", length: "15", prefixes: "34,37", checkdigit: true
    let cardType = PJ_CARD_TYPE.UNKNOW;
    if (!HasStringValue(cardNumber)) {
      return cardType;
    }
    if (cardNumber.startsWith('4')) {
      cardType = PJ_CARD_TYPE.VISA;
    } else if (cardNumber.startsWith('51') || cardNumber.startsWith('52') || cardNumber.startsWith('53') || cardNumber.startsWith('54') || cardNumber.startsWith('55')) {
      cardType = PJ_CARD_TYPE.MASTER;
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
      cardType = PJ_CARD_TYPE.AMEX;
    }
    return cardType;
  }

  static validateCardNumber(cardNumber: string): boolean {
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(cardNumber)) {
      return false;
    }
    // 检查是否合格的信用卡号
    let checksum = 0;
    let j = 1;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let calc = 0;
      calc = Number(cardNumber.charAt(i)) * j;
      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }
      checksum = checksum + calc;
      j = (j == 1) ? 2 : 1;
    }
    return (checksum % 10) == 0;
  }

  static fetchTransparentBorderlessImage(issuerName: string): string {
    return 'assets/image/payment-methods/' + issuerName + '/transparent_borderless.png';
  }
  static fetchTransparentBorderedImage(issuerName: string): string {
    return 'assets/image/payment-methods/' + issuerName + '/transparent_bordered.png';
  }
  static fetchBorderlessImage(issuerName: string): string {
    return 'assets/image/payment-methods/' + issuerName + '/opaque_borderless.png';
  }
  static fetchBorderedImage(issuerName: string): string {
    return 'assets/image/payment-methods/' + issuerName + '/opaque_bordered.png';
  }
}

export class PjStatus {
  iconName?: string;
  label?: string;
  value?: string;
  colorStyle?: string;
}

export class PjAction {
  sn?: number;                // which position this action should be.
  iconName?: string;
  imageSrc?: string;
  imageWidth?: number;
  imageType?: string;
  label: string = 'Action';
  description?: string;
  actionLabel?: string;
  actionString?: string;
  selected?: boolean;
  disabled?: boolean;
}

export class PjActionEvent {
  actionString?: string;
  para?: PjKeyValue<any>;

  static isPathAction(action: PjActionEvent): boolean {
    if (action.actionString?.startsWith('action_')) {
      return false;
    }
    return true;
  }
}

export interface PjProperty {
  [key: string]: string;
}

export interface PjKeyValue<T> {
  [key: string]: T;
}

export class PjCountry {
  value?: string; // 两位的国际标准编码
  label?: string;
}

export const PjImageTypeConst = {
  RECTANGLE: 'rectangle',// as PjImageType,
  CIRCLE: 'circle'// as PjImageType,
};

export interface PjFileInfoData {
  fileIcon?: string;
  fileName: string;
  fileDesc?: string;
  fileSize?: number; // in MB
  action?: PjAction;
}

export type PjIconType = 'round' | 'outlined' | undefined;

export const PjIconTypeConst = {
  ROUND: 'round' as PjIconType,
  OUTLINED: 'outlined' as PjIconType,
};

export class PjEmptyStatusConfig {
  borderWidth?: number; // 0: no border
  label?: string;
  iconName?: string;
  iconSize?: number;
  width?: number;
  height?: number;
  radius?: string;
  emptyType?: string; // typeGeneric / typeMedia
}

export interface PjImageData {
  index?: number;
  label?: string;
  imageSrc?: string;
  imageType?: string;//PjImageType;
  width?: number;
  height?: number;
  borderColor?: string;
  actionString?: string;
  thumnbnailSrc?: string;
  noMouseEffection?: boolean; //是否支持hover和press事件，缺省为有。
  badgeLabel?: string;
  enlargeable?: boolean;
}

export class PjAddress {
  id?: number;
  isDefault?: boolean;
  firstName?: string;
  midName?: string;  // 在edit-personal-info中需要使用这个属性
  lastName?: string;
  fullName?: string;  // 账单地址和收货地址需要使用这个属性，是firtName + lastName
  companyName?: string;
  email?: string;
  phone?: string;

  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  province?: string;

  countryShow?: string;  // 只是前端显示country
  provinceShow?: string;  // 只是前端显示state
  dataChanged?: boolean;  // 后端没有，前端用于判断数据是否改变


  // 仅本地使用的属性
  shippingAddressId?: number;
  shippingAddressType?: string; // 可以是如下几种类型： appartment, house, business, other
  deliveryInstruction?: string; // 


  isValid?: PjKeyValue<boolean>;


  static generateNgFormGroup(validators?: PjKeyValue<Array<ValidatorFn>>, address?: PjAddress): FormGroup {
    if (address != null && !HasStringValue(address.fullName)) {
      address.fullName = PjAddress.getFullName(address);
    }
    const fieldNames = [
      'firstName', 'lastName', 'fullName', 'addressLine1',
      'addressLine2', 'province', 'postcode', 'city', 'phone', 'country'
    ];
    let _frmGrp: FormGroup | null = NgFormTool.generateFormGroup(fieldNames, address, validators);
    return _frmGrp || new FormGroup({});
  }
  static isValidAddress(addr?: PjAddress): boolean {
    if (addr == null || addr.isValid == null) {
      return true;
    }
    // payment.isValid = { holder: false, cvv: false, idNumber: false };

    let valid = true;
    for (let key in addr.isValid) {
      valid = valid && addr.isValid[key];
    }
    return valid;
  }

  static updateAddressIsValid(addr: PjAddress): PjAddress {

    if (addr?.fullName&&addr.fullName.length<40) {
      addr.isValid = { ...addr.isValid, fullName: true }
    } else {
      addr.isValid = { ...addr.isValid, fullName: false }
    }
    if (addr?.addressLine1&&addr.addressLine1.length<128) {
      addr.isValid = { ...addr.isValid, addressLine1: true }
    } else {
      addr.isValid = { ...addr.isValid, addressLine1: false }
    }
    if (addr?.addressLine2&&addr.addressLine2.length>128) {
      addr.isValid = { ...addr.isValid, addressLine2: false }
    } 
    if (addr?.city) {
      addr.isValid = { ...addr.isValid, city: true }
    } else {
      addr.isValid = { ...addr.isValid, city: false }
    }
    if (addr?.postcode && addr?.postcode.length == 5 && (/^\d+$/.test(addr?.postcode))) {
      addr.isValid = { ...addr.isValid, postcode: true }
    } else {
      addr.isValid = { ...addr.isValid, postcode: false }
    }
    if (addr?.phone) {
      addr.isValid = { ...addr.isValid, phone: true }
    } else {
      addr.isValid = { ...addr.isValid, phone: false }
    }

    return addr;
  }

  static valid(addr: PjAddress | undefined): boolean {
    if (addr == null) {
      return false;
    }
    if (!HasStringValue(addr.addressLine1)) {
      return false;
    }
    return true;
  }
  static convertToDataValues(addr?: PjAddress): Array<string> {
    const values = new Array<string>();
    if (addr == null) {
      return values;
    }
    values[0] = PjAddress.getFullName(addr);
    values[1] = addr.addressLine1 || '';
    values[2] = addr.addressLine2 || '';
    values[3] = PjAddress.getCityProvinceAndPostcode(addr);
    values[4] = addr.country || '';
    values[5] = addr.phone || '';
    return values;
  }
  static simpleAddress(addr?: PjAddress): string {
    return (addr?.city || '') + (addr?.postcode || '');
  }

  static getFullName(addr?: PjAddress): string {
    if (addr == null) {
      return '';
    }
    if (HasStringValue(addr.fullName)) {
      return addr.fullName || '';
    }
    let s = addr.firstName || '';
    if (addr.lastName != null && addr.lastName.length > 0) {
      if (s != null && s.length > 0) {
        s = s + ' ' + addr.lastName;
      } else {
        s = addr.lastName;
      }
    }
    return s;
  }

  static splitFullName(addr: PjAddress, fullName: string): PjAddress {
    if (!HasStringValue(fullName)) {
      return addr;
    }
    const n: string[] = fullName.split(' ');
    addr.firstName = '';
    addr.lastName = '';
    if (n.length > 0) {
      addr.firstName = n[0];
      if (n.length > 1) {
        addr.lastName = n[1];
      }
    }
    return addr;
  }
  static getCityProvinceAndPostcode(addr?: PjAddress): string {
    if (addr == null) {
      return '';
    }
    let s = '';
    if (addr.city && addr.city.length > 0) {
      s = s + addr.city + ', ';
    }
    if (addr.province && addr.province.length > 0) {
      s = s + addr.province + ' ';
    }
    if (addr.postcode && addr.postcode.length > 0) {
      s = s + addr.postcode;
    }
    return s;
  }
  static getAddressLine(addr?: PjAddress): string {
    if (addr == null) {
      return '';
    }
    let s = '';
    if (addr.addressLine2 != null && addr.addressLine2.length > 0) {
      s = s + addr.addressLine2 + ', ';
    }
    if (addr.addressLine1 != null && addr.addressLine1.length > 0) {
      s = s + addr.addressLine1;
    }
    return s;
  }
  static getFullAddress(addr?: PjAddress): string {
    if (addr == null) {
      return '';
    }
    let s = '';
    if (addr.addressLine1 && addr.addressLine1.length > 0) {
      s = s + addr.addressLine1 + ' ';
    }
    if (addr.city && addr.city.length > 0) {
      s = s + addr.city + ', ';
    }
    if (addr.province && addr.province.length > 0) {
      s = s + addr.province + ' ';
    }
    if (addr.postcode && addr.postcode.length > 0) {
      s = s + addr.postcode;
    }
    return s;
  }

  static isSameAddress(a1: PjAddress, a2?: PjAddress): boolean {

    if (a1.addressLine1 != a2?.addressLine1) {
      return false;
    }
    if (a1.addressLine2 != a2?.addressLine2) {
      return false;
    }
    if (a1.city != a2?.city) {
      return false;
    }
    if (a1.province !== a2?.province) {
      return false;
    }
    if (a1.country !== a2?.country) {
      return false;
    }
    return true;
  }
}

export const LEGAL_DOC = {
  CONDITIONOFUSEPATH: 'assets/documentation/Terms_and_Conditions_v1.html',
  CONDITIONOFUSE: 'Conditions of Use',
  PRIVACYPOLICY: 'Privacy Policy',
  IPINFRINGEMENT: 'IP Infringement',
  INTERESTBASEDADSPOLICY: 'Interest-Based Ads Policy',
  WEBACCESSIBLITY: 'Web Accessibility Statement Consumer Facing',
  SUPPLIERCODEOFCONDUCT: 'Supplier Code of Conduct',
}

export const PJ_ACTION = {
  SAVE: 'action_save',
  CLOSE: 'action_close',
  DETAIL: 'action_detail',
  EDIT: 'action_edit',
  CANCEL: 'action_cancel',
  REMOVE: 'action_remove',
  CLEAR: 'action_clear',
  REMOVE_ALL: 'action_remove_all',
  GO_HOME: 'action_goto_homepage',
  GO_BACK: 'action_goto_back',
  LOGIN_SWITCH_EMAIL: 'action_login_switch_email',
  LOGIN_EMAIL_VERIFY: 'action_login_email_verify',
  LOGIN_PASSWORD_VERIFY: 'action_login_password_verify',
  LOGIN_FORGET_PASSWORD: 'action_login_forget_password',
  LOGIN_RESEND_CODE: 'action_login_resend_code',
  LOGIN_ONE_TIME_LINK: 'action_login_one_time_link',
  LOGIN_CONTINUE_RESET_PASSWORD: 'action_continue_reset',
  LOGOUT: 'action_logout',

  LOGIN: 'action_login',
  CREATION: 'action_creation',
  REGISTER: 'action_register',
  VERIFICATION: 'action_verify',
  CAPTCHA_CHECKED: 'action_captcha_checked',
  CAPTCHA_UNCHECKED: 'action_captcha_unchecked',
  PASSWORD_RESET_OPTION_EMAIL: 'action_reset_by_email',
  PASSWORD_RESET_OPTION_PHONE: 'action_reset_by_phone',
  PASSWORD_RESET_OPTION_QUESTION: 'action_reset_by_question',
  SIGN_UP: 'sign_up',
  CONTINUE: 'action_continue',

  LEGAL_DOC: 'action_legal_doc',
  ADDRESS: 'action_address',

  SEARCH_ASYNC_KEYWORD_CHANGED: 'action_async_keyword_changed',
  SEARCH_KEYWORD_CHANGED: 'action_keyword_changed',
  SEARCH_BACK_BTN_CLICK: 'action_back_btn_click'

};

export function Capitalize(str: string): string {
  if (str == null || str.length == 0) {
    return str;
  }
  let ws = str.toLowerCase().split('');
  if (ws.length == 0) {
    return str;
  }
  let reg = /^[A-Z]+$/;
  ws[0] = ws[0].toUpperCase();
  for (let i = 1; i < ws.length; i++) {
    if (reg.test(ws[i])) {
      ws[i] = ' ' + ws[i];
    }
  }
  return ws.join('');
}
export function HasStringValue(field?: string | string[] | null): boolean {
  return field != null && field.length > 0;
}

export function isTrue(b?: boolean): boolean {
  if (b == null) {
    return false;
  }
  return b === true;
}

export function isFalse(b?: boolean): boolean {
  if (b == null) {
    return true;
  }
  return b !== true;
}

export function booleanValue(b?: boolean): boolean {
  if (b == null) {
    return false;
  }
  return b;
}

export function ArrayIsNotEmpty(arr?: Array<any>): boolean {
  return (arr != null && arr.length > 0);
}

export function ArrayIsEmpty(arr?: Array<any>): boolean {
  return (arr == null || arr.length == 0);
}

export function cloneNewObjectByJSON(obj: any): any {
  if (obj == null) {
    return null;
  }
  return JSON.parse(JSON.stringify(obj));
}
export function KeyValueObjectHasValue(obj?: PjKeyValue<any>): boolean {
  if (obj == null) {
    return false;
  }
  let b = false;
  for (let prop in obj) {
    if (prop != null) {
      b = true;
    }
  }
  return b;
}

export function CopyTextToClipboard(text: string): void {
  let textInput: HTMLInputElement = document.createElement("input");
  textInput.type = 'text';
  textInput.value = text;
  document.body.appendChild(textInput);
  textInput.focus(); textInput.select();
  try {
    // TODO: 考虑更好的方法。
    document.execCommand('copy');
  } catch (err) {
    // console.log('Oops, unable to copy');
  }
  document.body.removeChild(textInput);
}

export function GetMonthesForDropdown(year?: number): Array<PjDropdownItem> {
  const mm = [
    { label: '01', value: '00' },
    { label: '02', value: '01' },
    { label: '03', value: '02' },
    { label: '04', value: '03' },
    { label: '05', value: '04' },
    { label: '06', value: '05' },
    { label: '07', value: '06' },
    { label: '08', value: '07' },
    { label: '09', value: '08' },
    { label: '10', value: '09' },
    { label: '11', value: '10' },
    { label: '12', value: '11' },
  ];
  const m = new Date().getMonth();
  const y = new Date().getFullYear();
  let months = new Array<PjDropdownItem>();
  if (year == null || year == y) {
    for (let i = m + 1; i < 12; i++) {
      months.push(mm[i]);
    }
  } else {
    months = mm;
  }

  return months;
}

export function GetYearsForDropdown(): Array<PjDropdownItem> {
  const y = new Date().getFullYear();
  let _years = new Array<PjDropdownItem>();
  for (let i = 0; i < 6; i++) {
    _years.push({ label: y + i + '', value: y + i + '' });
  }
  return _years;
}

export function GetSupportedStatesForDropdown(states: Array<PjDropdownItem>): Array<PjDropdownItem> {
  if (states == null || states.length == 0) {
    return [];
  }
  let _states = new Array<PjDropdownItem>();
  states.forEach((state) => {
    _states.push({
      label: state.label || ''
    });
  });
  return _states;
}

export function GetSupportedCountriesForDropdown(
  countries: Array<PjCountry>
): Array<PjDropdownItem> {
  if (countries == null || countries.length == 0) {
    return [];
  }
  let _countries = new Array<PjDropdownItem>();
  countries.forEach((country) => {
    _countries.push({
      label: country.label || '',
      value: country.value || '',
      imageName: 'assets/image/flag/' + country.value?.toLowerCase() + '.png',
    });
  });
  return _countries;
}

export function ValidateEmail(mail: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);;
}

export class ColumnDataStruct {
  columnNo?: number;
  columnTitle?: string;
  columnTitleExplain?: string;
  columnComponent?: string;
  columnWidth?: number;
  dataName?: string;
  headerChangeable?: boolean;
  firstDataName?: string;
  secondDataName?: string;
  dataType?: string;
  frozen?: boolean;
  show?: boolean;
  isTreeColumn?: boolean;
  arrayIndex?: number;
  buttonLabel?: string;
  mustGreaterThan?: string;
  mustLessThan?: string;
  canBeUndefined?: boolean;
  mustBeDefined?: boolean;
  maxLength?: number;
  assistiveText?: string;
}

export class NgFormTool {
  static generateFormGroup(fieldNames: Array<string>, fieldValues?: PjKeyValue<any>, validators?: PjKeyValue<Array<ValidatorFn>>): FormGroup | null {
    if (ArrayIsEmpty(fieldNames)) {
      return null;
    }
    let _frmGrp = new FormGroup({});
    fieldNames.forEach(fieldName => {
      _frmGrp.addControl(fieldName, new FormControl(
        (fieldValues != null && fieldValues[fieldName] != null) ? fieldValues[fieldName] : null,
        (validators != null && validators[fieldName] != null) ? validators[fieldName] : undefined
      ));
    })
    return _frmGrp;
  }

  static generateFormControl(typeClass?: Type<any>): FormControl {
    let _frm = new FormControl<number | null>(null);

    return _frm;
  }

  //将全角字符转为半角
  static toCDB(str: string) {
    var tmp = "";
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) == 12288) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 12256);
        continue;
      }
      if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
      }
      else {
        tmp += String.fromCharCode(str.charCodeAt(i));
      }
    }
    return tmp
  }

}
export class NgFormValidator {

  static match(field1: string, field2: string, errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'These two values are not match.';
    }
    return (control: AbstractControl): ValidationErrors | null => {
      const c1 = control.get(field1);
      const c2 = control.get(field2);
      let valid = true;
      valid = valid && (c1 != null && HasStringValue(c1.value));
      valid = valid && (c2 != null && HasStringValue(c2.value));
      if (valid) {
        valid = valid && (c1!.value === c2!.value);
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }
  static email(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Must be an email.';
    }
    return NgFormValidator.customerRegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, errorMessage!);
  }

  static cardExpireDate(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Date format: MM/YY';
    }
    return NgFormValidator.customerRegExp(/(0[1-9]|1[012])[- \/.]\d\d/, errorMessage!);
  }

  static dateForUS(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Date format: MM/DD/YYYY';
    }
    return NgFormValidator.customerRegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](1|2)\d\d\d/, errorMessage!);
  }
  static invalidValidator(errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return { errorMessage: errorMessage };
    };
  }

  static required(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'This field is required.';
    }
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = HasStringValue(control.value);
      return valid ? null : { errorMessage: errorMessage };
    };
  }
  static requiredAndMaxLength(length: number, errorMessage?: string): ValidatorFn {
    // if (errorMessage == null) {
    //   errorMessage = 'This field is required and length must less than ' + length;
    // }
    return (control: AbstractControl): ValidationErrors | null => {
      if (!HasStringValue(control.value)) {
        return { errorMessage: errorMessage || 'This field is required.' };
      }
      if ((typeof control.value) == 'string' && control.value.length > length) {
        return { errorMessage: errorMessage || ('Length must less than ' + length) };
      }
      return null;
    };
  }

  static minLength(length: number, errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Length must great than ' + length;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      let valid = true;
      if ((typeof control.value) == 'string') {
        valid = control.value.length >= length;
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }

  static fixedLengthOrEmpty(length: number, errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Length must be ' + length;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      let valid = true;
      if ((typeof control.value) == 'string') {
        valid = (control.value.length == length) || (control.value.length == 0);
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }

  static maxLength(length: number, errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Length must less than ' + length;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      let valid = true;
      if ((typeof control.value) == 'string') {
        valid = control.value.length <= length;
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }



  static numberValueGreatThan(minValue: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(Number(control.value))) {
        return { errorMessage: 'Not a number' }
      }
      return this.valueGreatThan(minValue,control,errorMessage);
    };
  }
  //price 禁止输入+，-，以.开头的数值
  static priceValueGreatThan(minValue: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(Number(control.value))) {
        control.setValue('');
        return { errorMessage: 'Not a number' }
      }
      return this.valueGreatThan(minValue,control,errorMessage);
    };
  }

  static valueGreatThan(minValue: any, control: AbstractControl, errorMessage?: string): ValidationErrors | null {
    let valid = true;
    let v: Number = new Number(control.value);
    if (((typeof minValue) !== 'number') || Number.isNaN(v) || Number.isFinite(v)) {
      valid = false;
    } else {
      valid = (v >= minValue);
    }
    return valid ? null : { errorMessage: errorMessage };
  }


  static numberValueGreatThanOrEmpty(minValue: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(Number(control.value))) {
        return { errorMessage: 'Not a number' }
      }
      if (control.value.length == 0 || control.value == null) {
        return null;
      }
      return this.valueGreatThan(minValue,control,errorMessage);
    };
  }
  //price 禁止输入+，-，以.开头的数值
  static priceValueGreatThanOrEmpty(minValue: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(Number(control.value))) {
        control.setValue('');
        return { errorMessage: 'Not a number' }
      }
      if (control.value.length == 0 || control.value == null) {
        return null;
      }
      return this.valueGreatThan(minValue,control,errorMessage);
    };
  }

  static numberValueLessThan(maxValue: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(Number(control.value))) {
        return { errorMessage: 'Not a number' }
      }
      let valid = true;
      let v: Number = new Number(control.value);
      if (((typeof maxValue) !== 'number') || Number.isNaN(v) || Number.isFinite(v)) {
        valid = false;
      } else {
        valid = (v <= maxValue);
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }

  static timeMustBeLaterThan(timeLimit?: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (timeLimit == undefined) {
        return null;
      }
      let valid = true;
      let v: Date = new Date(control.value);
      if (((typeof timeLimit) !== 'number') || Number.isNaN(v) || Number.isFinite(v)) {
        valid = false;
      } else {
        valid = (v > timeLimit);
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }

  static timeMustBeEarlierThan(timeLimit?: any, errorMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (timeLimit == undefined) {
        return null;
      }
      let valid = true;
      let v: Date = new Date(control.value);
      if (((typeof timeLimit) !== 'number') || Number.isNaN(v) || Number.isFinite(v)) {
        valid = false;
      } else {
        valid = (v < timeLimit);
      }
      return valid ? null : { errorMessage: errorMessage };
    };
  }


  static allAlphabet(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Must be all alphabet.';
    }
    return NgFormValidator.customerRegExp(/^[a-zA-Z]+$/, errorMessage!);
  }

  static allNumber(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Must be all numbers.';
    }
    return NgFormValidator.customerRegExp(/^\d+$/, errorMessage!);
  }
  static allNumberOrSpace(errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Must be all numbers.';
    }
    return NgFormValidator.customerRegExp(/^[\d\s]+$/, errorMessage!);
  }

  static customerRegExp(regexp: RegExp, errorMessage?: string): ValidatorFn {
    if (errorMessage == null) {
      errorMessage = 'Not match the pattern.';
    }
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = regexp.test(control.value);
      return valid ? null : { errorMessage: errorMessage };
    };
  }

}
