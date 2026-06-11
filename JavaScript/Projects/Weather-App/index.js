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
const requestTimeoutMs = 6000;
const searchCache = new Map();

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

const getCondition = (code) => weatherCodes[code] ?? ["Forecast available", "WX"];

function getMetCondition(symbolCode = "") {
    const code = symbolCode.toLowerCase();

    if (code.includes("thunder")) return ["Thunderstorm", "STM"];
    if (code.includes("sleet")) return ["Sleet", "ICE"];
    if (code.includes("snow")) return ["Snow", "SNW"];
    if (code.includes("rain")) return ["Rain", "RAN"];
    if (code.includes("fog")) return ["Fog", "FOG"];
    if (code.includes("cloudy")) return ["Cloudy", "CLD"];
    if (code.includes("partlycloudy")) return ["Partly cloudy", "MIX"];
    if (code.includes("fair")) return ["Mainly clear", "SUN"];
    if (code.includes("clearsky")) return ["Clear sky", "SUN"];

    return ["Forecast available", "WX"];
}

function getMetSymbol(period) {
    return (
        period.data.next_1_hours?.summary?.symbol_code ||
        period.data.next_6_hours?.summary?.symbol_code ||
        period.data.next_12_hours?.summary?.symbol_code ||
        ""
    );
}

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
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);

    try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
            throw new Error(errorMessage);
        }

        return response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("The weather service is taking too long. Please try again.");
        }

        if (error instanceof TypeError) {
            throw new Error("Unable to reach the weather service. Check your connection and try again.");
        }

        throw error;
    } finally {
        window.clearTimeout(timeout);
    }
}

async function findLocation(query) {
    const cacheKey = query.toLowerCase();

    if (searchCache.has(cacheKey)) {
        return searchCache.get(cacheKey);
    }

    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.search = new URLSearchParams({
        name: query,
        count: "1",
        language: "en",
        format: "json",
    });

    const data = await fetchJson(url, "Unable to search for that location.");
    const matches = data.results ?? [];

    if (matches.length === 0) {
        throw new Error("No matching location found. Try a nearby city or a more specific name.");
    }

    searchCache.set(cacheKey, matches[0]);
    return matches[0];
}

async function fetchWeather(location) {
    try {
        const url = new URL("https://api.met.no/weatherapi/locationforecast/2.0/compact");
        url.search = new URLSearchParams({
            lat: Number(location.latitude).toFixed(4),
            lon: Number(location.longitude).toFixed(4),
        });

        return {
            provider: "met",
            data: await fetchJson(url, "Unable to load the forecast right now."),
        };
    } catch (error) {
        const fallbackUrl = new URL("https://api.open-meteo.com/v1/forecast");
        fallbackUrl.search = new URLSearchParams({
            latitude: location.latitude,
            longitude: location.longitude,
            current:
                "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
            hourly: "temperature_2m,weather_code",
            daily: "weather_code,temperature_2m_max,temperature_2m_min",
            timezone: location.timezone || "auto",
            forecast_days: "7",
            forecast_hours: "12",
        });

        return {
            provider: "openMeteo",
            data: await fetchJson(fallbackUrl, error.message),
        };
    }
}

function processWeatherData(location, weatherResult) {
    if (weatherResult.provider === "openMeteo") {
        return processOpenMeteoData(location, weatherResult.data);
    }

    return processMetData(location, weatherResult.data);
}

function processMetData(location, weather) {
    const country = location.country_code ? `, ${location.country_code}` : "";
    const admin = location.admin1 ? `, ${location.admin1}` : "";
    const placeName = `${location.name}${admin}${country}`;
    const timezone = location.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const periods = weather.properties.timeseries ?? [];
    const currentPeriod = periods[0];

    if (!currentPeriod) {
        throw new Error("No forecast data is available for that location.");
    }

    const currentDetails = currentPeriod.data.instant.details;
    const hourly = periods.slice(0, 12).map((period) => ({
        time: period.time,
        temperature: period.data.instant.details.air_temperature,
        condition: getMetCondition(getMetSymbol(period)),
    }));
    const daily = buildDailyForecast(periods, timezone);

    return {
        placeName,
        timezone,
        updatedAt: weather.properties.meta.updated_at,
        current: {
            temperature: currentDetails.air_temperature,
            humidity: currentDetails.relative_humidity,
            wind: currentDetails.wind_speed * 3.6,
            pressure: currentDetails.air_pressure_at_sea_level,
            cloudCover: currentDetails.cloud_area_fraction,
            condition: getMetCondition(getMetSymbol(currentPeriod)),
        },
        hourly,
        daily,
    };
}

