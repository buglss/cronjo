const { dayOfWeek } = require("cronti")("HELPERS")
const pins = require('./invocation-pins')

const self = module.exports = function(expression, { firstDayOfWeek = 0, fireDate = new Date() } = {}) {
    const { minutes, hours, daysOfMonth, months, daysOfWeek } = pins(expression)
    if(!minutes || !hours || !daysOfMonth || !months || !daysOfWeek) throw new Error(`Invalid expression parameter.`)
    const now = new Date(fireDate)
    const thisYear = now.getFullYear()
    const thisMonth = now.getMonth() + 1
    const thisDayOfMonth = now.getDate()

    // Reset Seconds
    fireDate.setSeconds(0, 0)
    // #############

    // Month Process
    let fireMonth = fireDate.getMonth() + 1
    let nextMonth = months.find(month => month > fireMonth)
    let currentMonth = months.find(month => month === fireMonth)
    if(!currentMonth) {
        fireDate.setDate(1)
        if(nextMonth) {
            let diffMonth = nextMonth - fireMonth
            fireDate.setMonth(fireMonth + diffMonth - 1)
        } else {
            let diffMonth = 12 + months[0] - fireMonth
            fireDate.setMonth(fireMonth + diffMonth - 1)
            return self(expression, { firstDayOfWeek, fireDate })
        }
    }
    // #############

    // Day Of Month Process
    let fireYear = fireDate.getFullYear()
    fireMonth = fireDate.getMonth() + 1
    let lastDayOfMonth = new Date(fireYear, fireMonth, 0).getDate()
    let pureDaysOfMonth = daysOfMonth.filter(dayOfMonth => dayOfMonth <= lastDayOfMonth)
    if(!pureDaysOfMonth.length) throw new Error(`[${daysOfMonth}]: Invalid days of month.`)
    if(thisYear !== fireYear || thisMonth !== fireMonth) fireDate.setDate(1)
    let fireDayOfMonth = fireDate.getDate()
    let nextDayOfMonth = pureDaysOfMonth.find(dayOfMonth => dayOfMonth > fireDayOfMonth)
    let currentDayOfMonth = pureDaysOfMonth.find(dayOfMonth => dayOfMonth === fireDayOfMonth)
    if(!currentDayOfMonth) {
        if(nextDayOfMonth) {
            let diffDayOfMonth = nextDayOfMonth - fireDayOfMonth
            fireDate.setDate(fireDayOfMonth + diffDayOfMonth)
        } else {
            fireDate.setFullYear(fireYear + 1)
            fireDate.setDate(pureDaysOfMonth[0])
            return self(expression, { firstDayOfWeek, fireDate })
        }
    }
    // #############

    // Day Of Week Process
    fireDayOfMonth = fireDate.getDate()
    let fireDayOfWeek = dayOfWeek(fireDate, { firstDayOfWeek })
    let daysOfWeekByFirstDayOfWeek = daysOfWeek.map(dayOfWeek => ~((firstDayOfWeek - dayOfWeek - 7) % 7) + 1).sort((a, b) => a - b)
    let nextDayOfWeek = daysOfWeekByFirstDayOfWeek.find(dayOfWeek => dayOfWeek > fireDayOfWeek)
    let currentDayOfWeek = daysOfWeekByFirstDayOfWeek.find(dayOfWeek => dayOfWeek === fireDayOfWeek)
    if(!currentDayOfWeek && currentDayOfWeek !== 0) {
        if(nextDayOfWeek) {
            let diffDayOfWeek = nextDayOfWeek - fireDayOfWeek
            fireDate.setDate(fireDayOfMonth + diffDayOfWeek)
        } else {
            let diffDayOfWeek = fireDayOfWeek - daysOfWeekByFirstDayOfWeek[0]
            fireDate.setDate(fireDayOfMonth - diffDayOfWeek)
            return self(expression, { firstDayOfWeek, fireDate })
        }
    }
    // #############

    // Hour Process
    fireYear = fireDate.getFullYear()
    fireMonth = fireDate.getMonth() + 1
    if(thisYear !== fireYear || thisMonth !== fireMonth || fireDayOfMonth > thisDayOfMonth) fireDate.setHours(0, 0, 0, 0)
    let fireHours = fireDate.getHours()
    let nextHour = hours.find(hour => hour > fireHours)
    let currentHour = hours.find(hour => hour === fireHours)
    if(!currentHour && currentHour !== 0) {
        if(nextHour) {
            let diffHour = nextHour - fireHours
            fireDate.setHours(fireHours + diffHour)
        } else {
            let diffMonth = 24 + hours[0] - fireHours
            fireDate.setHours(fireHours + diffMonth)
            return self(expression, { firstDayOfWeek, fireDate })
        }
    }
    // #############

    // Minute Process
    let fireMinutes = fireDate.getMinutes()
    let nextMinute = minutes.find(minute => minute > fireMinutes)
    let currentMinute = minutes.find(minute => minute === fireMinutes)
    if(!currentMinute && currentMinute !== 0) {
        if(nextMinute) {
            let diffMinute = nextMinute - fireMinutes
            fireDate.setMinutes(fireMinutes + diffMinute)
        } else {
            let diffMinute = 60 + minutes[0] - fireMinutes
            fireDate.setMinutes(fireMinutes + diffMinute)
            return self(expression, { firstDayOfWeek, fireDate })
        }
    }
    // #############

    return fireDate
}