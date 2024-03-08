export const ContentSizeBreakPoint = {
    xsMax: 511,
    smMin: 512,
    smMax: 767,
    mdMin: 768,
    mdMax: 833,
    lgMin: 834,
    lgMax: 1023,
    xlMin: 1024,
    xlMax: 1199,
    xxlMin: 1200,
    maxWidth: 1400,
}

export const ScreenSizeBreakPoint = {
    xsMax: 599,
    smMin: 600,
    smMax: 767,
    mdMin: 768,
    mdMax: 833,
    lgMin: 834,
    lgMax: 1023,
    xlMin: 1024,
    xlMax: 1365,
    xxlMin: 1366,
    xxlMax: 1919,
    xxxlMin: 1920,
}

export const ScreenSizeBreakPointString = { 
    ALL: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    XS: 'xs', SM: 'sm', MD: 'md', LG: 'lg', XL: 'xl', XXL: 'xxl', XXXL: 'xxxl' 
}

export const APP_RESOURCE = {
    SMALL_LOGO: 'assets/image/logo/logo.png',
    LARGE_LOGO: 'assets/image/logo/logo_complete_horizontal.png',
}
export const APPCONSTANT = {
    ANONYMOUS: 'anonymous',
    DEFAULT_ROLE: 'buyer',
    DEFAULT_SELLER: 'seller',
    COOKIENAME: {
        LANGUAGE: 'lang',
    },
    LOCAL_STORAGE_ITEM_NAME: {
        METADATA: 'meta.',
        THREAD_AMOUNT: 'opened_thread',
        LOGIN_USER: 'loginUser',
        LOGIN_USER_NAME: 'loginName',
        JWT_TOKEN: 'JWT',
        MAIN_MENU: 'mainMenu',
        LOGIN_PAGE_URL: 'login',
        LAST_USED_URL: 'lastUsedUrl', // 用户最后一次访问服务器时使用的页面
        LAST_ACCESS_TIME: 'lastAccessTime', // 用户最后一次主动访问服务器的时间
    },
    SELECTIVERSCOPE: {      // ques:选择器item范围在前端参数化是否合理? todo 这里总感觉怪怪的,留个remark
        RADIO: 3,           // 0 - 3个选择项，使用radio控件
        SINGLESELECT: 10,   // 4-10个选择项，使用单选下拉框
        AUTOCOMPLETE: 10000 // > 10 个的选择项，使用编辑完成框
    },
    NUMBER_FORMAT: '0.00',
    DATE_FORMAT: 'yyyy-MM-dd',
    DATETIME_FORMAT: 'yyyy-MM-dd hh:mm:ss',
    URL_PARAMETER: {
        BACK_URL: 'backUrl', // 当前页面有back 或者 返回等回到上一页时，需要用到该url参数，以方便回到上一页
        REDIRECT_URL: 'redirectUrl', // 如果登录页面有此参数，在成功登录之后去该页面
    },
    NOT_IMPLEMENT: 'Not implemented functionality.',
    EMPTY_ACCOUNT_IMAGE: 'assets/image/empty_avatar.png',
    emptyImage: 'assets/image/empty_asset.png',
    NO_SEARCH_RESULT: 'assets/image/empty_search.png',
    feedbackCloseDelaySecond: 6,
    minCharsForSearching: 1,
    OneDayMilliSecond: 24 * 60 * 60 * 1000,
    PAGE_SIZE: 5,
    LOADMORE_SIZE: 10,                       // 使用‘load more’能加载数据的最大数量
    emailSendConfirmationData: {
        imageSrc: 'assets/image/mail.png',
        title: 'Reset link sent',
        description: 'We’ve sent a password reset link to your email',
        loginUserEmail: ''
    },
    API_FOR_CONFIG: {
        GEOLOCATION_CITY: 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=#{latitude}&longitude=#{longitude}&localityLanguage=en',
        IP_ADDRESS: 'https://api.bigdatacloud.net/data/client-info'
    },
    SHOWN_BTN_AMOUNT: 4     // 显示在详情页面上的功能按钮的数量，这个数字最好小于5, 否则在小屏幕上没法看
}

export const PJ_CARD_ISSUER = {
    BOA: 'Bank of American',
    CAPITAL: 'Capital One',
    UNKNOW: 'Unknow Finicial Organization',
}

export const PJ_CARD_TYPE = {
    VISA: 'visa',
    MASTER: 'mastercard',
    AMEX: 'amex',
    UNKNOW: 'unknow',
}


