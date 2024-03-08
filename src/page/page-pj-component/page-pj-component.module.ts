import { PjPerfixInputModule } from 'src/component/pj-text-entry/pj-perfix-input/pj-perfix-input.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PjAccordionModule } from 'src/component/pj-accordion/pj-accordion.module';
import { PjActionButtonModule } from 'src/component/pj-action-button/pj-action-button.module';
import { PjActionCardModule } from 'src/component/pj-action-card/pj-action-card.module';
import { PjActionItemModule } from 'src/component/pj-action-item/pj-action-item.module';
import { PjAddressModule } from 'src/component/pj-address/pj-address.module';
import { PjAlertModule } from 'src/component/pj-alert/pj-alert.module';
import { PjArrowGroupModule } from 'src/component/pj-arrow-group/pj-arrow-group.module';
import { PjAvatarModule } from 'src/component/pj-avatar/pj-avatar.module';
import { PjBadgeModule } from 'src/component/pj-badge/pj-badge.module';
import { PjBannerModule } from 'src/component/pj-banner/pj-banner.module';
import { PjBreadcrumbModule } from 'src/component/pj-breadcrumb/pj-breadcrumb.module';
import { PjButtonModule } from 'src/component/pj-button/pj-button.module';
import { PjCarouselModule } from 'src/component/pj-carousel/pj-carousel.module';

import { PjCodeboxModule } from 'src/component/pj-codebox/pj-codebox.module';
import { PjDividerModule } from 'src/component/pj-divider/pj-divider.module';
import { PjDropdownModule } from 'src/component/pj-dropdown/pj-dropdown.module';
import { PjFieldValueModule } from 'src/component/pj-field-value/pj-field-value.module';
import { PjFileUploadStatusModule } from 'src/component/pj-file/pj-file-upload-status/pj-file-upload-status.module';

import { PjAutocompleteModule } from 'src/component/pj-autocomplete/pj-autocomplete.module';
import { PjFileModule } from 'src/component/pj-file/pj-file.module';
import { PjHelperBoxModule } from 'src/component/pj-helper-box/pj-helper-box.module';
import { PjImageGroupModule } from 'src/component/pj-image-group/pj-image-group.module';
import { PjImageManageModule } from 'src/component/pj-image-manage/pj-image-manage.module';
import { PjImageModule } from 'src/component/pj-image/pj-image.module';
import { PjIncentiveModule } from 'src/component/pj-incentive/pj-incentive.module';
import { PjInfoCardModule } from 'src/component/pj-info-card/pj-info-card.module';
import { PjLayoutContainerModule } from 'src/component/pj-layout-container/pj-layout-container.module';
import { PjLinkModule } from 'src/component/pj-link/pj-link.module';
import { PjMediaShowModule } from 'src/component/pj-media-show/pj-media-show.module';
import { PjModalWindowModule } from 'src/component/pj-modal-window/pj-modal-window.module';
import { PjModelTextValueModule } from 'src/component/pj-model-text-value/pj-model-text-value.module';
import { PjNotificationModule } from 'src/component/pj-notification/pj-notification.module';
import { PjPaginationModule } from 'src/component/pj-pagination/pj-pagination.module';
import { PjPaymentModule } from 'src/component/pj-payment/pj-payment.module';
import { PjPopoverModule } from 'src/component/pj-popover/pj-popover.module';
import { PjProgressBarModule } from 'src/component/pj-progress/pj-progress-bar/pj-progress-bar.module';
import { PjProgressLinearModule } from 'src/component/pj-progress/pj-progress-linear/pj-progress-linear.module';
import { PjProgressStatusModule } from 'src/component/pj-progress/pj-progress-status/pj-progress-status.module';
import { PjProgressStepModule } from 'src/component/pj-progress/pj-progress-step/pj-progress-step.module';
import { PjQuantityAdjustmentModule } from 'src/component/pj-quantity-adjustment/pj-quantity-adjustment.module';
import { PjSearchBarModule } from 'src/component/pj-search-bar/pj-search-bar.module';
import { PjSelectionGroupModule } from 'src/component/pj-selection-group/pj-selection-group.module';
import { PjSideCollapsibleModule } from 'src/component/pj-side-collapsible/pj-side-collapsible.module';
import { PjSideMenuModule } from 'src/component/pj-side-menu/pj-side-menu.module';
import { PjSliderModule } from 'src/component/pj-slider/pj-slider.module';
import { PjSpinnerModule } from 'src/component/pj-spinner/pj-spinner.module';
import { PjStarRateModule } from 'src/component/pj-star-rate/pj-star-rate.module';
import { PjStepModule } from 'src/component/pj-step/pj-step.module';
import { PjSwitchModule } from 'src/component/pj-switch/pj-switch.module';
import { PjTabGroupModule } from 'src/component/pj-tab-group/pj-tab-group.module';
import { PjTextAreaEntryModule } from 'src/component/pj-text-area-entry/pj-text-area-entry.module';
import { PjTextEntryModule } from 'src/component/pj-text-entry/pj-text-entry.module';
import { PjThumbnailModule } from 'src/component/pj-thumbnail/pj-thumbnail.module';
import { PjTooltipModule } from 'src/component/pj-tooltip/pj-tooltip.module';
import { PjDirectiveModule } from 'src/directive/pj-style-directive.module';
import { PathName } from 'src/service/routing.service';
import { PageLayoutModule } from '../page-layout/page-layout.module';
import { PagePjComponentComponent } from './page-pj-component.component';

