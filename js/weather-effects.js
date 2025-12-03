const effects = document.getElementById("weather-effects");

export function clearEffects() {
  effects.innerHTML = "";
}

/* --- 雨 --- */
export function createRain() {
  clearEffects();
  for (let i = 0; i < 80; i++) {
    const drop = document.createElement("div");
    drop.className = "rain-drop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDelay = Math.random() + "s";
    effects.appendChild(drop);
  }
}

/* --- 雪 --- */
export function createSnow() {
  clearEffects();
  for (let i = 0; i < 50; i++) {
    const flake = document.createElement("div");
    flake.className = "snow-flake";
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDelay = Math.random() * 3 + "s";
    effects.appendChild(flake);
  }
}

/* --- 閃電 --- */
export function createThunder() {
  clearEffects();
  const flash = document.createElement("div");
  flash.className = "thunder-flash";
  effects.appendChild(flash);
  setTimeout(clearEffects, 400);
}
