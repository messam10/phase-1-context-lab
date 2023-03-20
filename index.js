let createEmployeeRecord = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map((records) => createEmployeeRecord(records));
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    });

    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    });

    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find((event) => event.date === date);
    let timeOut = this.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    return parseFloat((hoursWorkedOnDate.call(this, date) * this.payPerHour).toString());
}

function findEmployeeByFirstName(array, firstName) {
    return array.find((e) => e.firstName === firstName);
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRecord) {
    return employeeRecord.reduce((memo, record) => memo + allWagesFor.call(record), 0);
}