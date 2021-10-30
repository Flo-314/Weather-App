const apiMethods = (() => {
  const getApiRequest = async () => {
    const link = 'https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=1939b0b8b76c93cf95438f0501c7ef00';
    let weatherData;
    try {
      const data = await fetch(link, { mode: 'cors' });
      weatherData = await data.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('caca');
    }
    return weatherData;
  };
  const getData = async () => {
    const weatherData = await getApiRequest();
    const location = weatherData.name;
    const { temp } = weatherData.main;
    const tempMin = weatherData.main.temp_min;
    const tempMax = weatherData.main.temp_max;
    const { humidity } = weatherData.main;
    const wind = weatherData.wind.speed;
    const { pressure } = weatherData.main;
    return {
      weatherData, location, temp, tempMin, tempMax, humidity, wind, pressure,
    };
  };
  return { getApiRequest, getData };
})();
const domMethods = (() => {
  const inputForm = () => {
    const form = document.querySelector('form');
    /*     form.onsubmit = api
 */ };

  return { inputForm };
})();
apiMethods.getData();
