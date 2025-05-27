const _ = require('lodash');
const dayjs = require('dayjs');

// dictionary of holidays 
const holidays = [
    {
        name: 'New Years', date: "2026-01-01"
    },
    {
        name: 'Christmas', date: "2026-12-25"
    },
    {
        name: 'Thanksgiving', date: "2026-11-26"
    },
    {
        name: 'Canada Day', date: "2025-07-01"
    }
];

// interating iver holidays
console.log("Days until each holiday:");

holidays.forEach(holiday => {
    const today = dayjs();
    const holidayDate = dayjs(holiday.date);
    const daysUntil = holidayDate.diff(today, 'day');

// output name annd # of days 
console.log(`${holiday.name} is in ${daysUntil} days.`);
});

// using lodash lib to output name and date of a random holiday 
const randomHoliday = _.sample(holidays);
console.log("\nRandom Holiday:");
console.log(`${randomHoliday.name} on ${randomHoliday.date}`);

const christmasIndex = _.findIndex(holidays, {name: "Christmas" });
const canadaDayIndex = _.findIndex(holidays, {name: "Canada Day" });

console.log("\nIndexes:");
console.log(`Christmas is at index ${christmasIndex}`);
console.log(`Canada Day is at index ${canadaDayIndex}`);

