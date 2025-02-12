export const USER_STATUS = Object.freeze({
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
    UNVERIFIED: 4,
  })


  export const CONSTANT_VALUES = {
    MAX_LIMIT: 100,
    MIN_LIMIT:10,
    PAGE:1
  }

  export const PLATFORM = {
    IOS : 1,
    ANDROID: 2
  }

  
export const TIME_CONSTANTS = Object.freeze({
  OTP_EXPIRE_TIME_REGISTRATION: 2,
  HOURS: 'h',
  MONTH: 'month'
})

export const LOGIN_TYPE = Object.freeze({
  PHONE:1,
  FACEBOOK:2,
  GOOGLE:3,
  APPLE:4
})

export const TOKEN_TYPE = {
  USER_ACCESS_TOKEN : 1
}


export const CATEGORY_STATUS = Object.freeze({
  ACTIVE: 1,
  INACTIVE: 2,
  DELETED: 3,
  OUT_OF_STOCK : 4
})


export const PRODUCT_STATUS = Object.freeze({
  ACTIVE: 1,
  INACTIVE: 2,
  DELETED: 3,
  OUT_OF_STOCK : 4
})

export const PAYMENT_STATUS  = Object.freeze({
  PENDING : 0,
  COMPLETE : 1,
  FAILED : 2
})

export const ORDER_DELIVERY_STATUS = Object.freeze({
  WAITING_FOR_APPROVAL : 0,
  READY_FOR_DISPATCH : 1,
  PARTIALLY_DISPATCHED : 2,
  DISPATCHED : 3,
  DELIVERED : 4,
  UNDELIVERED : 5
})