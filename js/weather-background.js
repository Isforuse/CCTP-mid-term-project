import { clearEffects, createRain, createSnow, createThunder } from "./weather-effects.js";

export function applyWeatherBackground(iconCode) {
  const body = document.body;
  clearEffects();

  if (iconCode.includes("d")) {
    if (iconCode.startsWith("01")) body.className = "sunny";
    else if (["02", "03", "04"].some(v => iconCode.startsWith(v))) body.className = "cloudy";
    else if (iconCode.startsWith("09") || iconCode.startsWith("10")) {
      body.className = "rain";
      createRain();
    }
    else if (iconCode.startsWith("11")) {
      body.className = "thunder";
      createThunder();
    }
    else if (iconCode.startsWith("13")) {
      body.className = "snow";
      createSnow();
    }
  } else {
    body.className = "night";
  }
}
