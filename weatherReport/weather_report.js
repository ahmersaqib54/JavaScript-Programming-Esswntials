/* Weather app with dark-mode toggle, transitions, loader, icons, 5-day forecast.
   Replace apiKey if needed.
*/
const apiKey = "f6235a3277149b771e3df249b3469b3e"; // keep or replace

// Elements
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weatherInfo");
const forecastEl = document.getElementById("forecast");
const loader = document.getElementById("loader");
const forecastTitle = document.getElementById("forecastTitle");
const themeToggle = document.getElementById("themeToggle");

// Dark mode persisted in localStorage
const root = document.documentElement;
function setTheme(theme){
  if(theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
  localStorage.setItem("weather_theme", theme);
}
const savedTheme = localStorage.getItem("weather_theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
setTheme(savedTheme);
themeToggle.addEventListener("click", () => setTheme(localStorage.getItem("weather_theme") === "dark" ? "light" : "dark"));

// helpers
function getIconUrl(iconId){ return `https://openweathermap.org/img/wn/${iconId}@2x.png`; }
function showLoader(){ loader.classList.remove("hidden"); weatherInfo.classList.add("hidden"); forecastEl.classList.add("hidden"); forecastTitle.classList.add("hidden"); }
function hideLoader(){ loader.classList.add("hidden"); }

// background change based on temp
function changeBackground(temp){
  const body = document.body;
  if(temp <= 10) body.style.background = "linear-gradient(180deg,#0f1724,#071023)";
  else if(temp <= 25) body.style.background = "linear-gradient(180deg,#e6f0ff,#dfefff)";
  else body.style.background = "linear-gradient(180deg,#ff9a76,#ff6b6b)";
}

// main action
async function fetchWeather(city){
  try {
    showLoader();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const resp = await fetch(url);
    const data = await resp.json();
    if(!resp.ok) throw new Error(data.message || "Failed to fetch weather");

    // show main weather
    changeBackground(data.main.temp);
    weatherInfo.innerHTML = `
      <img src="${getIconUrl(data.weather[0].icon)}" alt="${data.weather[0].description}" />
      <div class="meta">
        <h2>${data.name}, ${data.sys?.country ?? ""}</h2>
        <p><strong>${Math.round(data.main.temp)}°C</strong> — ${data.weather[0].description}</p>
        <p>Feels like ${Math.round(data.main.feels_like)}°C • Humidity ${data.main.humidity}%</p>
      </div>
    `;
    weatherInfo.classList.remove("hidden");
    // animate in
    requestAnimationFrame(()=> weatherInfo.classList.add("show"));

    // fetch 5-day forecast
    const furl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const fresp = await fetch(furl);
    const fdata = await fresp.json();
    if(!fresp.ok) throw new Error(fdata.message || "Failed to fetch forecast");

    // forecast returns 3-hour steps; pick roughly one per day at midday
    // build map of date -> closest to 12:00
    const byDate = {};
    fdata.list.forEach(item => {
      const d = new Date(item.dt * 1000);
      const dayKey = d.toISOString().split("T")[0];
      const hour = d.getUTCHours();
      const score = Math.abs(hour - 12);
      if(!byDate[dayKey] || score < byDate[dayKey].score){
        byDate[dayKey] = { item, score };
      }
    });

    const entries = Object.values(byDate).slice(0,5);
    let html = "";
    entries.forEach(({ item }) => {
      const d = new Date(item.dt * 1000);
      const dateLabel = d.toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric" });
      html += `
        <div class="forecast-card" role="listitem">
          <h4>${dateLabel}</h4>
          <img src="${getIconUrl(item.weather[0].icon)}" alt="${item.weather[0].description}" />
          <p><strong>${Math.round(item.main.temp)}°C</strong></p>
          <small>${item.weather[0].description}</small>
        </div>
      `;
    });
    forecastEl.innerHTML = html;
    forecastTitle.classList.remove("hidden");
    forecastEl.classList.remove("hidden");

    // animate in
    requestAnimationFrame(()=>{
      forecastTitle.classList.add("show");
      forecastEl.classList.add("show");
    });

    hideLoader();
  } catch(err){
    hideLoader();
    weatherInfo.innerHTML = `<p style="color:tomato">Error: ${err.message}</p>`;
    weatherInfo.classList.remove("hidden");
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if(!city) return;
  fetchWeather(city);
});
