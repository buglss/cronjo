const { dayOfWeek } = require("cronti")("HELPERS")
// ay - gün - haftanınGunu - saat - dakika
module.exports = function(field, firstDayOfWeek = 0) {
    const { minutes, hours, daysOfMonth, months, daysOfWeek } = field
    if(!minutes || !hours || !daysOfMonth || !months || !daysOfWeek) throw new Error(`Invalid field parameter.`)

    let fireDate = new Date()

    fireDate.setSeconds(0, 0)

    let fireMonth = fireDate.getMonth() + 1
    let nextMonth = months.find(month => month > fireMonth)
    let currentMonth = months.find(month => month === fireMonth)
    if(!currentMonth) {
        if(nextMonth) {
            let diffMonth = nextMonth - fireMonth
            fireDate.setMonth(fireMonth + diffMonth - 1)
        } else {
            let diffMonth = 12 + months[0] - fireMonth
            fireDate.setMonth(fireMonth + diffMonth - 1)
        }
    }

    let fireYear = fireDate.getFullYear()
    fireMonth = fireDate.getMonth() + 1
    let _fireDayOfMonth = new Date(fireDate)
    _fireDayOfMonth.setMonth(_fireDayOfMonth.getMonth() + 1)
    _fireDayOfMonth.setDate(0)
    let lastDayOfMonth = _fireDayOfMonth.getDate()
    let pureDaysOfMonth = daysOfMonth.filter(dayOfMonth => dayOfMonth <= lastDayOfMonth)

    if(!pureDaysOfMonth.length) throw new Error(`[${daysOfMonth}]: Invalid days of month.`)

    let now = new Date()
    let thisYear = now.getFullYear()
    let thisMonth = now.getMonth() + 1
    let thisDayOfMonth = now.getDate()
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
        }
    }

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
        }
    }

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
        }
    }

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
        }
    }

    return fireDate
}