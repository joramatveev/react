const API_KEY: string = 'c9147f5fbec468ac7187bab9e7f62846';

export type WeatherData = {
    weatherMain: string;
    weatherDescription: string;
    mainTemp: string;
    windSpeed: string;
}

async function getWeatherData(city: string | undefined): Promise<WeatherData> {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
    const data = await (await fetch(endpoint)).json();

    const weatherMain: string = data.weather[0].main;
    const weatherDescription: string = data.weather[0].description;
    const mainTemp: string = data.main.temp;
    const windSpeed: string = data.wind.speed;

    const result: WeatherData = {
        weatherMain,
        weatherDescription,
        mainTemp,
        windSpeed
    };

    return result;
}

export const api = {
    getWeatherData,
};