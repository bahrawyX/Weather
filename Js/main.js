var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
let daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

async function getApi(country) {
    var api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=906140414b6a49b681a192850231802&q=${country}&days=3&aqi=no&alerts=no`)
    var all = await api.json();
    let countryName = all.location.name;
    console.log("Country name is " + countryName);

    let todaysTemp = all.current.temp_c;

    let tmrsTempMax = all.forecast.forecastday[1].day.maxtemp_c;
    let tmrsTempMin = all.forecast.forecastday[1].day.mintemp_c;

    let afterTmrsTempMax = all.forecast.forecastday[2].day.maxtemp_c;
    let afterTmrsTempMin = all.forecast.forecastday[2].day.mintemp_c;

    let myDate = new Date();
    let month = myDate.getMonth();
    let dayInWeek = daysInWeek[myDate.getDay()];
    let tomorrow = daysInWeek[myDate.getDay() + 1]
    let afterTomorrow = daysInWeek[myDate.getDay() + 2]
    let mostafa = all.current.last_updated.slice(8, 10);
    let weatherCondtion = all.current.condition.text;
    let weatherCondtionIcon = all.current.condition.icon;


    console.log(all);
    let cardContainer = document.getElementById('cardContainer');
    let cartona = `
            <div class="col-md-4 g-0 ">
                <div class="cardd first">
                    <div class="header   d-flex justify-content-between  p-1  ">
                        <h5>${dayInWeek}</h5>
                        <h5>${months[month]}</h5>
                    </div>
                <div class="card-body">
                    <h6>${countryName}</h6>
                    <p class="deg">${todaysTemp}<sup>o</sup>C
                        
                    <img class="w-25" src="https:${weatherCondtionIcon}" alt="">
                    </p>
                    <span class="blu">${weatherCondtion}</span>
                    <div class="logos">
                        <i class="fa-solid fa-umbrella"></i>
                        <span>20%</span>
                        <i class="fa-solid fa-wind"></i>
                        <span>18km/h</span>
                        <i class="fa-solid fa-compass"></i>
                        <span>East</span>
                    </div>
                </div>
                </div>
            </div>

            <div class="col-md-4 text-center ">
                <div class="cardd second ">
                    <div class="header   d-flex justify-content-center n  p-1  ">
                        <h5>${tomorrow}</h5>
                        
                    </div>
                    <div class="icon">
                        <img class="w-25 mb-2" src="https:${all.forecast.forecastday[1].day.condition.icon}" alt="">
                    </div>
                    <div class="degrees">
                        <p class="maxDeg">${tmrsTempMax}<sup>o</sup>C</p>
                        <p class=" min  ">${tmrsTempMin}<sup>o</sup>c</p>
                    </div>

                    <span class="blu bot ">${all.forecast.forecastday[1].day.condition.text}</span>

                </div>
            </div>

            <div class="col-md-4 text-center ">
                <div class="cardd first third ">
                    <div class="header    d-flex justify-content-center  p-1  ">
                        <h5>${afterTomorrow}</h5>
                        
                    </div>
                    <div class="icon">
                        <img class="w-25" src="https:${all.forecast.forecastday[2].day.condition.icon}" alt="">
                    </div>
                    <div class="degrees">
                        <p class="maxDeg">${afterTmrsTempMax}<sup>o</sup>C </p>
                        <p class=" min">${afterTmrsTempMin}<sup>o</sup>c</p>
                    </div>

                    <span class="blu bot">${all.forecast.forecastday[2].day.condition.text}</span>

                </div>
            </div>
    `
    cardContainer.innerHTML = cartona;
}
getApi("cairo")

function searchWeather() {
    let country = document.getElementById('inputSearch').value;
    getApi(country);
}

document.getElementById('inputSearch').addEventListener('keyup', searchWeather);