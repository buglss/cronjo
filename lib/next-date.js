const fire = require("./fire-date")

module.exports = function(expression, { deep = 5, firstDayOfWeek = 0, fireDate = new Date() } = {}) {
    if(typeof deep !== "number" || deep < 0) throw new Error(`[${deep}]: Invalid deep value. Deep must positive numbers.`)

    let dates = [new Date(fire(expression, { firstDayOfWeek, fireDate }))]
    for(let i = 1; i < deep; i++) {
        let firedDate = new Date(fire(expression, { firstDayOfWeek, fireDate: dates.slice(-1)[0] }))
        firedDate.setMinutes(firedDate.getMinutes() + 1)
        dates.push(new Date(fire(expression, { firstDayOfWeek, fireDate: firedDate })))
    }

    return dates
}