import { PjChipModule } from 'src/component/pj-chip/pj-chip.module';

import { PjActionImageItemModule } from 'src/component/pj-action-image-item/pj-action-image-item.module';
import { PjCheckboxGroupModule } from 'src/component/pj-choice-box/pj-checkbox/pj-checkbox-group.module';
import { PjCheckboxModule } from 'src/component/pj-choice-box/pj-checkbox/pj-checkbox.module';
import { PjChoiceItemModule } from 'src/component/pj-choice-box/pj-choice-item.derictive';
import { PjRadioGroupModule } from 'src/component/pj-choice-box/pj-radio/pj-radio-group.module';
import { PjRadioModule } from 'src/component/pj-choice-box/pj-radio/pj-radio.module';
import { PjFeedbackBannerModule } from 'src/component/pj-feedback-banner/pj-feedback-banner.module';
import { PjFileUploadingModule } from 'src/component/pj-file/pj-file-uploading/pj-file-uploading.module';
import { PjQuickEditModule } from 'src/component/pj-quick-edit/pj-quick-edit.module';
import { PjSearchResultModule } from 'src/component/pj-search-result/pj-search-result.module';
import { PjTableToolbarModule } from 'src/component/pj-table-toolbar/pj-table-toolbar.module';
import { PjTableModule } from 'src/component/pj-table/pj-table.module';
import { PjTemplateNameModule } from 'src/directive/pj-templatename.directive';
import { PjEmptyStatusModule } from '../../component/pj-empty-status/pj-empty-status.module';

import { PjDatetimeModule } from 'src/component/pj-datetime/pj-datetime.module';
import { PjChangePasswordModule } from 'src/component/pj-forms/pj-change-password/pj-change-password.module';
import { PjCodeEntryModule } from 'src/component/pj-forms/pj-code-entry/pj-code-entry.module';
import { PjEmailEntryModule } from 'src/component/pj-forms/pj-email-entry/pj-email-entry.module';
import { PjEmailVerificationModule } from 'src/component/pj-forms/pj-email-verification/pj-email-verification.module';
import { PjNewPasswordModule } from 'src/component/pj-forms/pj-new-password/pj-new-password.module';
import { PjPasswordEntryModule } from 'src/component/pj-forms/pj-password-entry/pj-password-entry.module';
import { PjPasswordResetOptionModule } from 'src/component/pj-forms/pj-password-reset-option/pj-password-reset-option.module';
import { PjPasswordResetbyemailModule } from 'src/component/pj-forms/pj-password-resetbyemail/pj-password-resetbyemail.module';
import { PjPhoneVerificationModule } from 'src/component/pj-forms/pj-phone-verification/pj-phone-verification.module';
import { PjRegisterFormModule } from 'src/component/pj-forms/pj-register-form/pj-register-form.module';
import { PjResetPasswordModule } from 'src/component/pj-forms/pj-reset-password/pj-reset-password.module';
import { PjSecurityQuestionModule } from 'src/component/pj-forms/pj-security-question/pj-security-question.module';
import { PjSigninModule } from 'src/component/pj-forms/pj-signin/pj-signin.module';
import { PjProgressIndicatorModule } from 'src/component/pj-progress/pj-progress-indicator/pj-progress-indicator.module';
import { PjTermNoticeModule } from 'src/component/pj-term-notice/pj-term-notice.module';
import { PjCardNumberEntryModule } from 'src/component/pj-text-entry/pj-card-number-entry/pj-card-number-entry.module';
import { PjPhoneNumberEntryModule } from 'src/component/pj-text-entry/pj-phone-number-entry/pj-phone-number-entry.module';
import { PjFileInfoItemModule } from 'src/component/pj-file/pj-file-info-item/pj-file-info-item.module';
import { PjLoadingModule } from 'src/component/pj-loading/pj-loading.module';



