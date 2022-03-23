/* Global Variables */
const apiUrl="https://api.openweathermap.org/data/2.5/weather?"
// Personal API Key for OpenWeatherMap API
const apiKey = '90160bf407f1cfbe44fa0263fcab8718&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);

// Generate Button
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const zipCode=document.getElementById("zip").value;
    const content=document.getElementById('feelings').value;
    getWeather(apiUrl,zipCode,apiKey)
    .then((userData)=>{
      postData('/add',{
        date: newDate,
        temp: userData.main.temp,
        content: content
      })
    }).then(()=>{
      updateUI();
    });
})

// Get Temperature from api
const getWeather= async (apiUrl,zipCode,apiKey)=>{
    const res= await fetch(`${apiUrl}zip=${zipCode},us&appid=${apiKey}`)
    try {
      // Transform into JSON
        const data = await res.json();
        console.log(data)
        return data;
      }  catch(error) {
        console.log("error", error);
      }
}
// POST Data
const postData = async (url,data)=>{
    const response= await fetch(url,{
      method:'post',
      headers:{'Content-Type': 'application/json',},
      body:JSON.stringify({
        date:data.date,
        temp:data.temp,
        content:data.content })
    });
    try {
      // Transform into JSON
      const newData = await response.json();
             return newData
    }catch(error) {
    console.log("error", error);
    }
}
// Show data to the user
const updateUI=async ()=>{
  const req=await fetch('/all');
  try{
    // Transform into JSON
    const allData = await req.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML=`Date: ${allData.date}`;
    document.getElementById('temp').innerHTML=`Temperature: ${allData.temp}°K`;
    document.getElementById('content').innerHTML=`Feeling: ${allData.content}`;

  }catch(error){
    console.log("error", error);
  }
}