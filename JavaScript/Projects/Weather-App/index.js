const form = document.querySelector("#search-form");
const locationInput = document.querySelector("#location-input");
const statusEl = document.querySelector("#status");
const weatherView = document.querySelector("#weather-view");
const updatedAtEl = document.querySelector("#updated-at");
const currentHeadingEl = document.querySelector("#current-heading");
const conditionEl = document.querySelector("#condition");
const weatherIconEl = document.querySelector("#weather-icon");
const temperatureEl = document.querySelector("#temperature");
const metricsEl = document.querySelector("#metrics");
const hourlyListEl = document.querySelector("#hourly-list");
const dailyListEl = document.querySelector("#daily-list");
const timezoneEl = document.querySelector("#timezone");

const weatherCodes = {
    0: ["Clear sky", "SUN"],
    1: ["Mainly clear", "SUN"],
    2: ["Partly cloudy", "MIX"],
    3: ["Overcast", "CLD"],
    45: ["Fog", "FOG"],
    48: ["Depositing rime fog", "FOG"],
    51: ["Light drizzle", "DRZ"],
    53: ["Moderate drizzle", "DRZ"],
    55: ["Dense drizzle", "DRZ"],
    56: ["Light freezing drizzle", "ICE"],
    57: ["Dense freezing drizzle", "ICE"],
    61: ["Slight rain", "RAN"],
    63: ["Moderate rain", "RAN"],
    65: ["Heavy rain", "RAN"],
    66: ["Light freezing rain", "ICE"],
    67: ["Heavy freezing rain", "ICE"],
    71: ["Slight snow", "SNW"],
    73: ["Moderate snow", "SNW"],
    75: ["Heavy snow", "SNW"],
    77: ["Snow grains", "SNW"],
    80: ["Slight rain showers", "SHW"],
    81: ["Moderate rain showers", "SHW"],
    82: ["Violent rain showers", "STM"],
    85: ["Slight snow showers", "SNW"],
    86: ["Heavy snow showers", "SNW"],
    95: ["Thunderstorm", "STM"],
    96: ["Thunderstorm with hail", "STM"],
    99: ["Thunderstorm with heavy hail", "STM"],
};

const formatTemp = (value) => `${Math.round(value)} deg`;
const formatPercent = (value) => `${Math.round(value)}%`;
const formatSpeed = (value) => `${Math.round(value)} km/h`;

const getCondition = (code) => weatherCodes[code] ?? ["Unknown conditions", "N/A"];

function setStatus(message = "", type = "info") {
    statusEl.textContent = message;
    statusEl.classList.toggle("status--error", type === "error");
}

function setLoading(isLoading) {
    const button = form.querySelector("button");
    button.disabled = isLoading;
    button.textContent = isLoading ? "Searching" : "Search";
    locationInput.disabled = isLoading;
}

async function fetchJson(url, errorMessage) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return response.json();
}

async function findLocation(query) {
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.search = new URLSearchParams({
        name: query,
        count: "5",
        language: "en",
        format: "json",
    });

    const data = await fetchJson(url, "Unable to search for that location.");
    const matches = data.results ?? [];

    if (matches.length === 0) {
        throw new Error("No matching location found. Try a nearby city or a more specific name.");
    }

    return matches.sort((a, b) => (b.population ?? 0) - (a.population ?? 0))[0];
}

async function fetchWeather(location) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.search = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
        hourly: "temperature_2m,weather_code,precipitation_probability",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        timezone: "auto",
        forecast_days: "7",
    });

    return fetchJson(url, "Unable to load the forecast right now.");
}

