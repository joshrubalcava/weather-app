const fourPopularCities = [
	{
		cityName : 'London',
		cityKey: '328328',
	},
	{
		cityName: 'Los Angeles',
		cityKey: '347625',
	},
	{
		cityName: 'Tokyo',
		cityKey: '226396',
	},
	{   cityName: 'Dubai',
		cityKey: '323091',
	},

]

function getFourPopularCitiesCurrentConditions() {
	fourPopularCities.map(async (cities) => {
		try {
			const result = [];
			const searchCityUrl = `http://dataservice.accuweather.com/currentconditions/v1/${cities.cityKey}?apikey=${apiKey}`;
			const res = await fetch(searchCityUrl);
			const data = await res.json();
			let name = cities.cityName;
			let cityTemp = data[0].Temperature.Imperial.Value;
			let weatherText = data[0].WeatherText;
			result.push({
				name,
				cityTemp,
				weatherText,
			})
			updateUIWithFourPopularCities(result);
		} catch (err) {
			console.log('getFourPopularCities: ', err);
		}
	});
}

function updateUIWithFourPopularCities(fourCities) {
	fourCities.forEach((city) => {
		const fourPopularCitiesSection = document.querySelector('.four-popular-cities');
		const cityContainer = document.createElement('div');
		cityContainer.classList.add('four-popular-cities-container');

		let cityName = document.createElement('p');
		cityName.classList.add('four-cities-name');
		cityName.innerText = city.name;

		let cityTempAndWeatherTextContainer = document.createElement('div');
		cityTempAndWeatherTextContainer.classList.add('city-temp-and-weather-icon-container');

		// background images based on weather text
		let fourCitiesWeatherIcon = document.createElement('img');
		switch (city.weatherText) {
			case 'Mostly clear':
			case 'Clear':
			case 'Slightly clear':
			case 'Mostly sunny':
			case 'Sunny':
			case 'Hazy sunshine':
				fourCitiesWeatherIcon.src = '/assets/clear-weather.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon);
				break;

			case 'Cloudy':
			case 'Mostly cloudy':
			case 'Partly cloudy':
				fourCitiesWeatherIcon.src = '/assets/cloudy-weather.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon);
				break;

			case 'Clouds and sun':
			case 'Intermittent clouds':
			case 'Partly sunny':
			case 'Some clouds':
				fourCitiesWeatherIcon.src = '/assets/clouds-and-sun.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon);
				break;

			case 'Partly sunny w/ showers':
				fourCitiesWeatherIcon.src = '/assets/partly-sunny-with-rain.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon)
				break;

			case 'Partly sunny w/ t-storms':
				fourCitiesWeatherIcon.src = '/assets/partly-sunny-with-thunder-storms.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon)
				break;

			case 'Thunderstorms':
			case 'Mostly cloudy w/ t-storms':
				fourCitiesWeatherIcon.src = '/assets/thunder-storms.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon)
				break;

			case 'Dreary':
			case 'Rain':
			case 'Showers':
			case 'Mostly cloudy w/ showers':
				fourCitiesWeatherIcon.src = '/assets/rain.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon)
				break;

			case 'Light fog':
				fourCitiesWeatherIcon.src = '/assets/slight-fog.svg';
				fourCitiesWeatherIcon.classList.add('five-day-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon);
				break;

			case 'Fog':
			case 'Heavy fog':
				fourCitiesWeatherIcon.src = '/assets/foggy.svg';
				fourCitiesWeatherIcon.classList.add('five-day-weather-icon');
				cityTempAndWeatherTextContainer.append(fourCitiesWeatherIcon);
				break;
		}

		let cityTemp = document.createElement('p');
		cityTemp.classList.add('four-cities-temp');
		cityTemp.innerText = `${city.cityTemp} \u2109`;
		cityTempAndWeatherTextContainer.append(cityTemp);

		let weatherText = document.createElement('p');
		weatherText.classList.add('four-cities-weather-text');
		weatherText.innerText = city.weatherText;

		cityContainer.append(cityName, cityTempAndWeatherTextContainer, weatherText);
		fourPopularCitiesSection.append(cityContainer);
	})
}

getFourPopularCitiesCurrentConditions();