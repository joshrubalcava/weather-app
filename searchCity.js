let searchQuery = document.querySelector('.search-cities');

searchQuery.addEventListener('search', getCityIdFromSearch);

async function getCityIdFromSearch(evt) {
	evt.preventDefault();
	try {
		let searchCityData =[];

		const searchCityUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${searchQuery.value}`;

		const res = await fetch(searchCityUrl);
		const data = await res.json();
		let firstCity = [data[0]];

		firstCity.map((city) => {
			let cityName = city.LocalizedName;
			let cityKey = city.Key;
			return searchCityData.push({
				cityName,
				cityKey,
			})
		})

		getSearchCityCurrentWeatherConditions(searchCityData);
		searchCityFiveDayForecastUI(searchCityData);
	} catch (err) {
		console.log('getCityIdFromSearch: ', err);
	}
}

function getSearchCityCurrentWeatherConditions(cityKey) {
	cityKey.map(async (searchCity) => {
		try {
			const result = [];
			const searchKeyUrl = `http://dataservice.accuweather.com/currentconditions/v1/${searchCity.cityKey}?apikey=${apiKey}`;

			const res = await fetch(searchKeyUrl);
			const data = await res.json();
			// console.log(data);
			data.forEach((cityData) => {
				let name = searchCity.cityName;
				let cityTemp = cityData.Temperature.Imperial.Value;
				let weatherText = cityData.WeatherText;
				return result.push({
					name,
					cityTemp,
					weatherText,
				});
			})
			updateUIWithSearchCity(result)
		} catch (err) {
			console.log('getSearchCityCurrentWeatherConditions: ', err);
		}
	})
}

function updateUIWithSearchCity(searchCityData) {
	searchCityData.forEach((city) => {
		let cityTitle = document.querySelector('.city-name');
		cityTitle.innerText = city.name;

		let cityTemp = document.querySelector('.city-temp');
		cityTemp.innerText = `${city.cityTemp} \u2109`;

		let weatherText = document.querySelector('.weather-text');
		weatherText.innerText = city.weatherText;

		let weatherIcon = document.querySelector('.weather-icon');
		switch (city.weatherText) {
			case 'Mostly clear':
			case 'Clear':
			case 'Slightly clear':
			case 'Mostly sunny':
			case 'Sunny':
			case 'Hazy sunshine':
				weatherIcon.src = '/assets/clear-weather.svg';
				break;

			case 'Cloudy':
			case 'Mostly cloudy':
			case 'Partly cloudy':
				weatherIcon.src = '/assets/cloudy-weather.svg';
				break;

			case 'Clouds and sun':
			case 'Intermittent clouds':
			case 'Partly sunny':
			case 'Some clouds':
				weatherIcon.src = '/assets/clouds-and-sun.svg';
				break;
			case 'Partly sunny w/ showers':
				weatherIcon.src = '/assets/partly-sunny-with-rain.svg';
				break;

			case 'Partly sunny w/ t-storms':
				weatherIcon.src = '/assets/partly-sunny-with-thunder-storms.svg';
				break;

			case 'Thunderstorms':
			case 'Mostly cloudy w/ t-storms':
				weatherIcon.src = '/assets/thunder-storms.svg';
				break;

			case 'Dreary':
			case 'Rain':
			case 'Showers':
			case 'Mostly cloudy w/ showers':
				weatherIcon.src = '/assets/rain.svg';
				break;

			case 'Light fog':
				weatherIcon.src = '/assets/slight-fog.svg';
				break;

			case 'Fog':
			case 'Heavy fog':
				weatherIcon.src = '/assets/foggy.svg';
				break;
		}
	})
}

function searchCityFiveDayForecastUI(cityKey) {
	cityKey.map(async (searchCity) => {
		const fiveDayForecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${searchCity.cityKey}?apikey=Bc3nqO7yPqguzSjoMWQLiIQmSmlGdZFr`;
		const res = await fetch(fiveDayForecastUrl);
		const data = await res.json();
		let result = [];
		data.DailyForecasts.map((day) => {
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
		updateFiveDayForecastWithSearchCity(result);
	})
}

function updateFiveDayForecastWithSearchCity(searchCityData) {
	let date = document.querySelector('.forecast-date');
	date.innerText = searchCityData.date;

	let weatherIconPhrase = document.querySelector('.five-day-weather-icon');
	switch (searchCityData.iconPhrase) {
		case 'Mostly clear':
		case 'Clear':
		case 'Slightly clear':
		case 'Mostly sunny':
		case 'Sunny':
		case 'Hazy sunshine':
			weatherIconPhrase.src = '/assets/clear-weather.svg';
			break;

		case 'Cloudy':
		case 'Mostly cloudy':
		case 'Partly cloudy':
			weatherIconPhrase.src = '/assets/cloudy-weather.svg';
			break;

		case 'Clouds and sun':
		case 'Intermittent clouds':
		case 'Partly sunny':
		case 'Some Clouds':
			weatherIconPhrase.src = '/assets/clouds-and-sun.svg';
			break;

		case 'Partly sunny w/ showers':
			weatherIconPhrase.src = '/assets/partly-sunny-with-rain.svg';
			break;

		case 'Partly sunny w/ t-storms':
			weatherIconPhrase.src = '/assets/partly-sunny-with-thunder-storms.svg';
			break;

		case 'Thunderstorms':
		case 'Mostly cloudy w/ t-storms':
			weatherIconPhrase.src = '/assets/thunder-storms.svg';
			break;

		case 'Dreary':
		case 'Rain':
		case 'Showers':
		case 'Mostly cloud w/ showers':
			weatherIconPhrase.src = '/assets/rain.svg';
			break;
	}

	let highTemp = document.querySelector('.high-temp');
	highTemp.innerText = `High: ${searchCityData.highTemp} \u2109`;
	let lowTemp = document.querySelector('.low-temp');
	lowTemp.innerText = `Low: ${searchCityData.lowTemp} \u2109`;
}