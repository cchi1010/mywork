import { ChangeDetectorRef, Component, Inject, TemplateRef, inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { distinct, filter } from "rxjs";
import { AppLayoutService } from "src/app/app-layout.service";
import { AppConfigService } from "src/app/app.config";
import { ScreenSizeBreakPointString } from "src/app/app.constant";
import {
  ArrayIsNotEmpty, GetSupportedCountriesForDropdown, NgFormValidator, PjAction, PjActionEvent, PjFieldValue,
  PjAddress, PjCountry, PjKeyValue, PjPaymentInfo, PJ_ACTION, PJ_COMPONENT_STYLE, PjImageData, PjImageTypeConst, 
  PjFileInfoData, PjDropdownItem, PjSideMenuItem, PjTabItemData, PjBreadcrumbItem, PjStepData, PjStepStatus, 
  PjAccordionData, PjAlertData, PjChipData, PjHelperItem, PjCollapsibleSideData, PjSliderData, PjSwitchData, PjProgressStepData, PjProductItem, PjShopItem, PjCheckboxItem, PjRadioItem
} from "src/component/components.global";
import { PRODUCTS } from "src/component/pj-autocomplete/pj-autocomplete-mokedata";

import { PJ_COMPONENT_MENU } from "src/component-doc/pj-component.list";

import { PjFeedbackBannerService } from "src/component/pj-feedback-banner/pj-feedback-banner.service";
import { PjHelperBoxService } from "src/component/pj-helper-box/pj-helper-box.service";
import { PjInfoCardComponent } from "src/component/pj-info-card/pj-info-card.component";
import { PjModalWindowComponent } from "src/component/pj-modal-window/pj-modal-window.component";
import { PjModalWindowService } from "src/component/pj-modal-window/pj-modal-window.service";
import { FileInfo } from "src/model/base.model";
import { PathName, RoutingService } from "src/service/routing.service";
import { PageComponentComponent } from "./page-component.component";

import { PjLoadingService } from "src/component/pj-loading/pj-loading.service";

@Component({
  selector: 'page-pj-component',
  templateUrl: './page-pj-component.component.html',
  styleUrls: ['./page-pj-component.component.scss']
})
export class PagePjComponentComponent extends PageComponentComponent {

  private _loadingPageService: PjLoadingService;
  constructor(private _ls: AppLayoutService, private _ris: ActivatedRoute,
    private _rs: RoutingService, private _cdr: ChangeDetectorRef,
    private _as: AppConfigService,
    private _bannerService: PjFeedbackBannerService,
    private _modalWinService: PjModalWindowService,
    private _helperboxService: PjHelperBoxService) {
    super(_ls, _ris, _rs, _as, _cdr);
    this._loadingPageService = inject(PjLoadingService);
  }

  onOpenLoadingBtnClick(): void {
    this._loadingPageService.showLoading({ title: '' });
  }
  testFormControl?: FormControl<string | null>;
  override ngOnInit(): void {
    super.ngOnInit();
    this.testFormControl = new FormControl('aaa', [Validators.required, NgFormValidator.allNumber(), NgFormValidator.maxLength(6)]);
    this.testFormControl.valueChanges.pipe(
      filter(v => v != null),
      distinct()
    ).subscribe();
  }

  onQuickEditBtnClick(): void {
  }

  onSwiperItemClick(event: Event): void {
  }

  private _uploadProgress: number = 0;
  private _uploadProgressTimer?: any;
  onStartFileUploadClick(): void {
    if (this._uploadProgressTimer != null) {
      return;
    }
    this._uploadProgressTimer = setInterval(() => {
      if (this._uploadProgress < 100) {
        this._uploadProgress = this._uploadProgress + 2;
      }
    }, 200);
  }
  getSearchResultTitle(): string {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.';
  }

  getSearchResultDescription(): string {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.';
  }
  showUploadStatus(): boolean {
    return this._uploadProgressTimer != null;
  }

  private _uploadedImage?: PjImageData;
  getUploadImageData(): PjImageData {
    return this._uploadedImage || {};
  }

  private _uploadedImages: Array<PjImageData> = new Array<PjImageData>();

  onOneImageUploaded(imagesContent: FileInfo[]): void {
    this._uploadedImages = new Array<PjImageData>();
    imagesContent.forEach(imageContent => {
      this._uploadedImages.push({
        imageSrc: imageContent.content,
        width: 120, height: 120,
        imageType: PjImageTypeConst.RECTANGLE,
        noMouseEffection: true
      });
    });
  }
  getUploadImages(): Array<PjImageData> {
    return this._uploadedImages || [];
  }

  hasUploadedImages(): boolean {
    return ArrayIsNotEmpty(this._uploadedImages);
  }
  onImageUploaded(imageContent: FileInfo[]): void {
    this._uploadedImage = {
      imageSrc: imageContent[0].content,
      width: 120, height: 120,
      imageType: PjImageTypeConst.RECTANGLE,
      noMouseEffection: true
    };
  }
  imageUploaded(): boolean {
    return this._uploadedImage != null;
  }
  getUploadProgress(): number {
    return this._uploadProgress;
  }
  onFileUploadStatusActionClick(actionEvent: PjActionEvent): void {
    if (this._uploadProgressTimer != null) {
      clearInterval(this._uploadProgressTimer);
      this._uploadProgressTimer = null;
      this._uploadProgress = 0;
    }
  }

  private _collapsibleSideData?: PjCollapsibleSideData;
  getCollapsibleSideData(): PjCollapsibleSideData {
    if (this._collapsibleSideData == null) {
      this._collapsibleSideData = {
        consendedIconName: 'menu',
        title: 'Components',
        width: 300,
      };
    }
    return this._collapsibleSideData;
  }

  onItemClick(item: PjSideMenuItem): void {
    this.gotoComponentLink(PathName.PJ_COMPONENT, item.actionString || '');
  }

  override _initialComponentMenu(): void {
    if (this._componentMenu != null) {
      return;
    }
    this._componentMenu = PJ_COMPONENT_MENU as Array<PjSideMenuItem>;
    this._componentMenu.sort((e1, e2): number => {
      return e1.label.localeCompare(e2.label);
      // return (e1.iconName || '').localeCompare(e2.iconName || '');
    });
    // this._componentMenu.reverse();
  }

  private _mediaDatas?: Array<PjImageData>;
  private _actionsOnMediaShow?: Array<PjAction>;
  private _initialMediaData(): void {
    this._mediaDatas = new Array<PjImageData>(10);

    this._mediaDatas[0] = { imageSrc: 'assets/image/life_ring.png', thumnbnailSrc: 'assets/image/life_ring.png' };
    this._mediaDatas[1] = { imageSrc: 'assets/image/heart.png', thumnbnailSrc: 'assets/image/heart.png' };
    this._mediaDatas[2] = { imageSrc: 'assets/image/lock.png', thumnbnailSrc: 'assets/image/lock.png' };
    this._mediaDatas[3] = { imageSrc: 'assets/image/life_ring.png', thumnbnailSrc: 'assets/image/life_ring.png' };
    this._mediaDatas[4] = { imageSrc: 'assets/image/heart.png', thumnbnailSrc: 'assets/image/heart.png' };
    this._mediaDatas[5] = { imageSrc: 'assets/image/lock.png', thumnbnailSrc: 'assets/image/lock.png' };
    this._mediaDatas[6] = { imageSrc: 'assets/image/life_ring.png', thumnbnailSrc: 'assets/image/life_ring.png' };
    this._mediaDatas[7] = { imageSrc: 'assets/image/heart.png', thumnbnailSrc: 'assets/image/heart.png' };
    this._mediaDatas[8] = { imageSrc: 'assets/image/lock.png', thumnbnailSrc: 'assets/image/lock.png' };
    this._mediaDatas[9] = { imageSrc: 'assets/image/life_ring.png', thumnbnailSrc: 'assets/image/life_ring.png' };

    this._actionsOnMediaShow = [
      { iconName: 'favorite_border', label: 'Favorite' },
      { iconName: 'compare', label: 'Compare' },
    ];
  }

  onDateChanged(dateString: string): void {
    // console.log('New date: ' + dateString);
  }
  useFlexLayout(): boolean {
    let size = this._appCfgService.getScreenSize();
    if (size === ScreenSizeBreakPointString.XS) {
      return true;
    }
    if (size === ScreenSizeBreakPointString.SM) {
      return true;
    }
    return false;
  }
  getMediaShowData(): Array<PjImageData> {
    if (this._mediaDatas == null) {
      this._initialMediaData();
    }
    return this._mediaDatas || [];
  }

  onShowBannerBtnClick(type: string): void {
    switch (type.toLowerCase()) {
      case PJ_COMPONENT_STYLE.NEUTRAL:
        this._bannerService.neutralFeedback('This is a neutral feedback', '', true);
        return;
      case PJ_COMPONENT_STYLE.INFO:
        this._bannerService.infoFeedback('This is a info feedback', 'this is description');
        return;
      case PJ_COMPONENT_STYLE.SUCCESS:
        this._bannerService.successFeedback('This is a success feedback', '');
        return;
      case PJ_COMPONENT_STYLE.ERROR:
        this._bannerService.errorFeedback('This is a error feedback', 'this is description', true);
        return;
    }
  }


  onShowIamgeBannerBtnClick(): void {
    this._bannerService.imageFeedback('assets/image/life_ring.png', 'It is a feedback with image');
  }

  // getFeedbackAction(type: string): PjAction {
  //   return AmMallData.feedbacksAction[type];
  // }
  getActionsOnMediaShow(): Array<PjAction> {
    if (this._actionsOnMediaShow == null) {
      this._initialMediaData();
    }
    return this._actionsOnMediaShow || [];
  }

  private _countriesForDropDown?: Array<PjDropdownItem>;
  getSupportedCountriesForDropdown(): Array<PjDropdownItem> {
    if (this._countriesForDropDown == null) {
      this._countriesForDropDown = GetSupportedCountriesForDropdown(this.getSupportedCountries());
    }
    return this._countriesForDropDown;
  }

  private _countries?: Array<PjCountry>;
  getSupportedCountries(): Array<PjCountry> {
    if (this._countries == null) {
      this._countries = [{ value: 'us', label: 'United States' }, { value: 'ca', label: 'Canada' }];
    }
    return this._countries;
  }

  private _itemsForSelection?: Array<PjDropdownItem>;
  getSelectedItemsForDropdown(): Array<PjDropdownItem> {
    if (this._itemsForSelection == null) {
      this._itemsForSelection = [{ iconName: 'check', label: "Canada" }, { iconName: 'check', label: "China" }, { iconName: 'check', label: "UK" }, { iconName: 'check', label: "USA" }];
    }
    return this._itemsForSelection;
  }

  private _address1?: PjAddress;
  private _address2?: PjAddress;
  getDefaultAddress(): PjAddress {
    return this.getAddress1();
  }
  getAddress1(): PjAddress {
    if (this._address1 == null) {
      this._address1 = {
        isDefault: true,
        firstName: 'Jane',
        lastName: 'Cooper',
        addressLine1: '2972 Westheimer Rd.',
        addressLine2: '',
        city: 'Santa Ana',
        province: 'Illinois',
        postcode: '85486'
      };
    }
    return this._address1;
  }
  getAddress2(): PjAddress {
    if (this._address2 == null) {
      this._address2 = {
        firstName: 'Theresa',
        lastName: 'Webb',
        addressLine1: '4140 Parker Rd.',
        addressLine2: '',
        country: 'United States',
        city: 'Allentown',
        province: 'New Mexico',
        postcode: '31134',
        phone: '+1 412 3456789'
      };
    }
    return this._address2;
  }
  private _thirdPartyInfo?: PjPaymentInfo;
  getThirdPartyPaymentInfo(): PjPaymentInfo {
    if (this._thirdPartyInfo == null) {
      this._thirdPartyInfo = {
        issuer: 'PayPal',
        type: 'paypal',
        idNumber: 'am***er@apple.com',
      };
    }
    return this._thirdPartyInfo;
  }
  private _cardNames = ['Visa', 'Mastercard', 'JCB', 'Discover', 'Amex', 'UnionPay']; //, 'alipay', 'bitcoin', 'applepay', 'elo', 'lightcoin', 'webmoney'
  getAcceptedCardNames(): string[] {
    return this._cardNames;
  }
  private _creditCardInfo?: PjPaymentInfo;
  getCreditCardInfo(): PjPaymentInfo {
    if (this._creditCardInfo == null) {
      this._creditCardInfo = {
        issuer: 'Bank of America',
        type: 'visa',
        idNumber: '**** **** **** 5678',
        holder: 'Jane Cooper',
        expiration: '10/22',
      };
    }
    this._creditCardInfo.isDefault = false;
    this._creditCardInfo.isExpirated = false;
    return JSON.parse(JSON.stringify(this._creditCardInfo));
  }

  getDefaultCreditCardInfo(): PjPaymentInfo {
    if (this._creditCardInfo == null) {
      this._creditCardInfo = {
        issuer: 'Bank of America',
        type: 'visa',
        idNumber: '**** **** **** 5678',
        holder: 'Jane Cooper',
        expiration: '10/22',
      };
    }
    this._creditCardInfo.isDefault = true;
    this._creditCardInfo.isExpirated = false;
    return JSON.parse(JSON.stringify(this._creditCardInfo));
  }

  getExpiratedCreditCardInfo(): PjPaymentInfo {
    if (this._creditCardInfo == null) {
      this._creditCardInfo = {
        issuer: 'Bank of America',
        type: 'visa',
        idNumber: '**** **** **** 5678',
        holder: 'Jane Cooper',
        expiration: '10/22',
      };
    }
    this._creditCardInfo.isExpirated = true;
    return JSON.parse(JSON.stringify(this._creditCardInfo));
  }
  private _images?: Array<PjImageData>;
  private _initialImages(): void {
    this._images = new Array<PjImageData>();
    this._images.push({ imageSrc: 'assets/image/heart.png', width: 64, imageType: 'rectangle', label: 'Dog01' });
    this._images.push({ imageSrc: 'assets/image/lock.png', width: 64, imageType: 'rectangle', label: 'Dog02' });
    this._images.push({ imageSrc: 'assets/image/life_ring.png', width: 90, imageType: 'rectangle', label: 'Cat' });
    this._images.push({ imageSrc: 'assets/image/heart.png', width: 120, height: 120, imageType: 'rectangle', label: 'Dog01' });
  }

  getImages(): Array<PjImageData> {
    if (this._images == null) {
      this._initialImages();
    }
    return this._images || [];
  }
  private _tabItems?: Array<PjTabItemData>;
  getTabItems(...tabs: Array<TemplateRef<any>>): Array<PjTabItemData> {
    if (this._tabItems == null) {
      this._tabItems = [{
        title: 'Tab item', isActived: true, contentTemplateRef: tabs[0],
      }, {
        title: 'Tab item', isActived: false, contentTemplateRef: tabs[1], iconName: 'add'
      }, {
        title: 'Tab item', isActived: false, contentTemplateRef: tabs[2], badge: '23',
      }, {
        title: 'Tab item', isActived: false, contentTemplateRef: tabs[3], iconName: 'add', badge: '99'
      }];
    }
    return this._tabItems;
  }

  private _stepsData?: Array<PjStepData>;
  getStepsData(...steps: Array<TemplateRef<any>>): Array<PjStepData> {
    if (this._stepsData == null) {
      this._stepsData = new Array<PjStepData>();
      for (let i = 0; i < steps.length; i++) {
        this._stepsData.push({
          index: i * 2,
          enableItemClick: true,
          title: 'Step ' + (i + 1),
          value: 'Step ' + (i + 1),
          templateRef: steps[i],
          stepStatus: PjStepStatus.PENDING,
        });
      }
      this._stepsData[0].stepStatus = PjStepStatus.COMPLETED;
      this._stepsData[0].valid = true;
      this._stepsData[1].stepStatus = PjStepStatus.COMPLETED;
      this._stepsData[1].disabled = true;
      this._stepsData[2].stepStatus = PjStepStatus.COMPLETED;
      this._stepsData[2].valid = true;
      this._stepsData[3].stepStatus = PjStepStatus.ONGOING;
      this._stepsData[3].valid = true;
    }
    return this._stepsData;
  }

  onOpenHelpBoxBtnClick(dockElm: HTMLElement): void {
    // console.log(dockElm);
    this._helperboxService.show(dockElm, this.getPasswordHelper());
  }

  private _passwordHelperItems?: Array<PjHelperItem>;
  getPasswordHelper(): Array<PjHelperItem> {
    if (this._passwordHelperItems == null) {
      this._passwordHelperItems = [{ style: PJ_COMPONENT_STYLE.SUCCESS, description: 'Must be 6-15 characters in length' },
      { style: PJ_COMPONENT_STYLE.SUCCESS, description: 'Contains 1 uppercase and lower case letter' },
      { style: PJ_COMPONENT_STYLE.WARN, description: 'Contains a number' },
      { style: PJ_COMPONENT_STYLE.ERROR, description: 'Contains a special character' }];
    }
    return this._passwordHelperItems;
  }
  private _helperItems?: Array<PjHelperItem>;
  getHelperItem(whichOne: number): Array<PjHelperItem> {
    if (this._helperItems == null) {
      this._helperItems = [{ style: PJ_COMPONENT_STYLE.SUCCESS, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { style: PJ_COMPONENT_STYLE.INFO, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { style: PJ_COMPONENT_STYLE.WARN, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { style: PJ_COMPONENT_STYLE.ERROR, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }];
    }
    return [this._helperItems[whichOne]];
  }

  private _helperItemsWithTitle?: Array<PjHelperItem>;
  getHelperItemWithTitle(whichOne: number): Array<PjHelperItem> {
    if (this._helperItemsWithTitle == null) {
      this._helperItemsWithTitle = [{ style: PJ_COMPONENT_STYLE.SUCCESS, title: 'Success', description: PJ_COMPONENT_STYLE.SUCCESS },
      { title: 'Info', description: PJ_COMPONENT_STYLE.INFO },
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { style: PJ_COMPONENT_STYLE.ERROR, title: 'Error', description: PJ_COMPONENT_STYLE.SUCCESS }];
    }
    return [this._helperItemsWithTitle[whichOne]];
  }
  private _actionFieldValue?: PjFieldValue;
  getActionFieldValue(): PjFieldValue {
    if (this._actionFieldValue == null) {
      this._actionFieldValue = {
        label: 'Action Field',
        actionValue: { label: 'More information' },
      };
    }
    return this._actionFieldValue;
  }
  private _switchsData?: Array<PjSwitchData>;
  getSwitchData(whichOne: number): PjSwitchData {
    if (this._switchsData == null) {
      this._switchsData = [{
        label: 'Keep private',
        description: 'When the collection is in private, community won\'t see what\'s inside this collection',
        status: true
      }, {
        label: 'Keep private',
        status: false
      }, {
        label: 'Keep private',
        enableIconName: 'public_off',
        disableIconName: 'public',
        description: 'When the collection is in private, community won\'t see what\'s inside this collection',
        status: true
      }, {
        label: 'Keep private',
        enableIconName: 'public_off',
        disableIconName: 'public',
        status: false
      }];
    }
    return this._switchsData[whichOne];
  }

  private _progress: number = 0;
  private _progressTimer?: any;
  onStartProcessBtnClick(): void {
    if (this._progressTimer != null) {
      return;
    }
    this._progressTimer = setInterval(() => {
      if (this._progress < 100) {
        this._progress = this._progress + 2;
      } else {
        this._progress = 0;
      }
    }, 200);
  }

  onStopProcessBtnClick(): void {
    if (this._progressTimer != null) {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
      this._progress = 0;
    }
  }

  getProgress(): number {
    return this._progress;
  }

  private _progressSteps1?: Array<PjProgressStepData>;
  getProgressStepData(): Array<PjProgressStepData> {
    if (this._progressSteps1 == null) {
      this._initializeProgressSteps();
    }
    return this._progressSteps1 || [];
  }

  private _progressSteps2?: Array<PjProgressStepData>;
  getProgressStepData2(): Array<PjProgressStepData> {
    if (this._progressSteps2 == null) {
      this._initializeProgressSteps();
    }
    return this._progressSteps2 || [];
  }

  private _progressSteps3?: Array<PjProgressStepData>;
  getProgressStepData3(): Array<PjProgressStepData> {
    if (this._progressSteps3 == null) {
      this._initializeProgressSteps();
    }
    return this._progressSteps3 || [];
  }

  private _initializeProgressSteps(): void {
    this._progressSteps1 = [{
      status: 'current',
      label: 'Return started',
      description: 'Pending seller approval',
    }, {
      status: 'coming',
      label: 'Request accepted',
      description: 'Seller has accepted your return request',
    }, {
      status: 'coming',
      label: 'Item received',
      description: 'Returned item has arrived at the return facility',
    }, {
      status: 'coming',
      label: 'Refund issued',
      description: 'Refund will be reflected on your card in 3 business days',
    }, {
      status: 'coming',
      label: 'Completed',
      description: 'This return order is completed',
      lastStep: true,
    }];
    this._progressSteps2 = [{
      status: 'done',
      label: 'Return started',
      description: 'Pending seller approval',
    }, {
      status: 'done',
      label: 'Request accepted',
      description: 'Seller has accepted your return request',
    }, {
      status: 'current',
      label: 'Item received',
      description: 'Returned item has arrived at the return facility',
    }, {
      status: 'coming',
      label: 'Refund issued',
      description: 'Refund will be reflected on your card in 3 business days',
    }, {
      status: 'coming',
      label: 'Completed',
      description: 'This return order is completed',
      lastStep: true,
    }];
    this._progressSteps3 = [{
      status: 'done',
      label: 'Return started',
      description: 'Pending seller approval',
    }, {
      status: 'done',
      label: 'Request accepted',
      description: 'Seller has accepted your return request',
    }, {
      status: 'done',
      label: 'Item received',
      description: 'Returned item has arrived at the return facility',
    }, {
      status: 'done',
      label: 'Refund issued',
      description: 'Refund will be reflected on your card in 3 business days',
    }, {
      status: 'current',
      label: 'Completed',
      description: 'This return order is completed',
      lastStep: true,
    }];
  }

  onOpenModalWindow(title?: string, closeable?: boolean): void {
    this._modalWinService.openModalWindow(
      { title: title, closeable: closeable },
      PjInfoCardComponent,
      { label: 'Sales', value: '$5487.77', iconName: 'local_mall.outlined' });
  }

  onOpenRemoveModalWindow(title?: string, closeable?: boolean): void {
    this._modalWinService.openRemoveWindow(
      PjInfoCardComponent,
      { label: 'Sales', value: '$5487.77', iconName: 'local_mall.outlined' },
      {
        title: 'Delete review',
        description: 'Are you sure you want to delete the awesome review you wrote? '
          + '(Deleting review will also remove its associated story)'
      });
  }

  onCloseModalWinBtnClick(modalWin: PjModalWindowComponent): void {
    modalWin.close();
  }

  private _dropdownOptionItems?: Array<PjDropdownItem>;
  getDropDownOptionItems(): Array<PjDropdownItem> {
    if (this._dropdownOptionItems == null) {
      this._dropdownOptionItems = [{
        iconName: 'person', label: 'Profile',
      }, {
        iconName: 'settings', label: 'Setting',
      }, {
        iconName: 'settings', label: 'Setting', divider: true,
      }, {
        iconName: 'logout', label: 'Logout',
      }];
    }
    return this._dropdownOptionItems || [];
  }

  private _dropdownActionItems?: Array<PjDropdownItem>;
  getDropDownActionItems(): Array<PjDropdownItem> {
    if (this._dropdownActionItems == null) {
      this._dropdownActionItems = [{
        iconName: 'person', label: 'Profile', badgeLabel: '23',
      }, {
        iconName: 'settings', label: 'Setting', description: 'set the user\'s config'
      }, {
        iconName: 'settings', label: 'Setting', divider: true,
      }, {
        iconName: 'logout', label: 'Logout',
      }];
    }
    return this._dropdownActionItems || [];
  }

  // private _favorited = true;
  // isFavorited(): boolean {
  //   return this._favorited;
  // }
  // onFavoriteBtnClick(): void {
  //   this._favorited = !this._favorited;
  // }
  onCodeboxValueChanged(codeString: string): void {
    // console.log(codeString);
  }
  private _chips?: Array<PjChipData>;
  getChipsForGroup(): Array<PjChipData> {
    if (this._chips == null) {
      this._chips = [{
        label: 'Lorem 001', imageSrc: 'assets/image/heart.png', selected: false,
      }, {
        label: 'Lorem 002', imageSrc: 'assets/image/lock.png', selected: false,
      }, {
        label: 'Lorem 003', imageSrc: 'assets/image/life_ring.png', selected: true,
      }, {
        label: 'Lorem 004', imageSrc: 'assets/image/heart.png', selected: false,
      }, {
        label: 'Lorem 001', imageSrc: 'assets/image/lock.png', selected: true,
      }, {
        label: 'Lorem 002', imageSrc: 'assets/image/life_ring.png', selected: false,
      }, {
        label: 'Lorem 003', imageSrc: 'assets/image/heart.png', selected: false,
      }, {
        label: 'Lorem 003', imageSrc: 'assets/image/lock.png', selected: true,
      }, {
        label: 'Lorem 004', imageSrc: 'assets/image/life_ring.png', selected: false,
      }];
    }
    return this._chips || [];
  }
  private _checkboxItems?: Array<PjCheckboxItem>;
  isAllChecked(): boolean {
    if (this._checkboxItems == null) {
      return false;
    }
    let checked = true;
    this._checkboxItems.forEach(cb => {
      checked = checked && (cb.checked || false);
    });
    return checked;
  }
  onCheckAllClick(checked: boolean): void {
    if (this._checkboxItems == null) {
      return;
    }
    this._checkboxItems.forEach(cb => {
      cb.checked = checked;
    });
  }
  isParticialChecked(): boolean {
    if (this.isAllChecked()) {
      return false;
    }
    if (this._checkboxItems == null) {
      return false;
    }
    let checked = false;
    this._checkboxItems.forEach(cb => {
      checked = checked || (cb.checked || false);
    });
    return checked;
  }
  getCheckboxItems(): Array<PjCheckboxItem> {
    if (this._checkboxItems == null) {
      this._checkboxItems = [{
        label: 'Checkbox 2', value: '2'
      }, {
        label: 'Checkbox 3', value: '3', checked: true
      }, {
        label: 'Checkbox 4', value: '4'
      }];
    }
    return this._checkboxItems;
  }

  private _radioItems?: Array<PjCheckboxItem>;
  getRadioItems(): Array<PjCheckboxItem> {
    if (this._radioItems == null) {
      this._radioItems = [{
        label: 'Radio 2', value: '2'
      }, {
        label: 'Radio 3', value: '3', checked: true
      }, {
        label: 'Radio 4', value: '4'
      }];
    }
    return this._radioItems;
  }

  onItemGroupChange(item: PjRadioItem): void {
    // console.log(item);
  }
  private _checkboxItemsAll?: Array<PjCheckboxItem>;
  getCheckboxItemsAll(): Array<PjCheckboxItem> {
    if (this._checkboxItemsAll == null) {
      this._checkboxItemsAll = [{
        label: 'Checkbox 2', value: '2', checked: true, checkedAll: false
      }, {
        label: 'Checkbox 3', value: '3', checked: true, checkedAll: false
      }, {
        label: 'Checkbox 4', value: '4'
      }];
    }
    return this._checkboxItemsAll;
  }

  onChangeEvent(items: Array<PjCheckboxItem>): void {
    // console.log(items);
    this._checkboxItemsAll = items;
  }
  onRadioChangeEvent(item: PjRadioItem): void {
    // console.log(item);
  }
  private _breadcrumbs?: Array<PjBreadcrumbItem>;
  getBreadcrumbs(): Array<PjBreadcrumbItem> {
    if (this._breadcrumbs == null) {
      this._breadcrumbs = [{ id: 1, label: 'Breadcrumb 1', path: 'action 1' },
      { id: 2, label: 'Breadcrumb 2', path: 'action 2' },
      { id: 3, label: 'Breadcrumb 3', path: 'action 3' },
      { id: 4, label: 'Breadcrumb 4', path: 'action 4' }];
    }
    return this._breadcrumbs || [];
  }
  private _alertData?: PjKeyValue<PjAlertData>;
  getAlertData(alertType: string, hasAction?: boolean, hasLink?: boolean): PjAlertData {
    if (this._alertData == null) {
      this._alertData = {
        'success': {
          title: 'Action success!',
          closeable: true,
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.']
        },
        'successAction': {
          title: 'Action success!',
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.'],
          actions: [{ label: 'View status', actionLabel: 'View status' }, { label: 'Dismiss', actionLabel: 'Dismiss' }],
        },
        'warning': {
          title: 'Action success!',

          closeable: true,
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.']
        },
        'warningAction': {
          title: 'Action success!',
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.'],
          actions: [{ label: 'View status', actionLabel: 'View status' }, { label: 'Dismiss', actionLabel: 'Dismiss' }],
        },
        'error': {
          title: 'Action error!',

          closeable: true,
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.']
        },
        'errorAction': {
          title: 'Action error!',
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.'],
          actions: [{ label: 'View status', actionLabel: 'View status' }, { label: 'Dismiss', actionLabel: 'Dismiss' }],
        },
        'info': {
          title: 'Action success!',
          closeable: true,
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.']
        },
        'infoAction': {
          title: 'Action success!',
          descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim pharetra, vitae leo.'],
          actions: [{ label: 'View status', actionLabel: 'View status' }, { label: 'Dismiss', actionLabel: 'Dismiss' }],
        },
        'infoLink': {
          title: 'Action success!',
          linkAction: { label: 'Learn more', actionLabel: 'Learn more' }
        },
      };
    }

    return this._alertData[alertType + (hasAction ? 'Action' : '') + (hasLink ? 'Link' : '')]
  }
  private _actionCardData?: Array<PjAction>;
  getActionCardData(whichOne: number): PjAction {
    if (this._actionCardData == null) {
      this._actionCardData = [{
        imageSrc: 'assets/image/life_ring.png',
        label: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida...'
      }, {
        imageSrc: 'assets/image/heart.png',
        label: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida...',
        disabled: true
      }];
    }
    return this._actionCardData[whichOne];
  }

  private _actionItemsData?: Array<PjAction>;
  getActionItemData(whichOne: number): PjAction {
    if (this._actionItemsData == null) {
      this._actionItemsData = [{
        iconName: 'shopping_bag',
        label: 'Simple Action Item',
      }, {
        iconName: 'shopping_bag',
        label: 'Action Item with description',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit faucibus risus ipsum...'
      }, {
        label: 'Simple Action Item',
      }, {
        imageSrc: 'assets/image/life_ring.png',
        label: 'Simple Action Item',
        actionLabel: 'Change',
      }, {
        imageSrc: 'assets/image/heart.png',
        label: 'Simple Action Item',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit faucibus risus ipsum...',
        actionLabel: 'Change',
      }];
    }
    return this._actionItemsData[whichOne] || { label: '' };
  }

  private _accordionsData?: Array<PjAccordionData>;

  getAccordionData(whichOne: number): PjAccordionData {
    if (this._accordionsData == null) {
      this._accordionsData = [{
        label: 'Accordion'
      }, {
        label: 'Accordion', iconName: 'account_balance', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit faucibus risus ipsum...'
      }, {
        label: 'Accordion', iconName: 'account_balance.outlined', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit faucibus risus ipsum...'
      }];
    }
    return this._accordionsData[whichOne];
  }

  getColors(): Array<string> {
    return [
      PJ_COMPONENT_STYLE.INFO, PJ_COMPONENT_STYLE.NEUTRAL,
      PJ_COMPONENT_STYLE.BRAND, PJ_COMPONENT_STYLE.SECONDARY, PJ_COMPONENT_STYLE.SUCCESS,
      PJ_COMPONENT_STYLE.ERROR, PJ_COMPONENT_STYLE.WARN, PJ_COMPONENT_STYLE.WHITE, PJ_COMPONENT_STYLE.BLACK];
  }

  getSearchItem(): string {
    return 'comput';
  }
  getResults(): Array<string> {
    return ['computer table', 'computer chair', 'computer box', 'computer cpu', 'computer hard driver', 'computer monitor', 'computer memory']
  }

  private _shopItems: Array<PjShopItem> = [{ shopName: 'Powerful computer shop', sponsoredLabel: 'Sponsored' },
  { shopName: 'Beautiful computer shop', sponsoredLabel: 'High rating' }]

  getShopItem(): Array<PjShopItem> {
    return this._shopItems;
  }
  private _autoCompleteimages?: Array<PjImageData>;
  private _autoCompleteInitialImages(): void {
    this._autoCompleteimages = new Array<PjImageData>();
    this._autoCompleteimages.push({ imageSrc: 'assets/image/heart.png', width: 270, height: 192, imageType: 'rectangle', label: 'Dog01' });
    this._autoCompleteimages.push({ imageSrc: 'assets/image/lock.png', width: 270, height: 192, imageType: 'rectangle', label: 'Dog02' });
    this._autoCompleteimages.push({ imageSrc: 'assets/image/life_ring.png', width: 270, height: 192, imageType: 'rectangle', label: 'Cat' });
  }

  getCompleteImages(): Array<PjImageData> {
    if (this._autoCompleteimages == null) {
      this._autoCompleteInitialImages();
    }
    return this._autoCompleteimages || [];
  }
  getSuggestItems(): Array<string> {
    return ['apple', 'dell', 'newton'];
  }
  getSearchHistory(): Array<string> {
    return ['computer', 'monitor', 'cup', 'rabbit', 'cat', 'dog'];
  }

  getSearchData(): Array<PjProductItem> {
    return PRODUCTS;
  }
  getAimProperty(): string {
    return 'name';
  }
  getSecondAimProperty(): string {
    return 'company';
  }

  private _sliderValue = '';
  onValueChange(values: any): void {
    this._sliderValue = 'Low Value: ' + values.lowValue + ', High Value: ' + values.highValue;
  }

  getSliderValues(): string {
    return this._sliderValue;
  }

  private _slider1Values = '';
  onValue1Change(values: any): void {
    this._slider1Values = 'Low Value: ' + values.lowValue + ', High Value: ' + values.highValue;
  }

  getSlider1Values(): string {
    return this._slider1Values;
  }

  private _slider1Value = '';
  getSlider1Value(): string {
    return this._slider1Value;
  }
  onSingleValue1Change(value: any): void {
    this._slider1Value = 'Slider value: ' + value;
  }

  private _slider2Value = '';
  getSlider2Value(): string {
    return this._slider2Value;
  }
  onSingleValue2Change(value: any): void {
    this._slider2Value = 'Slider value: ' + value;
  }
  private _singleSliderData1: PjSliderData = {
    min: 0, max: 88888, lowValue: 36557,
    rangeShown: false, valueShown: false,
    rangeLabelLocation: 'both-ends'
  };
  private _singleSliderData2: PjSliderData = {
    min: 0, max: 88888, lowValue: 36557,
    rangeShown: false, valueShown: true,
    rangeLabelLocation: 'both-ends'
  };
  private _singleSliderData3: PjSliderData = {
    min: 0, max: 88888, lowValue: 36557,
    rangeShown: true, valueShown: true,
    rangeLabelLocation: 'beneath'
  };
  getCustomiseSliderData1(): PjSliderData {
    return this._singleSliderData1;
  }
  getCustomiseSliderData2(): PjSliderData {
    return this._singleSliderData2;
  }
  getCustomiseSliderData3(): PjSliderData {
    return this._singleSliderData3;
  }

  private _doubleSliderData1: PjSliderData = {
    min: 20, max: 888, lowValue: 50, highValue: 500,
    rangeShown: false, valueShown: false,
    rangeLabelLocation: 'both-ends'
  };
  getCustomiseDoubelSliderData1(): PjSliderData {
    return this._doubleSliderData1;
  }

  private _doubleSliderData2: PjSliderData = {
    min: 20, max: 888, lowValue: 50, highValue: 500,
    rangeShown: false, valueShown: true,
    rangeLabelLocation: 'both-ends'
  };
  getCustomiseDoubelSliderData2(): PjSliderData {
    return this._doubleSliderData2;
  }

  private _doubleSliderData3: PjSliderData = {
    min: 20, max: 888, lowValue: 50, highValue: 500,
    rangeShown: true, valueShown: false,
    rangeLabelLocation: 'beneath'
  };
  getCustomiseDoubelSliderData3(): PjSliderData {
    return this._doubleSliderData3;
  }

  private _searchResult: Array<string> = ['abcd efghijk', 'abrf asdasd', 'Cbcdefghi', 'abc dfsdf', 'Efghijk', 'abcd gfhjgfjhk', 'edf'];
  getSearchResult(): Array<string> {
    return this._searchResult;
  }

  private _asyncSearchResult?: Array<string>;
  getAsyncSearchResult(): Array<string> {
    return this._asyncSearchResult || [];
  }

  onSearchBarActionClick(actionEvent: PjActionEvent): void {
    if (actionEvent.para == null || actionEvent.para['keyword'] == null) {
      return;
    }
    if (actionEvent.actionString === PJ_ACTION.SEARCH_ASYNC_KEYWORD_CHANGED) {
      this._asyncSearchResult = JSON.parse(JSON.stringify(
        this._searchResult?.filter(v => v.toLowerCase().startsWith(actionEvent.para!['keyword'].toLowerCase()))
      ));
    }
  }

  private _fileInfo1?: PjFileInfoData;
  private _fileInfo2?: PjFileInfoData;
  getFileInfoData1(): PjFileInfoData {
    if (this._fileInfo1 == null) {
      this._fileInfo1 = { fileName: 'File Name 1.ext', fileDesc: 'File Description 1', fileSize: 23.15 };
    }
    return this._fileInfo1;
  }
  getFileInfoData2(): PjFileInfoData {
    if (this._fileInfo2 == null) {
      this._fileInfo2 = { fileName: 'File Name 2.ext', fileDesc: 'File Description 2', action: { label: 'File Action' } };
    }
    return this._fileInfo2;
  }

  getSelectedItem(selectedItem: PjDropdownItem) {
    // console.log(selectedItem);
  }
  private _perfixFormControl: FormControl = new FormControl('', [NgFormValidator.numberValueGreatThanOrEmpty(0)]);
  getPerfixFormControl(): FormControl {
    return this._perfixFormControl;
  }
  private _noborderFormControl: FormControl = new FormControl('', [NgFormValidator.maxLength(4, 'error')]);
  getNoborderFormControl(): FormControl {
    return this._noborderFormControl;
  }
  onTableContextMenu(contextMenuEvent: any): void {
    // this.rawEvent = contextMenuEvent.event;
    // if (contextMenuEvent.type === 'body') {
    //   this.contextmenuRow = contextMenuEvent.content;
    //   this.contextmenuColumn = undefined;
    // } else {
    //   this.contextmenuColumn = contextMenuEvent.content;
    //   this.contextmenuRow = undefined;
    // }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }

  onClick(flag: string): void {
    // console.log('Button is ' + flag);
  }
}

