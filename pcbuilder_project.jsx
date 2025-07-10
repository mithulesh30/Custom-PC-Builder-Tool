// Project Structure:
// pc-builder/
// ├─ public/
// ├─ src/
// │  ├─ components/
// │  │  └─ PCBuilder.jsx
// │  ├─ App.jsx
// │  └─ main.jsx
// ├─ index.html
// ├─ package.json
// ├─ vite.config.js
// └─ tailwind.config.js

// === src/components/PCBuilder.jsx ===
import React, { useState } from "react";

const componentData = {
  cpu: [
    { name: "Intel Core i3-4130", price: 3000 },
    { name: "AMD Ryzen 3 5300G", price: 9000 },
    { name: "Intel Core i5-8400", price: 10000 },
    { name: "AMD Ryzen 5 5600X", price: 17000 },
    { name: "Intel Core i7-8700", price: 17000 },
    { name: "AMD Ryzen 5 7600X", price: 20000 },
    { name: "Intel Core i5-13600K", price: 24000 },
    { name: "AMD Ryzen 7 7700X", price: 32000 },
    { name: "Intel Core i7-13700K", price: 36000 },
    { name: "Intel Core i9-13900K", price: 48000 },
  ],
  gpu: [
    { name: "NVIDIA GEFORCE GTX 1650(4GB)", price: 14000 },
    { name: "NVIDIA GEFORCE GTX 1650 SUPER(4GB)", price: 16000 },
    { name: "NVIDIA GEFORCE GTX 1660TI(6GB)", price: 22000 },
    { name: "NVIDIA GEFORCE RTX 3050(8GB)", price: 25000 },
    { name: "AMD RADEON RX 6600(8GB)", price: 28000 },
    { name: "AMD Radeon RX 6650XT(8GB)", price: 35000 },
    { name: "NVIDIA RTX 3060(12GB)", price: 43000 },
    { name: "AMD Radeon RX 6700 XT(12GB)", price: 50000 },
    { name: "NVIDIA RTX 3060TI(8GB)", price: 55000 },
    { name: "NVIDIA RTX 4060Ti(8GB)", price: 59000 },
  ],
  motherboard: [
    { name: "ASUS H81M-E", price: 4000 },
    { name: "ASUS A320M-K", price: 6000 },
    { name: "MSI B360M MORTAR", price: 8000 },
    { name: "ASUS TUF B450M-PLUS", price: 10000 },
    { name: "MSI Z370-A PRO", price: 12500 },
    { name: "ASUS ROG STRIX B550-F", price: 14000 },
    { name: "ASUS TUF GAMING Z690-PLUS", price: 23000 },
    { name: "MSI MPG B650 EDGE WIFI", price: 25000 },
    { name: "ASUS Z690-A PRO", price: 27000 },
    { name: "ASUS ROG STRIX Z790-E", price: 40000 },
  ],
  ram: [
    { name: "Corsair Vengeance", price: 2000 },
    { name: "G.Skill Ripjaws V", price: 4000 },
    { name: "Kingston Fury Beast", price: 6500 },
    { name: "Crucial Ballistix", price: 10000 },
    { name: "TeamGroup T-Force", price: 14000 },
  ],
  cooler: [
    { name: "Cooler Master Hyper 212", price: 2500 },
    { name: "Noctua NH-D15", price: 7000 },
    { name: "Deepcool GAMMAXX 400", price: 1800 },
    { name: "be quiet! Pure Rock 2", price: 3500 },
    { name: "ARCTIC Freezer 34", price: 2900 },
  ],
  hdd: [
    { name: "Samsung 870 EVO 512GB", price: 3500 },
    { name: "Crucial MX500 1TB", price: 4500 },
    { name: "Seagate Barracuda 2TB", price: 5800 },
    { name: "Western Digital Blue 4TB", price: 9500 },
    { name: "Seagate IronWolf 6TB", price: 15000 },
  ],
  ssd: [
    { name: "Kingston A400 256GB", price: 2500 },
    { name: "Samsung 870 EVO 500GB", price: 4000 },
    { name: "Crucial MX500 1TB", price: 7500 },
    { name: "Western Digital Blue SN570 2TB", price: 13500 },
    { name: "Samsung 980 Pro 4TB", price: 25000 },
  ],
  psu: [
    { name: "CORSAIR CV450", price: 3000 },
    { name: "COOLER MASTER MWE BRONZE", price: 4000 },
    { name: "ANTEC VP650P", price: 6000 },
    { name: "CORSAIR RM750X", price: 8000 },
    { name: "SEASONIC FOCUS GX-850", price: 10000 },
  ],
  cabinet: [
    { name: "Cooler Master MasterBox Q300L", price: 4000 },
    { name: "Thermaltake V200", price: 5000 },
    { name: "NZXT H510", price: 6000 },
    { name: "Corsair 4000D Airflow", price: 7000 },
    { name: "Fractal Design Meshify C", price: 8000 },
  ],
};

export default function PCBuilder() {
  const [selected, setSelected] = useState({});

  const handleSelect = (type, item) => {
    setSelected({ ...selected, [type]: item });
  };

  const total = Object.values(selected).reduce((sum, item) => sum + (item?.price || 0), 0);

  const handleDownload = () => {
    const content = Object.entries(selected)
      .map(([key, value]) => `${key.toUpperCase()}: ${value.name}`)
      .join("\n") + `\nTotal Price: Rs.${total}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pc_build.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>PC Builder</h1>
      {Object.entries(componentData).map(([type, items]) => (
        <div key={type} style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{type}</h2>
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => handleSelect(type, item)}
              style={{
                margin: '0.25rem',
                padding: '0.5rem',
                backgroundColor: selected[type]?.name === item.name ? '#22c55e' : '#333',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {item.name} (Rs.{item.price})
            </button>
          ))}
        </div>
      ))}

      <div style={{ backgroundColor: '#222', padding: '1rem', borderRadius: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Build Summary</h2>
        {Object.entries(selected).map(([type, item]) => (
          <p key={type}>
            <strong>{type.toUpperCase()}:</strong> {item.name} (Rs.{item.price})
          </p>
        ))}
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Total Price: Rs.{total}</p>
        <button
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none' }}
          onClick={handleDownload}
        >
          Download Build Summary
        </button>
      </div>
    </div>
  );
}

// === src/App.jsx ===
import PCBuilder from "./components/PCBuilder";

function App() {
  return <PCBuilder />;
}

export default App;

// === src/main.jsx ===
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// === index.html ===
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PC Builder</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

// === vite.config.js ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
});

// === package.json (simplified) ===
{
  "name": "pc-builder",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "gh-pages": "^5.0.0"
  }
}
