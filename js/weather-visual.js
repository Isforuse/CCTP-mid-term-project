const visualContainer = document.getElementById("weather-visual")

// 清空圖示
function clearVisual() {
  visualContainer.innerHTML = ""
}

// ☀ 晴天（柔光 + 呼吸動畫 + 緩慢旋轉）
function showSunny() {
  clearVisual()

  visualContainer.innerHTML = `
    <svg width="180" height="180" viewBox="0 0 200 200" class="sunny-svg">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFD93D" />
          <stop offset="100%" stop-color="#FFB302" stop-opacity="0.8" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="40" fill="url(#sunGlow)">
        <animate attributeName="r" values="38;42;38" dur="4s" repeatCount="indefinite"/>
      </circle>

      <g class="sun-rays">
        ${Array.from({length: 12}).map((_, i) => `
          <rect x="98" y="15" width="4" height="25" fill="#FFD93D"
            transform="rotate(${i * 30} 100 100)">
            <animate attributeName="height" values="25;32;25" dur="3s" repeatCount="indefinite" />
          </rect>
        `).join("")}
      </g>
    </svg>
  `
}

// ☁ 多雲（柔霧效果 + 緩慢移動）
function showCloudy() {
  clearVisual()

  visualContainer.innerHTML = `
    <svg width="240" height="150" viewBox="0 0 240 150" class="cloudy-svg">
      <g class="cloud-group" fill="#ffffffcc">
        <ellipse cx="80" cy="75" rx="45" ry="30"/>
        <ellipse cx="120" cy="70" rx="55" ry="35"/>
        <ellipse cx="160" cy="75" rx="45" ry="30"/>
      </g>
    </svg>
  `
}

// 🌧 下雨（雲＋條狀雨滴）
function showRain() {
  clearVisual()

  let drops = ""
  for (let i = 0; i < 20; i++) {
    drops += `
      <line x1="${50 + Math.random() * 140}" y1="100"
            x2="${50 + Math.random() * 140}" y2="130"
            stroke="#7BB0FF" stroke-width="3">
        <animate attributeName="y1" values="100;140" dur="0.8s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="130;170" dur="0.8s" repeatCount="indefinite"/>
      </line>
    `
  }

  visualContainer.innerHTML = `
    <svg width="240" height="180" viewBox="0 0 240 180">
      <g fill="#ffffffcc">
        <ellipse cx="90" cy="70" rx="50" ry="30"/>
        <ellipse cx="140" cy="65" rx="60" ry="35"/>
      </g>
      ${drops}
    </svg>
  `
}

// ❄ 下雪（六角雪花 + 緩落旋轉）
function showSnow() {
  clearVisual()

  let flakes = ""
  for (let i = 0; i < 12; i++) {
    flakes += `
      <text x="${30 + Math.random()*180}" y="${50 + Math.random()*60}"
        font-size="24" opacity="0.8">❄
        <animate attributeName="y" values="${50 + Math.random()*60};180"
          dur="${2 + Math.random()*2}s" repeatCount="indefinite"/>
      </text>
    `
  }

  visualContainer.innerHTML = `
    <svg width="240" height="200" viewBox="0 0 240 200">
      <g fill="#ffffffdd">
        <ellipse cx="110" cy="70" rx="55" ry="33"/>
        <ellipse cx="150" cy="65" rx="45" ry="28"/>
      </g>
      ${flakes}
    </svg>
  `
}

// ⚡ 雷雨（黑雲 + 閃爍閃電）
function showThunder() {
  clearVisual()

  visualContainer.innerHTML = `
    <svg width="240" height="200" viewBox="0 0 240 200">
      <g fill="#444444dd">
        <ellipse cx="90" cy="70" rx="55" ry="33"/>
        <ellipse cx="140" cy="65" rx="65" ry="38"/>
      </g>

      <polygon points="120,90 135,110 125,110 150,150 130,150 140,175 110,135 120,135"
        fill="#FFD93D">
        <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/>
      </polygon>
    </svg>
  `
}


// =========================================
// 主控：根據 iconCode 顯示正確 SVG
// =========================================

function showWeatherVisual(iconCode) {
  if (iconCode.startsWith("01")) return showSunny()
  if (["02", "03", "04"].some(v => iconCode.startsWith(v))) return showCloudy()
  if (["09", "10"].some(v => iconCode.startsWith(v))) return showRain()
  if (iconCode.startsWith("11")) return showThunder()
  if (iconCode.startsWith("13")) return showSnow()

  return showCloudy()
}
