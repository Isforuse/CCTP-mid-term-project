const effects = document.getElementById("weather-effects")

function clearEffects() {
  effects.innerHTML = ""
}

function createRain() {
  clearEffects()
  for (let i = 0; i < 60; i++) {
    const drop = document.createElement("div")
    drop.className = "rain-drop"
    drop.style.left = Math.random() * 100 + "vw"
    drop.style.animationDelay = Math.random() * 1 + "s"
    effects.appendChild(drop)
  }
}

function createSnow() {
  clearEffects()
  for (let i = 0; i < 40; i++) {
    const flake = document.createElement("div")
    flake.className = "snow-flake"
    flake.style.left = Math.random() * 100 + "vw"
    flake.style.animationDelay = Math.random() * 3 + "s"
    effects.appendChild(flake)
  }
}

function createThunder() {
  clearEffects()
  const flash = document.createElement("div")
  flash.className = "thunder-flash"
  effects.appendChild(flash)
  setTimeout(clearEffects, 350)
}
