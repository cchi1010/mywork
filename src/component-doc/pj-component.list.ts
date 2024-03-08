import { PjKeyValue } from "../component/components.global";
import { DOC_BUTTON_CTA } from "./document/doc-buttonCTA";
import { DOC_ACCORDION } from "./document/doc-accordion";
import { DOC_CAROUSEL } from "./document/doc-carousel";

export const PJ_COMPONENT_MENU = [{
  label: 'Accordion', type: 'item', actionString: 'accordion', iconName: 'check_circle', documentData: DOC_ACCORDION
}, {
  label: 'Action Button', type: 'item', actionString: 'actionButton', iconName: 'check_circle'
}, {
  label: 'Action Card', type: 'item', actionString: 'actionCard', iconName: 'check_circle'
}, {
  label: 'Action Image', type: 'item', actionString: 'actionImageItem', iconName: 'check_circle'
}, {
  label: 'Action Item', type: 'item', actionString: 'actionItem', iconName: 'check_circle'
}, {
  label: 'Alert', type: 'item', actionString: 'alert', iconName: 'check_circle'
}, {
  label: 'Arrow Group', type: 'item', actionString: 'arrowGroup', iconName: 'check_circle'
}, {
  label: 'Avatar', type: 'item', actionString: 'avatar', iconName: 'check_circle'
}, {
  label: 'Badge', type: 'item', actionString: 'badge', iconName: 'check_circle'
}, {
  label: 'Banner', type: 'item', actionString: 'banner', iconName: ''
}, {
  label: 'Breadcrumb', type: 'item', actionString: 'breadcrumb', iconName: 'check_circle'
}, {
  label: 'Button - CTA', type: 'item', actionString: 'buttonCTA', iconName: 'check_circle', documentData: DOC_BUTTON_CTA
}, {
  label: 'Button - ICON', type: 'item', actionString: 'buttonIcon', iconName: 'check_circle'
}, {
  label: 'Button - Inline', type: 'item', actionString: 'buttonInline', iconName: 'check_circle'
}, {
  label: 'Button - FAB', type: 'item', actionString: 'buttonFAB', iconName: 'check_circle'
}, {
  label: 'Button - Favorite', type: 'item', actionString: 'buttonFavorite', iconName: 'check_circle'
}, {
  label: 'Choice Box', type: 'item', actionString: 'choiceBox', iconName: 'check_circle'
}, {
  label: 'Chip', type: 'item', actionString: 'chip', iconName: 'check_circle'
}, {
  label: 'Code Box', type: 'item', actionString: 'codebox', iconName: 'check_circle'
}, {
  label: 'Date Input', type: 'item', actionString: 'dateInput', iconName: ''
}, {
  label: 'Divider', type: 'item', actionString: 'divider', iconName: 'check_circle'
}, {
  label: 'Dropdown', type: 'item', actionString: 'dropdown', iconName: 'check_circle'
}, {
  label: 'Field Value', type: 'item', actionString: 'fieldValue', iconName: 'check_circle'
}, {
  label: 'Image', type: 'item', actionString: 'image', iconName: 'check_circle'
}, {
  label: 'Image Management', type: 'item', actionString: 'imageManagement', iconName: 'check_circle'
}, {
  label: 'Info Card', type: 'item', actionString: 'infoCard', iconName: 'check_circle'
}, {
  label: 'Modal Windows', type: 'item', actionString: 'modalWindow', iconName: 'check_circle'
}, {
  label: 'Progress Series', type: 'item', actionString: 'progressSeries', iconName: 'check_circle'
}, {
  label: 'Popover', type: 'item', actionString: 'popover', iconName: 'check_circle'
}, {
  label: 'Star Rate', type: 'item', actionString: 'starRate', iconName: 'check_circle'
}, {
  label: 'Search Bar', type: 'item', actionString: 'searchBar', iconName: 'check_circle'
}, {
  label: 'Selection - Single', type: 'item', actionString: 'singleSelection', iconName: 'check_circle'
}, {
  label: 'Selection - Multiple', type: 'item', actionString: 'multipleSelection', iconName: 'check_circle'
}, {
  label: 'Spinner', type: 'item', actionString: 'spinner', iconName: 'check_circle'
}, {
  label: 'Switch', type: 'item', actionString: 'switch', iconName: 'check_circle'
}, {
  label: 'Text Entry', type: 'item', actionString: '', iconName: 'check_circle', children: [{
    label: 'Normal', type: 'item', actionString: 'textEntry', badge: 'DONE'
  }, {
    label: 'Phone', type: 'item', actionString: 'phoneEntry', badge: '---'
  }, {
    label: 'Card Numner', type: 'item', actionString: 'cardNumberEntry', badge: '---'
  }]
}, {
  label: 'File', type: 'item', actionString: '', iconName: 'check_circle', children: [{
    label: 'File Uploading', type: 'item', actionString: 'fileUploading', badge: 'DONE'
  }, {
    label: 'File Uploading Status', type: 'item', actionString: 'fileUploadStatus', badge: 'DONE'
  }, {
    label: 'File Info', type: 'item', actionString: 'fileInfoItem', badge: '---'
  }]
}, {
  label: 'Text Area Entry', type: 'item', actionString: 'textAreaEntry', iconName: 'pending'
}, {
  label: 'Tooltip', type: 'item', actionString: 'tooltip', iconName: 'check_circle'
}, {
  label: 'Thumbnail', type: 'item', actionString: 'thumbnail', iconName: 'check_circle'
}, {
  label: 'Password Entry', type: 'item', actionString: 'passwordEntry', iconName: 'check_circle'
}, {
  label: 'Help Box', type: 'item', actionString: 'helpBox', iconName: 'check_circle'
}, {
  label: 'Incentive', type: 'item', actionString: 'incentive', iconName: 'check_circle'
}, {
  label: 'Link - Inline', type: 'item', actionString: 'linkInline', iconName: 'check_circle'
}, {
  label: 'Link - Content', type: 'item', actionString: 'linkContent', iconName: 'check_circle'
}, {
  label: 'Link - Generic', type: 'item', actionString: 'linkGeneric', iconName: 'check_circle'
}, {
  label: 'Notification', type: 'item', actionString: 'notification', iconName: 'pending'
}, {
  label: 'Pagination', type: 'item', actionString: 'pagination', iconName: 'check_circle'
}, {
  label: 'Payment Card', type: 'item', iconName: 'check_circle', children: [{
    label: 'Card Detail', type: 'item', actionString: 'paymentCard', badge: 'DONE'
  }, {
    label: 'Create New Card', type: 'item', actionString: 'paymentCardCreation', badge: 'DONE'
  }, {
    label: 'Edit Card', type: 'item', actionString: 'paymentCardEdit', badge: 'DONE'
  }, {
    label: 'Third Party Payment', type: 'item', actionString: 'thirdPartyPayment', badge: 'DONE'
  }]
}, {
  label: 'Step', type: 'item', actionString: 'step', iconName: 'check_circle'
}, {
  label: 'Tab - Underlined', type: 'item', actionString: 'tabUnderlined', iconName: 'check_circle'
}, {
  label: 'Tab - Pill', type: 'item', actionString: 'tabPill', iconName: 'check_circle'
}, {
  label: 'Tab - Text', type: 'item', actionString: 'tabText', iconName: 'check_circle'
}, {
  label: 'Tab - Outlined', type: 'item', actionString: 'tabOutlined', iconName: 'check_circle'
}, {
  label: 'Autocomplete', type: 'item', actionString: 'autocomplete', iconName: 'home'
}, {
  label: 'Carousel', type: 'item', actionString: 'carousel', iconName: 'check_circle', documentData: DOC_CAROUSEL
}, {
  label: 'Image Group', type: 'item', actionString: 'imageGroup', iconName: 'check_circle'
}, {
  label: 'Quantity Adjustment', type: 'item', actionString: 'quantityAdjustment', iconName: 'check_circle'
}, {
  label: 'Address', type: 'item', actionString: '', iconName: 'check_circle', children: [{
    label: 'Address Detail', type: 'item', actionString: 'addressDetail', badge: 'DONE'
  }, {
    label: 'Address Edit', type: 'item', actionString: 'addressEdit', badge: 'DONE'
  }]
}, {
  label: 'Slider', type: 'item', actionString: '', iconName: 'check_circle', children: [{
    label: 'Single Slider', type: 'item', actionString: 'singleSlider', badge: 'DONE'
  }, {
    label: 'Double Slider', type: 'item', actionString: 'doubleSlider', badge: 'DONE'
  }]
}, {
  label: 'Media Show', type: 'item', actionString: 'mediaShow', iconName: 'check_circle'
}, {
  label: 'Table', type: 'item', actionString: 'table', iconName: 'pending'
}, {
  label: 'Table - Toolbar', type: 'item', actionString: 'tableToolbar', iconName: 'pending'
}, {
  label: 'Feedback Banner', type: 'item', actionString: 'feedbackBanner', iconName: 'pending'
}, {
  label: 'Search Result Block', type: 'item', actionString: 'searchResultBlock', iconName: 'pending'
}, {
  label: 'Quick Edit', type: 'item', actionString: 'quickEdit', iconName: 'pending'
}, {
  label: 'Display Model Data', type: 'item', actionString: 'displayModelData', iconName: 'check_circle'
}, {
  label: 'Empty Status', type: 'item', actionString: 'emptyStatus', iconName: 'pending'
}, {
  label: 'Login Register Password', type: 'item', actionString: 'loginRegisterPassword', iconName: 'pending',
}, {
  label: 'Progress Indicator', type: 'item', actionString: 'progressIndicator', iconName: 'pending',
}, {
  label: 'Loading', type: 'item', actionString: 'loading', iconName: 'pending',
}] as Array<PjKeyValue<any>>;