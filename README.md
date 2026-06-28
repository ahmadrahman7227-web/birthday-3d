# Magical Birthday 3D

Magical Birthday 3D is a responsive one-page interactive 3D birthday experience built with React, TypeScript, Vite, Three.js, and React Three Fiber.

This project was created as a personal digital birthday gift. Instead of a normal greeting card or landing page, it presents a small magical 3D world with an interactive gift box, birthday cake, floating balloons, wishes, confetti, music, and cinematic scene transitions.

## Preview

A magical one-page birthday experience where users can open a 3D gift, reveal birthday wishes, interact with the cake and candles, and enjoy a final celebration scene.

## Features

* One-page full-screen interactive 3D experience
* Responsive design for desktop, tablet, and mobile
* Procedural 3D birthday cake
* Interactive 3D gift box
* Floating animated balloons
* Stage-based experience flow
* Birthday wishes and surprise messages
* Confetti celebration effect
* Music play/pause button
* Smooth UI animations
* Mobile-friendly layout
* Built with clean React and TypeScript structure
* Ready to deploy on Vercel

## Tech Stack

* React
* TypeScript
* Vite
* Three.js
* React Three Fiber
* Drei
* Framer Motion
* Canvas Confetti
* Lucide React
* CSS

## Project Structure

```txt
src/
├── assets/
│   └── ucapan_ultah.mp3
├── components/
│   ├── scene/
│   ├── ui/
│   └── layout/
├── data/
│   └── birthdayContent.ts
├── hooks/
├── App.tsx
├── main.tsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/magical-birthday-3d.git
```

Go to the project folder:

```bash
cd magical-birthday-3d
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Customization

You can customize the birthday name, message, wishes, and text content from:

```txt
src/data/birthdayContent.ts
```

To change the birthday music, replace this file:

```txt
src/assets/ucapan_ultah.mp3
```

Make sure the new audio file keeps the same filename, or update the import path inside the audio hook.

## Deployment

This project can be deployed easily on Vercel.

Recommended settings:

```txt
Build Command: npm run build
Output Directory: dist
```

## Purpose

This project was built as a creative frontend experiment and a personal birthday gift. It also demonstrates the use of modern frontend technologies to create interactive 3D experiences on the web.

## License

This project is licensed under the MIT License.