function processOpenMeteoData(location, weather) {
    const country = location.country_code ? `, ${location.country_code}` : "";
    const admin = location.admin1 ? `, ${location.admin1}` : "";
    const placeName = `${location.name}${admin}${country}`;
    const timezone = weather.timezone || location.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        placeName,
        timezone,
        updatedAt: weather.current.time,
        current: {
            temperature: weather.current.temperature_2m,
            humidity: weather.current.relative_humidity_2m,
            wind: weather.current.wind_speed_10m,
            pressure: null,
            cloudCover: null,
            condition: getCondition(weather.current.weather_code),
        },
        hourly: weather.hourly.time.map((time, index) => ({
            time,
            temperature: weather.hourly.temperature_2m[index],
            condition: getCondition(weather.hourly.weather_code[index]),
        })),
        daily: weather.daily.time.map((time, index) => ({
            time: `${time}T12:00:00`,
            high: weather.daily.temperature_2m_max[index],
            low: weather.daily.temperature_2m_min[index],
            condition: getCondition(weather.daily.weather_code[index]),
        })),
    };
}

function buildDailyForecast(periods, timezone) {
    const days = new Map();

    periods.forEach((period) => {
        const key = formatDateKey(period.time, timezone);
        const details = period.data.instant.details;
        const existing = days.get(key) ?? {
            time: period.time,
            high: details.air_temperature,
            low: details.air_temperature,
            condition: getMetCondition(getMetSymbol(period)),
        };

        existing.high = Math.max(existing.high, details.air_temperature);
        existing.low = Math.min(existing.low, details.air_temperature);

        if (period.time.includes("12:00:00")) {
            existing.condition = getMetCondition(getMetSymbol(period));
        }

        days.set(key, existing);
    });

    return [...days.values()].slice(0, 7);
}

function formatDateKey(time, timezone) {
    const parts = new Intl.DateTimeFormat("en", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date(time));

    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
}

function formatTime(time, timezone) {
    return new Intl.DateTimeFormat([], {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(time));
}

function formatDay(time, timezone) {
    return new Intl.DateTimeFormat([], {
        timeZone: timezone,
        weekday: "long",
        month: "short",
        day: "numeric",
    }).format(new Date(time));
}

function renderMetrics(current) {
    const metrics = [
        ["Humidity", formatPercent(current.humidity)],
        ["Wind", formatSpeed(current.wind)],
        current.cloudCover === null ? null : ["Cloud cover", formatPercent(current.cloudCover)],
        current.pressure === null ? null : ["Pressure", `${Math.round(current.pressure)} hPa`],
    ].filter(Boolean);

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

function renderHourly(hours, timezone) {
    hourlyListEl.replaceChildren(
        ...hours.map((hour) => {
            const item = document.createElement("li");
            item.className = "hour-card";
            item.innerHTML = `
        <time datetime="${hour.time}">${formatTime(hour.time, timezone)}</time>
        <span aria-hidden="true">${hour.condition[1]}</span>
        <strong>${formatTemp(hour.temperature)}</strong>
        <small>${hour.condition[0]}</small>
      `;
            return item;
        }),
    );
}

function renderDaily(days, timezone) {
    dailyListEl.replaceChildren(
        ...days.map((day) => {
            const item = document.createElement("li");
            item.className = "day-card";
            item.innerHTML = `
        <time datetime="${day.time}">${formatDay(day.time, timezone)}</time>
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
    updatedAtEl.textContent = `Updated ${formatTime(forecast.updatedAt, forecast.timezone)}`;
    conditionEl.textContent = conditionLabel;
    weatherIconEl.textContent = conditionIcon;
    temperatureEl.textContent = formatTemp(forecast.current.temperature);
    timezoneEl.textContent = forecast.timezone;

    renderMetrics(forecast.current);
    renderHourly(forecast.hourly, forecast.timezone);
    renderDaily(forecast.daily, forecast.timezone);

    weatherView.hidden = false;
}

async function handleSearch(event) {
    event?.preventDefault();
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
