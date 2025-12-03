const API_KEY = "4deabfaaccb654939946f7dfde24d852"

// 查詢城市天氣
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`
  const res = await fetch(url)
  if (!res.ok) throw new Error("查無此城市或服務錯誤")
  return await res.json()
}

// 查詢 3 小時預報
async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`
  const res = await fetch(url)
  if (!res.ok) throw new Error("預報資料取得失敗")
  return await res.json()
}
