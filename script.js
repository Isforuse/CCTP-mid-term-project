// const API_KEY = "4deabfaaccb654939946f7dfde24d852"

// const input = document.getElementById("city-input")
// const button = document.getElementById("search-btn")
// const message = document.getElementById("message")
// const result = document.getElementById("result")
// const cityNameEl = document.getElementById("city-name")
// const tempEl = document.getElementById("temp")
// const iconEl = document.getElementById("icon")
// const descEl = document.getElementById("description")
// const humidityEl = document.getElementById("humidity")

// const feelsEl = document.getElementById("feels")
// const minmaxEl = document.getElementById("minmax")
// const pressureEl = document.getElementById("pressure")
// const visibilityEl = document.getElementById("visibility")
// const windEl = document.getElementById("wind")
// const detailsCard = document.getElementById("details-card")

// const forecastContainer = document.getElementById("forecast-container")
// const forecastList = document.getElementById("forecast-list")
// const effects = document.getElementById("weather-effects")



// // ======================
// // 粒子動畫系統
// // ======================

// function clearEffects() {
//   effects.innerHTML = ""
// }

// function createRain() {
//   clearEffects()
//   for (let i = 0; i < 60; i++) {
//     const drop = document.createElement("div")
//     drop.className = "rain-drop"
//     drop.style.left = Math.random() * 100 + "vw"
//     drop.style.animationDelay = Math.random() * 1 + "s"
//     effects.appendChild(drop)
//   }
// }

// function createSnow() {
//   clearEffects()
//   for (let i = 0; i < 40; i++) {
//     const flake = document.createElement("div")
//     flake.className = "snow-flake"
//     flake.style.left = Math.random() * 100 + "vw"
//     flake.style.animationDelay = Math.random() * 3 + "s"
//     effects.appendChild(flake)
//   }
// }

// function createThunder() {
//   clearEffects()
//   const flash = document.createElement("div")
//   flash.className = "thunder-flash"
//   effects.appendChild(flash)
//   setTimeout(clearEffects, 350)
// }



// // ======================
// // 背景切換
// // ======================

// function applyWeatherBackground(iconCode) {
//   const body = document.body
//   clearEffects()

//   if (iconCode.includes("d")) { 
//     if (iconCode.startsWith("01")) body.className = "sunny"
//     else if (["02", "03", "04"].some(v => iconCode.startsWith(v))) body.className = "cloudy"
//     else if (iconCode.startsWith("09") || iconCode.startsWith("10")) {
//       body.className = "rain"
//       createRain()
//     }
//     else if (iconCode.startsWith("11")) {
//       body.className = "thunder"
//       createThunder()
//     }
//     else if (iconCode.startsWith("13")) {
//       body.className = "snow"
//       createSnow()
//     }
//     else body.className = "cloudy"
//   } 

//   else {
//     body.className = "night"
//   }
// }



// // ======================
// // API（無定位版）
// // ======================

// async function fetchWeather(city) {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`
//   const res = await fetch(url)
//   if (!res.ok) throw new Error("查無此城市或服務錯誤")
//   return await res.json()
// }

// async function fetchForecast(city) {
//   const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`
//   const res = await fetch(url)
//   if (!res.ok) throw new Error("預報資料取得失敗")
//   return await res.json()
// }



// // ======================
// // Loading UI
// // ======================

// function setLoading(isLoading) {
//   if (isLoading) {
//     button.disabled = true
//     button.textContent = "查詢中..."
//   } else {
//     button.disabled = false
//     button.textContent = "查詢天氣"
//   }
// }



// // ======================
// // 主查詢邏輯
// // ======================

// async function handleSearch() {
//   const city = input.value.trim()

//   message.textContent = ""
//   result.classList.add("hidden")
//   detailsCard.classList.add("hidden")
//   forecastContainer.classList.add("hidden")

//   if (!city) {
//     message.textContent = "請先輸入城市名稱"
//     return
//   }

//   setLoading(true)

//   try {
//     const data = await fetchWeather(city)

//     const name = `${data.name}, ${data.sys.country}`
//     const temp = Math.round(data.main.temp)
//     const desc = data.weather[0].description
//     const humidity = data.main.humidity
//     const iconCode = data.weather[0].icon

//     applyWeatherBackground(iconCode)

//     cityNameEl.textContent = name
//     tempEl.textContent = `${temp}°C`
//     descEl.textContent = desc
//     humidityEl.textContent = `濕度 ${humidity}%`
//     iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
//     iconEl.alt = desc

//     result.classList.remove("hidden")

//     feelsEl.textContent = `體感溫度：${Math.round(data.main.feels_like)}°C`
//     minmaxEl.textContent = `最高 / 最低：${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`
//     pressureEl.textContent = `氣壓：${data.main.pressure} hPa`
//     visibilityEl.textContent = `能見度：${data.visibility} m`
//     windEl.textContent = `風速：${data.wind.speed} m/s`

//     detailsCard.classList.remove("hidden")

//     const forecastData = await fetchForecast(city)
//     forecastList.innerHTML = ""

//     for (let i = 0; i < 4; i++) {
//       const item = forecastData.list[i]
//       const time = item.dt_txt.split(" ")[1].slice(0, 5)
//       const itemIcon = item.weather[0].icon
//       const tempF = Math.round(item.main.temp)

//       const div = document.createElement("div")
//       div.className = "forecast-item"
//       div.innerHTML = `
//         <div class="forecast-time">${time}</div>
//         <img src="https://openweathermap.org/img/wn/${itemIcon}@2x.png" width="42">
//         <div class="forecast-temp">${tempF}°C</div>
//         <div class="forecast-desc">${item.weather[0].description}</div>
//       `

//       forecastList.appendChild(div)
//     }

//     forecastContainer.classList.remove("hidden")

//   } catch (err) {
//     message.textContent = err.message || "查詢失敗，請稍後再試"

//   } finally {
//     setLoading(false)
//   }
// }



// // ======================
// // 事件綁定
// // ======================

// button.addEventListener("click", handleSearch)

// input.addEventListener("keydown", e => {
//   if (e.key === "Enter") handleSearch()
// })
