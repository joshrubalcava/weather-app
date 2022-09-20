let randomCityArr = [];

const apiKey = 	'Bc3nqO7yPqguzSjoMWQLiIQmSmlGdZFr';

async function getRandomCities() {
	try {
		let group = 50;
		// const proxy = 'https://obscure-mountain-07258.herokuapp.com/';
		const topCitiesListUrl = `http://dataservice.accuweather.com/currentconditions/v1/topcities/${group}?apikey=${apiKey}`;

		const res = await fetch(topCitiesListUrl);
		const data = await res.json();
		const result = [];

		data.map((city) => {
			let cityKey = city.Key;
			let cityName = city.EnglishName;
			let cityTemp = city.Temperature.Imperial;
			let weatherText = city.WeatherText;
			result.push({
				cityKey,
				cityName,
				cityTemp,
				weatherText,
			});
		});

		selectRandomCity(result, 1);
		updateUIWithRandomCity(randomCityArr);
		fiveDayForecast(randomCityArr);
	} catch (err) {
		console.log('getTopCitiesWeather: ', err)
	}
}

function selectRandomCity(cityArr, numIdx) {
	const cityNameAndTempArr = [...cityArr].sort(() => 0.5 - Math.random());
	return randomCityArr = cityNameAndTempArr.slice(0, numIdx);
}

function updateUIWithRandomCity() {
	randomCityArr.forEach((city) => {
		const randomCitySection = document.querySelector('.random-city');
		let cityContainer = document.createElement('div');
		cityContainer.classList.add('city-container');
		let cityTitle = document.createElement('p');
		cityTitle.innerText = city.cityName;
		cityTitle.classList.add('city-name');

		// create container and elements for the city temperature & weather status
		let cityTempAndWeatherTextContainer = document.createElement('div');
		cityTempAndWeatherTextContainer.classList.add('cityTempAndWeatherTextContainer');
		let cityTemp = document.createElement('p');
		cityTemp.innerText = `${city.cityTemp.Value} \u2109`;
		cityTemp.classList.add('city-temp');
		let weatherText = document.createElement('p');
		weatherText.innerText = city.weatherText;
		weatherText.classList.add('weather-text');

		// background images based on weather text
		let weatherIcon = document.createElement('img');
		switch (city.weatherText) {
			case 'Mostly clear':
			case 'Clear':
			case 'Slightly clear':
			case 'Mostly sunny':
			case 'Sunny':
			case 'Partly Sunny':
				weatherIcon.src = '/assets/clear-weather.svg';
				weatherIcon.classList.add('weather-icon');
				cityTempAndWeatherTextContainer.append(weatherIcon);
				break;

			case 'Cloudy':
			case 'Mostly cloudy':
			case 'Partly cloudy':
				weatherIcon.src = '/assets/cloudy-weather.svg';
				weatherIcon.classList.add('weather-icon');
				cityTempAndWeatherTextContainer.append(weatherIcon);
				break;

			case 'Clouds and sun':
				weatherIcon.src = '/assets/clouds-and-sun.svg';
				weatherIcon.classList.add('weather-icon');
				cityTempAndWeatherTextContainer.append(weatherIcon);
				break;
		}

		cityTempAndWeatherTextContainer.append(cityTemp);

		cityContainer.append(cityTitle);
		cityContainer.append(cityTempAndWeatherTextContainer);
		cityContainer.append(weatherText);
		randomCitySection.append(cityContainer);
	})
}

function fiveDayForecast(key) {
	try {
		key.map(async (item) => {
			const fiveDayForecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${item.cityKey}?apikey=Bc3nqO7yPqguzSjoMWQLiIQmSmlGdZFr`;
			const res = await fetch(fiveDayForecastUrl);
			const data = await res.json();
			let result = [];
			data.DailyForecasts.map((day) => {
				console.log(day);
				let date = day.Date.slice(0, 10);
				let highTemp = day.Temperature.Maximum.Value
				let lowTemp = day.Temperature.Minimum.Value;
				let iconPhrase = day.Day.IconPhrase;
				return result.push({
					date,
					highTemp,
					lowTemp,
					iconPhrase,
				})
			})
			updateUIWithFiveDayForecast(result);
		})
	} catch (err) {
		console.log('fiveDayForecast: ', err);
	}
}

function updateUIWithFiveDayForecast(forecastArr) {
	const fiveDayForecastSection = document.querySelector('.five-day-forecast');
	forecastArr.forEach((day) => {
		let dayContainer = document.createElement('div');
		dayContainer.classList.add('day-container');

		let date = document.createElement('p');
		date.classList.add('forecastDate');
		date.innerText = day.date;
		dayContainer.append(date);

		let weatherIconPhrase = document.createElement('img');
		switch (day.iconPhrase) {
			case 'Mostly clear':
			case 'Clear':
			case 'Slightly clear':
			case 'Mostly sunny':
			case 'Sunny':
			case 'Hazy sunshine':
				weatherIconPhrase.src = '/assets/clear-weather.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				fiveDayForecastSection.append(dayContainer);
				break;

			case 'Cloudy':
			case 'Mostly cloudy':
			case 'Partly cloudy':
				weatherIconPhrase.src = '/assets/cloudy-weather.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				break;

			case 'Clouds and sun':
			case 'Intermittent clouds':
			case 'Partly sunny':
				weatherIconPhrase.src = '/assets/clouds-and-sun.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				break;

			case 'Partly sunny w/ showers':
				weatherIconPhrase.src = '/assets/partly-sunny-with-rain.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				break;

			case 'Partly sunny w/ t-storms':
				weatherIconPhrase.src = '/assets/partly-sunny-with-thunder-storms.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				break;

			case 'Thunderstorms':
			case 'Mostly cloudy w/ t-storms':
				weatherIconPhrase.src = '/assets/thunder-storms.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				break;

			case 'Dreary':
			case 'Rain':
			case 'Showers':
			case 'Mostly cloud w/ showers':
				weatherIconPhrase.src = '/assets/rain.svg';
				weatherIconPhrase.classList.add('weather-icon');
				dayContainer.append(weatherIconPhrase);
				break;
		}

		let highTemp = document.createElement('p');
		highTemp.classList.add('high-temp');
		highTemp.innerText = `High: ${day.highTemp}`;
		let lowTemp = document.createElement('p');
		lowTemp.classList.add('low-temp');
		lowTemp.innerText = `Low: ${day.lowTemp}`;
		dayContainer.append(highTemp, lowTemp);

		fiveDayForecastSection.append(dayContainer);
	})
}



function updateDate() {
	const date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let currentDate = `${month}-${day}-${year}`;

	const dateSection = document.querySelector('.date-and-time');
	const dateValue = document.createElement('p');
	dateValue.innerText = currentDate;
	dateValue.classList.add('date');
	dateSection.prepend(dateValue);
}

// on load
getRandomCities();
updateDate();