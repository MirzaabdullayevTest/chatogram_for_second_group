const moment = require('moment')

const formatMessage = (username, text) => {
    const time = moment().format('h:mm:ss')

    return {
        username,
        text,
        time
    }
}


module.exports = formatMessage