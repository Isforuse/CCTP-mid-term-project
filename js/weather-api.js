const API_KEY = "4deabfaaccb654939946f7dfde24d852";

export async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("查無此城市或服務錯誤");
  return res.json();
}

export async function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("預報資料取得失敗");
  return res.json();
}
