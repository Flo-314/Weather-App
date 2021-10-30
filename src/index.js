const apiMethods = (() => {
  const getApiRequest = async (city) => {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1939b0b8b76c93cf95438f0501c7ef00`;
    let weatherData;
    try {
      const data = await fetch(link, { mode: 'cors' });
      weatherData = await data.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return weatherData;
  };
  const getData = async (city) => {
    const weatherData = await getApiRequest(city);
    const location = weatherData.name;
    const { temp } = weatherData.main;
    const tempMin = weatherData.main.temp_min;
    const tempMax = weatherData.main.temp_max;
    const { humidity } = weatherData.main;
    const wind = weatherData.wind.speed;
    const { pressure } = weatherData.main;
    const weatherStatus = weatherData.weather[0].main;
    return {
      location, temp, tempMin, tempMax, humidity, wind, pressure, weatherStatus,

    };
  };
  return { getData };
})();
const domMethods = (() => {
  const printMain = async (city) => {
    const data = await apiMethods.getData(city);
    const domLocation = document.querySelector('#location');
    const domTemp = document.querySelector('#temp');
    const domTempVar = document.querySelector('#tempVar');
    const domHumidity = document.querySelector('#humidity');
    const domPressure = document.querySelector('#pres');
    const domWSpeed = document.querySelector('#wSpeed');
    const image = document.querySelector('img');

    const tempVar = `${Math.round(data.tempMin - 273)}°C - ${Math.round(data.tempMax - 273)}°C`;

    domLocation.textContent = data.location;
    domTemp.textContent = `${Math.round(data.temp - 273)}°C`;
    domTempVar.textContent = tempVar;
    domHumidity.textContent = `Humidity: ${data.humidity}%`;
    domPressure.textContent = `Pressure: ${data.pressure}Torr`;
    domWSpeed.textContent = `Wind Speed: ${data.wind}m/s`;

    if (data.weatherStatus === 'Rain' || data.weatherStatus === 'Snow') { image.src = '../images/raining.png'; } else if (data.weatherStatus === 'Clouds') {
      image.src = '../images/cloudy.png';
    } else {
      image.src = '../images/sun.png';
    }
  };
  const inputForm = () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    button.addEventListener('click', async () => {
      await printMain(input.value);
    });
    form.onsubmit = async () => {
      await printMain(input.value);
    };
  };
  return { inputForm, printMain };
})();
domMethods.inputForm();