function processWeatherData(location, weather) {
    const country = location.country_code ? `, ${location.country_code}` : "";
    const admin = location.admin1 ? `, ${location.admin1}` : "";
    const placeName = `${location.name}${admin}${country}`;
    const currentHourIndex = weather.hourly.time.findIndex((hour) => hour >= weather.current.time);
    const start = Math.max(currentHourIndex, 0);
    const end = start + 12;

    return {
        placeName,
        timezone: weather.timezone_abbreviation || weather.timezone,
        updatedAt: weather.current.time,
        current: {
            temperature: weather.current.temperature_2m,
            apparent: weather.current.apparent_temperature,
            humidity: weather.current.relative_humidity_2m,
            wind: weather.current.wind_speed_10m,
            condition: getCondition(weather.current.weather_code),
            isDay: weather.current.is_day,
        },
        hourly: weather.hourly.time.slice(start, end).map((time, index) => {
            const sourceIndex = start + index;
            return {
                time,
                temperature: weather.hourly.temperature_2m[sourceIndex],
                condition: getCondition(weather.hourly.weather_code[sourceIndex]),
                precipitation: weather.hourly.precipitation_probability[sourceIndex],
            };
        }),
        daily: weather.daily.time.map((time, index) => ({
            time,
            high: weather.daily.temperature_2m_max[index],
            low: weather.daily.temperature_2m_min[index],
            condition: getCondition(weather.daily.weather_code[index]),
            precipitation: weather.daily.precipitation_probability_max[index],
        })),
    };
}

function formatTime(time) {
    const [, hour = "00", minute = "00"] = time.match(/T(\d{2}):(\d{2})/) ?? [];
    const hourNumber = Number(hour);
    const period = hourNumber >= 12 ? "PM" : "AM";
    const displayHour = hourNumber % 12 || 12;
    return `${displayHour}:${minute} ${period}`;
}

function formatDay(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day, 12);
    return new Intl.DateTimeFormat([], {
        weekday: "long",
        month: "short",
        day: "numeric",
    }).format(date);
}

function renderMetrics(current) {
    const metrics = [
        ["Feels like", formatTemp(current.apparent)],
        ["Humidity", formatPercent(current.humidity)],
        ["Wind", formatSpeed(current.wind)],
        ["Daylight", current.isDay ? "Day" : "Night"],
    ];

    metricsEl.replaceChildren(
        ...metrics.map(([label, value]) => {
            const wrapper = document.createElement("div");
            const term = document.createElement("dt");
            const detail = document.createElement("dd");
            term.textContent = label;
            detail.textContent = value;
            wrapper.append(term, detail);
            return wrapper;
        }),
    );
}

function renderHourly(hours) {
    hourlyListEl.replaceChildren(
        ...hours.map((hour) => {
            const item = document.createElement("li");
            item.className = "hour-card";
            item.innerHTML = `
        <time datetime="${hour.time}">${formatTime(hour.time)}</time>
        <span aria-hidden="true">${hour.condition[1]}</span>
        <strong>${formatTemp(hour.temperature)}</strong>
        <small>${formatPercent(hour.precipitation)} rain</small>
      `;
            return item;
        }),
    );
}

function renderDaily(days) {
    dailyListEl.replaceChildren(
        ...days.map((day) => {
            const item = document.createElement("li");
            item.className = "day-card";
            item.innerHTML = `
        <time datetime="${day.time}">${formatDay(day.time)}</time>
        <span class="day-card__condition">${day.condition[1]} ${day.condition[0]}</span>
        <span class="day-card__temps">
          <span>${formatTemp(day.high)}</span>
          <span class="low-temp">${formatTemp(day.low)}</span>
        </span>
      `;
            return item;
        }),
    );
}

function renderWeather(forecast) {
    const [conditionLabel, conditionIcon] = forecast.current.condition;

    currentHeadingEl.textContent = forecast.placeName;
    updatedAtEl.textContent = `Updated ${formatTime(forecast.updatedAt)}`;
    conditionEl.textContent = conditionLabel;
    weatherIconEl.textContent = conditionIcon;
    temperatureEl.textContent = formatTemp(forecast.current.temperature);
    timezoneEl.textContent = forecast.timezone;

    renderMetrics(forecast.current);
    renderHourly(forecast.hourly);
    renderDaily(forecast.daily);

    weatherView.hidden = false;
}

async function handleSearch(event) {
    event.preventDefault();
    const query = locationInput.value.trim();

    if (query.length < 2) {
        setStatus("Enter at least two characters to search.", "error");
        return;
    }

    try {
        setLoading(true);
        setStatus("Loading forecast...");
        const location = await findLocation(query);
        const weather = await fetchWeather(location);
        const forecast = processWeatherData(location, weather);
        renderWeather(forecast);
        setStatus("");
    } catch (error) {
        weatherView.hidden = true;
        setStatus(error.message || "Something went wrong. Please try again.", "error");
    } finally {
        setLoading(false);
    }
}

form.addEventListener("submit", handleSearch);

locationInput.value = "Nairobi";
form.requestSubmit();
