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

async function getFourPopularCitiesCurrentConditions() {
	try {
		// debugger;

		fourPopularCities.map(async (cities) => {
			const result = [];
			const searchCityUrl = `http://dataservice.accuweather.com/currentconditions/v1/${cities.cityKey}?apikey=${apiKey}`;
			const res = await fetch(searchCityUrl);
			const data = await res.json();
			console.log(data[0]);
			let name = cities.cityName;
			let cityTemp = data[0].Temperature.Imperial.Value;
			let weatherText = data[0].WeatherText;
			result.push({
				name,
				cityTemp,
				weatherText,
			})
			console.log(result);
			updateUIWithFourPopularCities(result);
		});
	} catch (err) {
		console.log('getFourPopularCities: ', err);
	}
}

function updateUIWithFourPopularCities(fourCities) {
	fourCities.forEach((city) => {
		// console.log(city);
		const fourPopularCitiesSection = document.querySelector('.four-popular-cities');
		const cityContainer = document.createElement('div');
		cityContainer.classList.add('four-popular-cities-container');

		let cityName = document.createElement('p');
		cityName.classList.add('four-cities-name');
		cityName.innerText = city.name;

		let cityTempAndWeatherTextContainer = document.createElement('div');
		cityTempAndWeatherTextContainer.classList.add('city-temp-and-weather-icon-container');

		let fourCitiesWeatherIcon = document.createElement('img');
		switch (city.weatherText) {
			case 'Mostly clear':
			case 'Clear':
			case 'Slightly clear':
			case 'Mostly sunny':
			case 'Sunny':
			case 'Partly Sunny':
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
				fourCitiesWeatherIcon.src = '/assets/clouds-and-sun.svg';
				fourCitiesWeatherIcon.classList.add('four-cities-weather-icon');
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