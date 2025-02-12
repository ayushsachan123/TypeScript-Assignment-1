
const ERROR_CODES = {
    400: 400,
    401: 401,
    403: 403,
    404: 404,
    409: 409,
    429: 429,
    500: 500,
    503: 503
};

export const ERROR = Object.freeze({
    ACCOUNT_BLOCKED: {
        code: ERROR_CODES[401],
        message: 'Your account has been blocked. Please contact admin'
    },
    USER_DOESNOT_EXISTS: {
        code: ERROR_CODES[404],
        message: 'User does not exist'
    },
    INAVLID_STATUS: {
        code: ERROR_CODES[404],
        message: 'Invalid status'
    },
    VALIDATION_ERROR_400: {
        code: ERROR_CODES[400],
        message: 'Validation errors in your request',
        errors: [] // add validation errors
    },
    INTERNAL_SERVER_ERROR_500: {
        code: ERROR_CODES[500],
        message: 'Internal server error',
        errors: []
    },
    UNAUTHORIZED_401: {
        code: ERROR_CODES[401],
        message: 'Unauthorised'
    },
    INVALID_OTP: {
        code: ERROR_CODES[403],
        message: 'Invalid OTP!'
    },
    LOGIN_SESSION_EXPIRED_401: {
        code: ERROR_CODES[401],
        type: 'SESSION_EXPIRED',
        message: 'Your login session is expired! Please login again.'
    },
    PHONE_ALREADY_EXISTS: {
        code: ERROR_CODES[403],
        type: 'PHONE_ALREADY_EXISTS',
        message: 'Phone number already exists.'
    },
    INCORRECT_PASSWORD : {
        code :ERROR_CODES[401],
        message : "Incorrect Password"
    }, 
    ADMIN_UNAUTHORISED : {
        code : ERROR_CODES[401],
        message : "Only admin can perform this task"
    },
    VENDOR_UNAUTHORISED : {
        code : ERROR_CODES[401],
        message : "Only vendor/admin can perform this task"
    },
    EMAIL_CANNOT_BE_UPDATED : {
        code : ERROR_CODES[400],
        message : "Email cannot be updated."
    }
})