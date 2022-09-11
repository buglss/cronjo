[![en-EN](https://img.shields.io/badge/*EN-English-blue?style=plastic)](README.md)
[![tr-TR](https://img.shields.io/badge/TR-Turkish-red?link=README.tr-TR.md)](README.tr-TR.md)

![nodejs](https://img.shields.io/badge/nodejs-43853d?logo=nodedotjs&labelColor=fff)
![npm](https://img.shields.io/badge/npm-bc2c32?logo=npm&labelColor=fff)
![javascript](https://img.shields.io/badge/javascript-e9d961?logo=javascript&labelColor=000)
![mocha](https://img.shields.io/badge/mocha-8d6849?logo=mocha&labelColor=fff)
[![License](https://img.shields.io/badge/License-Apache--2.0-red)](LICENSE)
[![vulnerabilities](https://snyk.io/test/github/buglss/cronti/badge.svg)](https://snyk.io/test/github/buglss/cronjo/)

[![NPM](https://nodei.co/npm/cronjo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cronjo/)

# Introduction

Lets you create scheduled jobs. Unlike other packages, it uses the power of the [cronti](https://www.npmjs.com/package/cronti) package. So you don't need to master crontime expressions to create scheduled jobs.

Unlike other packages that do similar work, it does not require mastery of crontime expressions. In this regard, other packages also have date input support. But you have to calculate and enter this date yourself. You don't need to do such a calculation in the [cronjo](https://www.npmjs.com/package/cronjo) package. Because it uses the power of the [cronti](https://www.npmjs.com/package/cronti) package.

With the power of the [cronti](https://www.npmjs.com/package/cronti) package, you can create scheduled jobs with scheduling/timing expressions used in daily life.

# Install

Using npm:

```bash
npm i cronjo # Locale Install. For use in spesific project.
npm i -g cronjo # Global Install. For use in general projects.
```

Note: Add `--save` if you are using npm < 5.0.0

# Quick Start

```js
// Include Package
const cronjo = require("cronjo")

// Create Scheduled Job
let schedule = cronjo((scheduleId) => { console.log("OK", scheduleId) }, "19 * * * *")

// Available Features
console.log(schedule.id)
console.log(schedule.expression)
console.log(schedule.job)
console.log(schedule.firstDayOfWeek)
console.log(schedule.name)
console.log(schedule.fireDate)
console.log(schedule.nextDates)
console.log(schedule.cancel)

// Scheduled Jobs
console.log(cronjo())

// Helper Functions
console.log(cronjo("HELPERS"))
console.log(cronjo({method: "HELPERS" /* OR method: -1*/}))
```

With the [cronti](https://www.npmjs.com/package/cronti) package features:

```js
// Include Package
const cronjo = require("cronjo")

// Create Scheduled Job to Run Regularly Between Two Dates
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onIntervalTime" // OR -> method: 1
}, "2022-04-25T09:30:00.000Z", "2022-05-15T09:30:00.000Z")

// Create Scheduled Job with Valid Crontime Expression
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onCrontime" // OR -> method: 3
}, "0 2 * * *")

// Create Scheduled Job for a Specific Date
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onDate" // OR -> method: 4
}, "2022-05-26T09:30:00.000Z")

// Create Scheduled Job with Various Combinations of Month, Week, Day of the Week, Time, and Tick Parameters
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onTime" // OR -> method: 2
}, "0FD", "4M", "2W", "3WD")

// Create Scheduled Job for Week in Date 
let schedule = cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onWeek" // OR -> method: 0
}, "2022-05-26T09:30:00.000Z")

// Available Features
console.log(schedule.id)
console.log(schedule.expression)
console.log(schedule.job)
console.log(schedule.firstDayOfWeek)
console.log(schedule.name)
console.log(schedule.fireDate)
console.log(schedule.nextDates)
console.log(schedule.cancel)

// Scheduled Jobs
console.log(cronjo())

// Helper Functions
console.log(cronjo("HELPERS"))
console.log(cronjo({method: "HELPERS" /* OR method: -1*/}))
```

# Documentation

The ``cronjo`` function can take the job function, options, or "HELPERS" in the first parameter, or take no value at all.
If it is used with the job function, the crontime expression should be written in the second parameter.
If used with options values, the next parameters are filled in accordance with the requirements in the [cronti](https://www.npmjs.com/package/cronti) package.
If used with "HELPERS" then no parameter input is needed.
If no parameter values are sent, all created scheduled jobs are returned.

cronjo(<job(function)|options(object)|"HELPERS"(string)>, <crontime(string)|...args>)

## job

It can be used when you want to use the crontime expression while creating a scheduled job.
The job function is entered in the first parameter.
A valid crontime expression is entered in the second parameter.

The id of the scheduled job is sent to the job function as a parameter.

#### Input

|        Parameter        |  Type       | Require  |                                                 Description                                  |
| :---------------------: | :--------: | :-------: | :------------------------------------------------------------------------------------------: |
|      job                |  Function  |   yes     |                                  Function of scheduled job                                   |
|      expression         |  String    |   yes     |                                      The crontime expression to set up the scheduled job     |

#### Output <object>

| Parameter      |  Type    |     Description                                                                |
| :------------: | :------: | :----------------------------------------------------------------------------: |
| id             | Number   | The id of the scheduled job                                                    |
| expression     | String   | crontime expression of scheduled job                                           |
| job            | Function | Function of scheduled job                                                      |
| firstDayOfWeek | Number   | The starting day of the week used to set up the scheduled job                  |
| name           | String   | Scheduled job name                                                             |
| fireDate       | Function | Function that returns the time when the scheduled job will be triggered        |
| nextDates      | Function | Function that returns a list of times when the scheduled job will be triggered |
| cancel         | Function | Function that cancels scheduled job                                            |

#### Example

```js
const cronjo = require("cronjo")
cronjo((scheduleId) => { console.log("OK", scheduleId) }, "0 12 * * *")
```

## options

4 features are offered. These are called method, job, name, and firstDayOfWeek.

|    Feature     |                                             Description                                             |
| :------------: | :-------------------------------------------------------------------------------------------------: |
|     method     |                        The ``cronti`` method to use when creating the scheduled job                 |
|     job        |           Function of scheduled job                                                                 |
|     name       | Scheduled job name                                                                                  |
| firstDayOfWeek |                    The starting day of the week used to set up the scheduled job                    |

## options.method

Features brought by [cronti](https://www.npmjs.com/package/cronti) package are discussed. The only difference is in the "HELPERS" method.
This method returns the helper functions from the ``cronjo`` package.

|    Method       | Index |      Name        |                                             Description                                                |
| :------------: | :---:  | :------------: | :------------------------------------------------------------------------------------------------------: |
|     onWeek     |   0    |     onWeek     |                        Creates scheduled work for the week the date is in                                |
| onIntervalTime |   1    | onIntervalTime |           Creates a scheduled job that will run periodically between two dates                           |
|     onTime     |   2    |     onTime     | Creates scheduled work with various combinations of month, week, day of the week, hour, minute and tick  |
|   onCrontime   |   3    |   onCrontime   |                    Creates scheduled job based on current crontime statement                             |
|     onDate     |   4    |     onDate     |                           Creates scheduled job for a specific date                                      |
|     HELPERS    |   -1   |     HELPERS    |                           Returns helper functions in cronjo package                                     |

## options.method.onWeek

Used to create a scheduled job that will be triggered every day in the week of the entered date.
Creates the scheduled job that will be triggered before the entered date based on the tick value.

A valid date value must be sent as a parameter. Any numeric value can be used for the tick value.

#### Input

|        Parameter        |  Type   | Require |                                                 Description                                                 |
| :---------------------: | :----: | :--------: | :------------------------------------------------------------------------------------------------------: |
|      args.\<date\>      |  Date  |    yes    |                                  Crontime ifadesi için haftanın tarihi                                   |
|      args.\<tick\>      | Number |   no    |                                      Tarihten çıkarılacak gün sayıs                                      |
| args.\<firstDayOfWeek\> | String |   no    | Haftanın ilk günü. 0 ile 6 arasında değerler alır. <sayı>FD değerini alır. Varsayılan değer pazartesidir |

#### Output <object>

| Parameter      |  Type    |     Description                                                                |
| :------------: | :------: | :----------------------------------------------------------------------------: |
| id             | Number   | The id of the scheduled job                                                    |
| expression     | String   | crontime expression of scheduled job                                           |
| job            | Function | Function of scheduled job                                                      |
| firstDayOfWeek | Number   | The starting day of the week used to set up the scheduled job                  |
| name           | String   | Scheduled job name                                                             |
| fireDate       | Function | Function that returns the time when the scheduled job will be triggered        |
| nextDates      | Function | Function that returns a list of times when the scheduled job will be triggered |
| cancel         | Function | Function that cancels scheduled job                                            |

#### Example

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onWeek" // OR -> method: 0
}, "2022-05-26T09:30:00.000Z")
```

## options.method.onIntervalTime

It is used to create a scheduled job based on the start and end date.
According to the Step Parameter, the intervals between two dates are specified.
The Step Parameter is used in days, hours, or minutes.

Parameters must have 2 date values. The order of these dates is not important.
The smaller startDate will be used as the larger endDate.
You can use a string value suitable for the pattern for the Step Parameter.

#### Input

|     Parameter      |           Type           | Require |                  Description                   |
| :----------------: | :---------------------: | :--------: | :------------------------------------------: |
| args.\<startDate\> |          Date           |    yes    |            Cron start date                    |
|  args.\<endDate\>  |          Date           |    yes    |              Cron end date                    |
|   args.\<step\>    | String <.d \| .h \| .m> |   no    | Specifies which steps to run.                |

#### Output <object>

| Parameter      |  Type    |     Description                                                                |
| :------------: | :------: | :----------------------------------------------------------------------------: |
| id             | Number   | The id of the scheduled job                                                    |
| expression     | String   | crontime expression of scheduled job                                           |
| job            | Function | Function of scheduled job                                                      |
| firstDayOfWeek | Number   | The starting day of the week used to set up the scheduled job                  |
| name           | String   | Scheduled job name                                                             |
| fireDate       | Function | Function that returns the time when the scheduled job will be triggered        |
| nextDates      | Function | Function that returns a list of times when the scheduled job will be triggered |
| cancel         | Function | Function that cancels scheduled job                                            |

#### Example

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onIntervalTime" // OR -> method: 1
}, "2022-04-25T09:30:00.000Z", "2022-05-15T09:30:00.000Z")
```

## options.method.onTime

It is used to create scheduled work with various combinations such as month, week, day of the week, hour, minute and tick.
Only time is a required value.
All crontime statements are set according to this time Parameter.
The job scheduled by tick value is created to be triggered before the entered date.

- If only the month(0..11) and week(0,1,2,-1) Parameters are populated, the scheduled job will be created that will be triggered every day from the first day of the week to the last day of that week.
- If only the month(0..11), week(0,1,2,-1) and weekDays(0..6) parameters are populated, the scheduled job for that day of the week will be created.
- If only parameter week(0,1,2,-1) is populated, scheduled job will be created that will be triggered every day during that week. Except for the last week of the month(-1).
- If only the month(0..11) parameter is populated, the scheduled job is created for each day in that month.
- If only parameter weekDays(0..6) is populated, scheduled job will be created for this week day (Mon,Sl,Wed,Thur,cm,cm,Mon) every month.
- If only the month(0..11) and weekDays(0..6) parameters are populated, the scheduled job is created for the day of this week of this month.
- If no Parameters are filled, the scheduled job is created for each day of each month.

A valid month, week, or weekday Parameter value can be sent.
Time Parameter can be sent according to the pattern.
Any numeric value can be used for the tick value.

#### Input

|        Parameter        |       Type       | Require |                                                 Description                                                          |
| :---------------------: | :-------------: | :--------: | :----------------------------------------------------------------------------------------------------------------: |
|     args.\<month\>      |  String <..M>   |   no    |            Month for the crontime expression. It takes values between 0 and 11. <number> Gets the value M.         |
|      args.\<week\>      |  String <..W>   |   no    |          Week for the crontime expression. It takes the values 0, 1, 2, and -1. Gets the <number>W value.          |
|    args.\<weekDays\>    |  String <..WD>  |   no    |     The weekdays for the crontime expression. It takes values between 0 and 6. Gets the value of <number>WD.       |
|      args.\<time\>      | String <dd\:mm> |   no    |                                    Time for crontime expression(dd:mm)                                             |
|      args.\<tick\>      |     Number      |   no    |               The number of days to subtract from the date. Must have month and week parameters                    |
| args.\<firstDayOfWeek\> |     String      |   no    | The first day of the week. It takes values between 0 and 6. Gets the <number>FD value. The default value is monday |

#### Output <object>

| Parameter      |  Type    |     Description                                                                |
| :------------: | :------: | :----------------------------------------------------------------------------: |
| id             | Number   | The id of the scheduled job                                                    |
| expression     | String   | crontime expression of scheduled job                                           |
| job            | Function | Function of scheduled job                                                      |
| firstDayOfWeek | Number   | The starting day of the week used to set up the scheduled job                  |
| name           | String   | Scheduled job name                                                             |
| fireDate       | Function | Function that returns the time when the scheduled job will be triggered        |
| nextDates      | Function | Function that returns a list of times when the scheduled job will be triggered |
| cancel         | Function | Function that cancels scheduled job                                            |

#### Example

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onTime" // OR -> method: 2
}, "0FD", "4M", "2W", "3WD")
```

## options.method.onCrontime

Used when there is a scheduled job based on the valid crontime expression.

#### Input

|     Parameter     |  Type   | Require |     Description      |
| :---------------: | :----: | :--------: | :----------------: |
| args.\<crontime\> | String |    yes    | Crontime expression |

#### Output <object>

| Parameter      |  Type    |     Description                                                                |
| :------------: | :------: | :----------------------------------------------------------------------------: |
| id             | Number   | The id of the scheduled job                                                    |
| expression     | String   | crontime expression of scheduled job                                           |
| job            | Function | Function of scheduled job                                                      |
| firstDayOfWeek | Number   | The starting day of the week used to set up the scheduled job                  |
| name           | String   | Scheduled job name                                                             |
| fireDate       | Function | Function that returns the time when the scheduled job will be triggered        |
| nextDates      | Function | Function that returns a list of times when the scheduled job will be triggered |
| cancel         | Function | Function that cancels scheduled job                                            |

#### Example

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onCrontime" // OR -> method: 3
}, "0 2 * * *")
```

## options.method.onDate

Used when creating a scheduled job based on the entered date value.
It is created to repeat every month or just the month of history and every year.
It is created to trigger before the entered date according to the tick value.

A valid date value must be sent as a parameter.

#### Input

|       Parameter        |   Type   | Require   |                                  Description                                      |
| :--------------------: | :-----: | :--------: | :-------------------------------------------------------------------------------: |
|     args.\<date\>      |  Date   |    yes     |                   The date used for the crontime expression                       |
|     args.\<tick\>      | Number  |   no       | The number of days to subtract from the date. Must have month and week parameters |
| args.\<isMonthOfDate\> | Boolean |   no       |                        Execute only in month of date                              |

#### Output <object>

| Parameter      |  Type    |     Description                                                                |
| :------------: | :------: | :----------------------------------------------------------------------------: |
| id             | Number   | The id of the scheduled job                                                    |
| expression     | String   | crontime expression of scheduled job                                           |
| job            | Function | Function of scheduled job                                                      |
| firstDayOfWeek | Number   | The starting day of the week used to set up the scheduled job                  |
| name           | String   | Scheduled job name                                                             |
| fireDate       | Function | Function that returns the time when the scheduled job will be triggered        |
| nextDates      | Function | Function that returns a list of times when the scheduled job will be triggered |
| cancel         | Function | Function that cancels scheduled job                                            |

#### Example

```js
const cronjo = require("cronjo")
cronjo({
    job(scheduleId) { console.log("OK", scheduleId) },
    method: "onDate" // OR -> method: 4
}, "2022-05-26T09:30:00.000Z")
```

## options.job

The function to call when the scheduled job is triggered. The id of the scheduled job is sent to this function as a parameter.

## options.name

The name of the scheduled job.

## options.firstDayOfWeek

It is a configuration value used in the creation of the scheduled job.
Used to set the starting day of the week.
By default, the start is Sunday.

# Feedback

Please give your feedback about the package.
Please create [issues](issues) when you encounter any bugs.
I will respond to your feedback as soon as possible.

# Authors

It is maintained by:

- Levent Sencer Şahin : [LinkedIn:@buglss](https://www.linkedin.com/in/buglss/) | [Blog:@buglss](https://buglss.github.io/) | [Facebook:@cebuglssio](https://www.facebook.com/cebuglssio) | [Twitter:@cebuglss](https://twitter.com/cebuglss) | [Instagram:@cebuglss](https://www.instagram.com/cebuglss)

# Copyright And License

Copyright Levent Sencer Şahin and other contributors, under [the Apache-2.0](LICENSE).
