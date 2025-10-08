

let apiKey = "c12a48c9ac1ec37bedd3cc51b1af4e8b";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

const searchBox = document.querySelector(".search input");
const Button = document.querySelector(".search button");
const weatherimg =document.querySelector(".weatherimg");

async function checkWeather(city){
    const response = await fetch(apiUrl + "q="+ city + "&"+ `units=imperical`+ `&appid=${apiKey}`);

   

    
    var data = await response.json();

     console.log(data);

    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp)-273+ "°C";
    document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
    document.querySelector(".wind").innerHTML= data.wind.speed + "km/h";

   if(data.weather[0].main == "Clouds"){
    weatherimg.src = "images/cloud.jpg";
   }
    
   else if(data.weather[0].main == "Rain"){
    weatherimg.src = "images/rain.jpg";
   }
   
    else if(data.weather[0].main == "Mist"){
    weatherimg.src = "images/mist.jpg";
   }
   
    else if(data.weather[0].main == "Clear"){
    weatherimg.src = "images/clear.jpg";
   }
   else if(data.weather[0].main == "Drizzle"){
    weatherimg.src = "images/drizzle.jpg";
   }


}

Button.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    
});
