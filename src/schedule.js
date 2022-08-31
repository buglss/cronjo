const next = require("../lib/next-date")
const lt = require('long-timeout')

const self = module.exports = function(expression, handler, firstDayOfWeek = 0, id) {
    if(!handler || typeof handler !== "function") throw new Error("Invalid handler parameter. Handler must function.")
    const now = new Date()
    const nextDates = next(expression, { deep: 2, firstDayOfWeek })
    return lt.setTimeout(function() {
        self(expression, handler)
        handler(id)
    }, (nextDates[0] < now ? nextDates[1] : nextDates[0]) - new Date())
}