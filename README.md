# FORMA 3D — Model Showcase

A cinematic dark-luxury 3D model viewer built with React + Three.js.

## Quick Start

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

## Features

- **Two render modes** — PBR (base_basic_pbr.glb) and Shaded (base_basic_shaded.glb)
- **6 HDRI environments** — Studio, Warehouse, Forest, Sunset, Dawn, Night
- **Wireframe toggle** — inspect mesh topology
- **HDRI background toggle** — show/hide environment as background
- **Auto-rotate** — cinematic slow spin with on/off toggle
- **Full orbit controls** — drag, scroll, right-click pan
- **Staggered reveal** — elegant load-in animation

## Build for Production

```bash
npm run build
# Output in /dist — deploy to Netlify, Vercel, or any static host
```

## Tech Stack

- React 18 + Vite
- @react-three/fiber + @react-three/drei
- Three.js r168
- CSS Modules
- Syne + Space Mono fonts
