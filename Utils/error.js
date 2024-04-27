exports.createError = (statusCode, errorMessage, data) => {
    const errorObj = {
        status: statusCode,
        message: errorMessage,
        data: data
    }
    return errorObj
}