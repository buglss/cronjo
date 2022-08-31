const lt = require('long-timeout')

module.exports = function(timer) {
    if(!timer) throw new Error(`[${timer}]: Invalid timer parameter. Timer required.`)
    try {
        lt.clearTimeout(timer)
        return true
    } catch(error) { return error }
}