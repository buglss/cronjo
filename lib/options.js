module.exports = {
    predefined: {
        "daily": "0 0 * * *",
        "hourly": "0 * * * *",
        "monthly": "0 0 1 * *",
        "weekly": "0 0 * * 0",
        "yearly": "0 0 1 1 *"
    },
    fields: [
        "minutes",
        "hours",
        "daysOfMonth",
        "months",
        "daysOfWeek"
    ],
    fieldLength: 5,
    maxValue: {
        minutes: 59,
        hours: 23,
        daysOfMonth: 31,
        months: 12,
        daysOfWeek: 6
    },
    minValue: {
        minutes: 0,
        hours: 0,
        daysOfMonth: 1,
        months: 1,
        daysOfWeek: 0
    }
}