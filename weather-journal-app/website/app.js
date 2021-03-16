/* Global Variables */

// Create a new date instance dynamically with JS
let day = new Date();
let newDate = day.getDate()+'/'+ (day.getMonth()+1)+'/'+  day.getFullYear();

// API key //???
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=8f022d8abaa7d7aa856445c927d9be72&units=metric';


document.getElementById('generate').addEventListener('click', callAction);


// Call Back Function For Event Listener 
function callAction (e) {

    const getZipCode = document.getElementById('zip').value;
    const getFeelings = document.getElementById('feelings').value; 

    getinfo(baseUrl, getZipCode, apiKey)

    .then (function (data) {
        console.log(data);
        postData('/add', {date: newDate, temp: data.main.temp, content: getFeelings})
        .then(updateUI())
    })
       
}

// Get API data 

const  getinfo = async (baseUrl, getZipCode, apiKey) => {

    const request = await fetch(baseUrl + getZipCode + apiKey)
    try {
        const data = await request.json ();
        return data; 

    }catch(error) {
        console.log("error", error);
    }
}

// post data 

const postData = async(url ='', data ={}) =>{
    
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {

            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data)

    });

    try {

        const newData = await response.json();
        console.log(newData);
        return newData
    }catch(error){
        console.log("error", error);

    }

}

// appear data on screen

const updateUI= async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json(); 
        document.getElementById('date').innerHTML = `date: ${data.date}`;
        document.getElementById('temp').innerHTML = `temp: ${data.temp}`;
        document.getElementById('content').innerHTML = `feel: ${data.content}`;

    }catch(error) {

        console.log("error", error);

    }
}
