// Temporal object is now a thing but still in lecture dates and time are thought so according to that we will learn old version and 
// when needed in future can refer to mdn temporal docs 

// Dates

let myDate = new Date()
console.log(myDate); // 2026-06-17T03:10:11.908Z
console.log(myDate.toString()); // Wed Jun 17 2026 08:40:11 GMT+0530 (India Standard Time)
console.log(myDate.toDateString()); // Wed Jun 17 2026
console.log(myDate.toISOString()); // 2026-06-17T03:10:11.908Z
console.log(myDate.toJSON()); // 2026-06-17T03:10:11.908Z
console.log(myDate.toLocaleString()); // 6/17/2026, 8:40:11 AM
console.log(myDate.toLocaleTimeString()); // 8:40:11 AM
console.log(myDate.toTimeString()); // 08:40:11 GMT+0530 (India Standard Time)
console.log(myDate.toUTCString()); // Wed, 17 Jun 2026 03:10:11 GMT

console.log(typeof myDate); // object 

let myCreatedDate = new Date(2023, 0, 3)
console.log(myCreatedDate.toDateString()); // Tue Jan 03 2023

let myTimeStamp = Date.now()

console.log(myTimeStamp);
console.log(myCreatedDate.getTime());

let newDate = new Date()

console.log(newDate.getDate()) // 17
console.log(newDate.getDay()) // 3
console.log(newDate.getMonth()) // 5

// ok so the toLocaleString method of date is very interesting let us play around it a lil bit 

newDate.toLocaleString('default', {
    weekday: "long" // You can adjust the properties here
})