const apiMethods = (() => {
  const getApiRequest = async (city) => {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1939b0b8b76c93cf95438f0501c7ef00`;
    let weatherData;
    try {
      const data = await fetch(link, { mode: 'cors' });
      weatherData = await data.json();
    } catch (error) {
      // eslint-disable-next-line no-alert
      prompt(error);
    }
    return weatherData;
  };
  // eslint-disable-next-line consistent-return
  const getData = async (city) => {
    try {
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
    // eslint-disable-next-line no-use-before-define
    } catch (error) { domMethods.printError(); }
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
    image.classList.add('img');

    const tempVar = `${Math.round(data.tempMin - 273)}°C - ${Math.round(data.tempMax - 273)}°C`;

    domLocation.textContent = data.location;
    domTemp.textContent = `${Math.round(data.temp - 273)}°C`;
    domTempVar.textContent = tempVar;
    domHumidity.textContent = `Humidity: ${data.humidity}%`;
    domPressure.textContent = `Pressure: ${data.pressure}Pascals`;
    domWSpeed.textContent = `Wind Speed: ${data.wind}m/s`;

    if (data.weatherStatus === 'Rain' || data.weatherStatus === 'Snow') { image.src = 'https://cdn-icons.flaticon.com/png/512/3093/premium/3093390.png?token=exp=1635635211~hmac=c8e25fa19c66ee608ecbeeef3118a385'; } else if (data.weatherStatus === 'Clouds') {
      image.src = 'https://cdn-icons-png.flaticon.com/512/3208/3208752.png';
    } else {
      image.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163662.png';
    }
  };
  const inputForm = () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');

    form.onsubmit = async () => {
      await printMain(input.value);
    };
  };
  const printError = () => {
    const input = document.querySelector('#inputError');
    input.textContent = 'Invalid location, please, introduce another city.';
    setTimeout(() => {
      input.textContent = '';
    }, 2500);
  };
  return { inputForm, printMain, printError };
})();
domMethods.inputForm();
domMethods.printMain('Buenos Aires');
