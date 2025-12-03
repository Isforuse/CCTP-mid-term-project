const API_KEY = "4deabfaaccb654939946f7dfde24d852";

export async function fetchAirQuality(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("空氣品質資料取得失敗");

  const data = await res.json();
  return data.list[0];
}

export function getAQILevel(aqi) {
  const mapping = {
    1: "良好",
    2: "普通",
    3: "對敏感族群不健康",
    4: "不健康",
    5: "非常不健康"
  };
  return mapping[aqi] || "未知";
}

export function getAQIColor(aqi) {
  return ["#3CB371","#FFD700","#FFA500","#FF4500","#8B0000"][aqi - 1];
}
