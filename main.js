const cronti = require("cronti")
const schedule = require("./src/schedule")
const cancel = require("./src/cancel")
const fire = require("./lib/fire-date")
const next = require("./lib/next-date")

let localeStorage = {}

module.exports = function({ method = "onCrontime", job, name, firstDayOfWeek = 0 } = {}, ...args) {
    if(!arguments.length) return localeStorage
    const expression = cronti(method, ...args)
    const id = Date.now()
    const timer = schedule(expression, job, firstDayOfWeek, id)
    localeStorage[id] = {
        id,
        expression,
        job,
        firstDayOfWeek,
        name: name || `${id} Job`,
        cancel() { return cancel(timer) },
        fireDate({ firstDayOfWeek = 0 } = {}) { return fire(expression, { firstDayOfWeek }) },
        nextDates({ deep = 5, firstDayOfWeek = 0 } = {}) { return next(expression, { deep, firstDayOfWeek }) }
    }
    return localeStorage[id]
}