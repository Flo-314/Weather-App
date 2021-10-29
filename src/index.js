async function getGif() {
  const link = 'https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=1939b0b8b76c93cf95438f0501c7ef00';
  try {
    const data = await fetch(link, { mode: 'cors' });
    const weatherData = await data.json();
    console.log(weatherData);
    const temperature = weatherData.main.temp;
    const minTemp = weatherData.main.temp_max;
    const maxTemp = weatherData.main.temp_min;
    console.log(temperature, minTemp, maxTemp);
  } catch (error) {
    prompt(error);
  }
}

getGif();
