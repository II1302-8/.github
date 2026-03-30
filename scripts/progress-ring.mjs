// Generate a progress ring SVG for the daily summary embed
// Usage: node progress-ring.mjs [percent] [output-path]
// Example: node progress-ring.mjs 60 ring.svg

const percent = parseInt(process.argv[2] || '60', 10);
const output = process.argv[3] || 'ring.svg';

const size = 200;
const stroke = 16;
const radius = (size - stroke) / 2;
const center = size / 2;
const circumference = 2 * Math.PI * radius;
const offset = circumference - (percent / 100) * circumference;

// Colors
const bg = '#2b2d31';       // Discord dark background
const track = '#3a3c42';    // Empty track
const fill = '#5865f2';     // Discord blurple for the progress
const text = '#ffffff';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <circle
    cx="${center}" cy="${center}" r="${radius}"
    fill="none" stroke="${track}" stroke-width="${stroke}"
  />
  <circle
    cx="${center}" cy="${center}" r="${radius}"
    fill="none" stroke="${fill}" stroke-width="${stroke}"
    stroke-linecap="round"
    stroke-dasharray="${circumference}"
    stroke-dashoffset="${offset}"
    transform="rotate(-90 ${center} ${center})"
  />
  <text
    x="${center}" y="${center}"
    text-anchor="middle" dy="0.35em"
    fill="${text}" font-family="sans-serif" font-size="42" font-weight="bold"
  >${percent}%</text>
</svg>`;

const fs = await import('fs');
fs.writeFileSync(output, svg);
console.log(`Generated ${output} (${percent}%)`);
