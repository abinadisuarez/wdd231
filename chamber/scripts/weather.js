// ---------- Current weather (matches weather.html pattern) ----------
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Valera, Trujillo, Venezuela
const lat = 9.3178;
const lon = -70.6036;
const units = 'imperial';
const appid = '3ddbf1a75326af51c6af3e1b07a70d24';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

// ---------- 3-day forecast ----------
const forecastEl = document.querySelector('#forecast');
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;

async function apiFetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetchForecast();

function displayForecast(data) {
    // 40 entries at 3-hour intervals → keep the noon entry per day
    const noonEntries = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));
    // Skip today's noon, take the next 3 days
    const nextThree = noonEntries.slice(1, 4);

    forecastEl.innerHTML = nextThree.map(entry => {
        const date = new Date(entry.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const icon = `https://openweathermap.org/img/w/${entry.weather[0].icon}.png`;
        const temp = Math.round(entry.main.temp);
        const desc = entry.weather[0].description;

        return `
            <div class="forecast-card">
                <p class="forecast-day">${dayName}</p>
                <img src="${icon}" alt="${desc}">
                <p class="forecast-temp">${temp}&deg;F</p>
                <p class="forecast-desc">${desc}</p>
            </div>
        `;
    }).join('');
}