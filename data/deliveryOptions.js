export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 120
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 199
    }
];


function deliveryOptionsHTML(){
    deliveryOptions.forEach((deliveryOption)=>{
        `
            
        `;
    });
}
deliveryOptionsHTML();

// Importing ESM-version of day.JS Library using JS-Modules
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.2/dist/index.mjs'; // Default-Export Syntax


// Using day.JS library to showing delivery dates on checkout-page
/*
Best Practice in Programming --->
=> When we need something complicated,
1. Try to find an external Library first.
2. Before writing the code ourselves. 
*/
const now = dayjs();
const todaysDate = now.format('YYYY-MM-DD');
console.log('todaysDate : ',todaysDate);
const newDate = now.add(7,'day');
const deliveryDate = newDate.format('dddd, MMMM D');
console.log('deliverDate(after 7 days) : ',deliveryDate);