const routes: Routes = [{
  path: PathName.PJ_COMPONENT, component: PagePjComponentComponent
}, {
  path: PathName.PJ_COMPONENT_NAME, component: PagePjComponentComponent
}];
@NgModule({
  declarations: [
    PagePjComponentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PageLayoutModule,

    PjDirectiveModule,
    PjSideCollapsibleModule,
    PjSideMenuModule,
    PjLayoutContainerModule,
    PjAccordionModule,
    PjActionButtonModule,
    PjActionCardModule,
    PjActionItemModule,
    PjAlertModule,
    PjArrowGroupModule,
    PjAvatarModule,
    PjBadgeModule,
    PjBannerModule,
    PjBreadcrumbModule,

    PjButtonModule,

    PjCheckboxModule,
    PjCheckboxGroupModule,

    PjChipModule,
    PjCodeboxModule,

    PjDividerModule,
    PjDropdownModule,
    PjFieldValueModule,
    PjImageModule,
    PjImageManageModule,

    PjInfoCardModule,

    PjModalWindowModule,

    PjProgressStepModule,
    PjProgressBarModule,
    PjProgressStatusModule,
    PjProgressLinearModule,
    PjPopoverModule,

    PjRadioModule,
    PjRadioGroupModule,

    PjStarRateModule,

    PjSearchBarModule,

    PjSelectionGroupModule,
    PjSpinnerModule,
    PjSwitchModule,

    PjThumbnailModule,
    PjTextAreaEntryModule,
    PjTooltipModule,
    PjFileUploadingModule,
    PjFileUploadStatusModule,

    PjTextEntryModule,
    PjHelperBoxModule,
    PjIncentiveModule,
    PjLinkModule,
    PjNotificationModule,
    PjPaginationModule,
    PjPaymentModule,
    PjStepModule,
    PjTabGroupModule,
    PjLinkModule,
    PjCarouselModule,
    PjImageGroupModule,

    PjQuantityAdjustmentModule,
    PjAddressModule,
    PjMediaShowModule,
    PjModelTextValueModule,
    PjFileModule,
    PjAutocompleteModule,
    PjSliderModule,
    PjTableModule,
    PjTableToolbarModule,
    PjFeedbackBannerModule,
    PjSearchResultModule,
    PjActionImageItemModule,
    PjQuickEditModule,

    PjChoiceItemModule,
    PjEmptyStatusModule,
    PjTemplateNameModule,

    PjChangePasswordModule,
    PjCodeEntryModule,
    PjEmailEntryModule,
    PjPasswordEntryModule,
    PjPasswordResetOptionModule,
    PjPhoneVerificationModule,
    PjRegisterFormModule,
    PjEmailVerificationModule,
    PjResetPasswordModule,
    PjSecurityQuestionModule,
    PjTermNoticeModule,
    PjNewPasswordModule,
    PjCardNumberEntryModule,
    PjPhoneNumberEntryModule,
    PjProgressIndicatorModule,
    PjSigninModule,
    PjPasswordResetbyemailModule,
    PjDatetimeModule,
    PjFileInfoItemModule,
    PjPerfixInputModule,
    PjLoadingModule
  ],
  exports: [
    PagePjComponentComponent
  ]
})
export class PagePjComponentModule { }
