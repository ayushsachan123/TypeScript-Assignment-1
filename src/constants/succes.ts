const SUCCESS_CODES = {
    200: 200,
    201: 201,
    204: 204
};

export const SUCCESS = Object.freeze({
    // GET response
    GET_200: {
        code: SUCCESS_CODES[200],
        message: 'Success'
    },
    GET_200_DATA: {
        code: SUCCESS_CODES[200],
        message: 'Success',
        data: null // add your response data
    },
    // POST response
    POST_201: {
        // Location: /v1/items/12 - in headers
        code: SUCCESS_CODES[201],
        message: 'The item was created successfully.'
    },
    POST_201_DATA: {
        code: SUCCESS_CODES[201],
        message: 'Inserted',
        response: null // add your response data
    },
    //PUT response
    PUT_200_DATA: {
        code: SUCCESS_CODES[200],
        message: 'Updated',
        response: null // add your response data
    },
    PUT_204: {
        // Location: /v1/items/12 - in headers
        code: SUCCESS_CODES[204],
        message: 'Updated'
    },
    //PATCH response
    PATCH_200_DATA: {
        code: SUCCESS_CODES[200],
        message: 'Updated',
        response: null // add your response data
    },
    PATCH_204: {
        // Location: /v1/items/12 - in headers
        code: SUCCESS_CODES[204],
        message: 'Updated'
    },
    // DELETE response
    DELETE_204: {
        code: SUCCESS_CODES[204],
        message: 'Deleted'
    },
    EMAIL_SUCCESS: {
        code: 200,
        message: 'Please check your email',
        response: {}
    },
    LOGIN_SUCCESSFULL : {
        code : SUCCESS_CODES[200],
        message : 'Logged in successfully!'
    },
    NOT_FOUND : {
        code : SUCCESS_CODES[204],
        message : 'Resource not found'
    }
});


export const SUCCESS_MESSAGE = {
    SUCCESS: "SUCCESS"
}