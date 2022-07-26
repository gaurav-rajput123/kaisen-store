const jsonResponse = (errorMessage, response) => {
    return {
        errorMessage: errorMessage,
        response: response
    };
}

const dynamoReturn = (isError, response) => {
    return {
        isError: isError,
        returnVal: response
    };
}

module.exports = {jsonResponse, dynamoReturn};