# Cursor Upgrade Prompt — Transform Current Birthday Website Into a True One-Page Interactive 3D Experience

## Context

You are working on an existing React + Vite + TypeScript birthday website.

The current result already has:
- a dark purple birthday theme
- a 3D cake
- balloons
- a gift box
- confetti
- a birthday message
- a wishes and memories section
- a music button placeholder

However, the current result still feels like a normal 2D landing page with some 3D decorations.

The goal of this upgrade is to transform it into a true **one-page interactive 3D birthday experience**.

This website must feel like the user is inside a magical birthday world, not just reading a page.

---

## Main Upgrade Goal

Convert the current website into:

# A Fully Interactive One-Page 3D Birthday World

The final result must be:
- one page only
- no traditional long scrolling landing-page sections
- immersive 3D scene as the main experience
- interactive objects
- state-based scene progression
- cinematic camera movement
- polished UI overlay
- responsive on desktop, tablet, and mobile
- production-build safe
- tested

---

## Important Direction

Do not simply add more text sections.

Do not create a normal website layout.

Do not create a separate Memories section below the hero.

Instead, make the memories and wishes part of the 3D scene itself.

Everything should happen inside one full-screen interactive scene.

The page should feel like:
- a magical room
- a birthday stage
- a tiny dreamy world
- a digital birthday gift
- a playful interactive surprise

---

## Problems In The Current Version

Fix these issues:

1. The website is still too static.
2. The 3D objects are decorative, not deeply interactive.
3. The layout still feels like a landing page.
4. The wishes/memories section is separated below the scene.
5. The gift box does not feel like a central interaction.
6. There is no clear interactive journey.
7. There is no cinematic camera movement.
8. There are no clickable 3D hotspots.
9. There is no interactive memory reveal.
10. The final experience does not yet feel magical enough.

---

## Required New Experience Flow

Create a single-page experience with these stages:

### Stage 1 — Welcome

Initial scene:
- full-screen 3D birthday world
- cake in the center
- gift box in front or beside the cake
- floating balloons
- stars and soft particles
- text overlay:
  - "Happy Birthday, My Little Sister"
  - "Tap the gift to begin your surprise"
- primary button:
  - "Open the Gift"

Interactions:
- user can click the 3D gift box
- user can click the button
- balloons gently float
- scene has subtle camera movement

---

### Stage 2 — Gift Opens

When the user opens the gift:
- gift lid animates upward and rotates
- golden light comes out of the box
- confetti appears
- particles burst upward from the gift
- camera gently moves closer
- birthday message appears in a beautiful glass panel

Message:
"Today is your special day. I hope your life is always filled with happiness, beautiful surprises, and dreams that slowly come true. You are loved more than you know."

New CTA:
- "See Your Wishes"

---

### Stage 3 — Wishes Orbit

When user clicks "See Your Wishes":
- camera transitions to reveal 3 floating wish cards around the cake
- cards should appear as 3D floating panels or magical cards
- cards gently orbit or float
- each card is clickable
- clicking a card opens a larger readable overlay/modal

Wish cards:
1. "For Your Smile"
2. "For Your Dreams"
3. "For Your Future"

Each card must have:
- a title
- a short message
- soft glow
- hover/tap effect
- visible click feedback

New CTA:
- "Light the Candles"

---

### Stage 4 — Candle Interaction

When user clicks "Light the Candles":
- camera focuses on the cake
- candle flames become brighter
- cake glows softly
- sparkle particles appear around the cake
- text overlay says:
  - "Make a wish..."

Interaction:
- user clicks/taps the cake or candle area
- this triggers the final celebration

New CTA:
- "Make a Wish"

---

### Stage 5 — Final Celebration

When user clicks "Make a Wish":
- stronger confetti burst
- fireworks-like particles in the background
- balloons float higher
- final message appears:
  - "May this year bring you more happiness, confidence, and beautiful memories."
- final CTA:
  - "Replay the Surprise"

Replay:
- resets the scene to Stage 1
- all animations and interactions can run again

---

## Required State Machine

Create a simple state system.

Use a type like:

```ts
type ExperienceStage =
  | "welcome"
  | "gift-opened"
  | "wishes"
  | "candles"
  | "finale";
```

In `App.tsx` or a dedicated hook, manage:

```ts
const [stage, setStage] = useState<ExperienceStage>("welcome");
```

Functions:

```ts
openGift()
showWishes()
lightCandles()
makeWish()
replayExperience()
```

Do not use many disconnected boolean states if a stage-based system is cleaner.

---

## Required 3D Interactions

The scene must support these interactions:

1. Click gift box to open it.
2. Click balloons to make them bounce or pop into small particles.
3. Click wish cards to open details.
4. Click cake/candles to make a wish.
5. Optional: drag/rotate camera slightly with limited OrbitControls.
6. Hover effect on clickable 3D objects on desktop.
7. Tap-friendly interaction on mobile.

Use `onPointerOver`, `onPointerOut`, and `onClick` where appropriate.

Clickable objects must visually respond:
- scale up slightly
- glow
- bounce
- change cursor
- show hint label

---

## Camera Upgrade

The current camera feels static.

Add cinematic camera behavior based on stage.

Example camera targets:

```ts
const cameraPresets = {
  welcome: {
    position: [0, 2.4, 8],
    lookAt: [0, 0.8, 0]
  },
  giftOpened: {
    position: [1.2, 2.1, 6],
    lookAt: [0.6, 0.7, 0]
  },
  wishes: {
    position: [0, 2.8, 7.5],
    lookAt: [0, 1.2, 0]
  },
  candles: {
    position: [0, 1.9, 5],
    lookAt: [0, 1.3, 0]
  },
  finale: {
    position: [0, 3.2, 8.5],
    lookAt: [0, 1.4, 0]
  }
};
```

Implement a `SceneCamera` component that uses `useFrame` and lerps the camera position smoothly.

Do not instantly jump the camera.

Use `THREE.Vector3.lerp`.

---

## Required 3D Components

Update or create these files:

```txt
src/components/scene/
├── BirthdayScene.tsx
├── SceneCamera.tsx
├── Cake.tsx
├── GiftBox.tsx
├── Balloons.tsx
├── FloatingStars.tsx
├── WishCards3D.tsx
├── Fireworks.tsx
├── MagicalParticles.tsx
└── SceneLights.tsx
```

---

## BirthdayScene Requirements

`BirthdayScene.tsx` should receive:

```ts
type BirthdaySceneProps = {
  stage: ExperienceStage;
  selectedWishId: string | null;
  onOpenGift: () => void;
  onSelectWish: (id: string) => void;
  onMakeWish: () => void;
  onPopBalloon?: (id: string) => void;
};
```

It should render:
- Canvas
- camera controller
- lights
- background stars
- cake
- gift box
- balloons
- 3D wish cards
- magical particles
- fireworks during finale

Use responsive scale from `useResponsiveScene`.

---

## GiftBox Upgrade

The gift box should become the most important object in the scene.

Requirements:
- larger and more central
- visible hover/tap state
- lid opening animation
- golden light inside
- particle burst when opened
- clickable mesh
- label hint above it when stage is welcome:
  - "Tap me"

Animation:
- closed: lid sits on top
- opened: lid lifts, rotates, moves slightly backward
- final: box continues glowing softly

Use `useFrame` for smooth interpolation.

---

## Cake Upgrade

Cake should become interactive.

Requirements:
- candles glow more in `candles` and `finale` stage
- flames gently flicker
- cake has soft bloom-like feeling using emissive materials
- clickable in `candles` stage
- when clicked, triggers final celebration

Add visual hint:
- when stage is `candles`, show small floating text:
  - "Tap the cake to make a wish"

If 3D text is difficult, use an HTML overlay hint instead.

---

## WishCards3D

Create floating 3D wish cards inside the scene.

Requirements:
- 3 cards
- positioned around cake
- hidden before `wishes` stage
- visible in `wishes`, `candles`, and `finale`
- slowly floating
- clickable
- scale/hover feedback
- each card has short title text

Implementation options:
- Use `Html` from `@react-three/drei` for readable card labels inside 3D space.
- Or use simple planes plus HTML overlay.
- Use whichever is stable and readable.

When a card is clicked:
- set selected wish
- show detailed wish modal in the UI overlay

---

## Balloons Upgrade

Current balloons are decorative.

Upgrade them:
- make each balloon clickable
- click/tap causes bounce or pop effect
- if popped, show tiny particle burst
- do not permanently remove all balloons unless desired
- keep animation gentle
- on mobile, reduce balloon count

---

## Fireworks / Final Particles

Create `Fireworks.tsx`.

Only active in `finale` stage.

Requirements:
- lightweight
- procedural
- not too many particles
- use small spheres or points
- animate outward or twinkling
- must not hurt mobile performance

If implementation becomes too complex, create a simple background sparkle burst instead of full physics fireworks.

---

## UI Overlay Upgrade

Replace the current long-page layout with a stage-based overlay.

Create/update:

```txt
src/components/ui/ExperienceOverlay.tsx
src/components/ui/WishModal.tsx
src/components/ui/MusicButton.tsx
src/components/ui/ProgressDots.tsx
```

The overlay should show different content based on stage.

### Welcome Overlay

Title:
"Happy Birthday, My Little Sister"

Subtitle:
"A magical little world made just for you."

Button:
"Open the Gift"

Hint:
"Tap the gift box or press the button"

---

### Gift Opened Overlay

Message panel:
"Today is your special day. I hope your life is always filled with happiness, beautiful surprises, and dreams that slowly come true. You are loved more than you know."

Button:
"See Your Wishes"

---

### Wishes Overlay

Title:
"Three little wishes for you"

Subtitle:
"Tap each glowing card to read the message."

Button:
"Light the Candles"

---

### Candles Overlay

Title:
"Make a wish"

Subtitle:
"The candles are glowing for you."

Button:
"Make a Wish"

---

### Finale Overlay

Title:
"Your birthday wish has been sent ✨"

Message:
"May this year bring you more happiness, confidence, and beautiful memories."

Button:
"Replay the Surprise"

---

## Remove Traditional Scrolling Layout

The current "Wishes & Memories" section below the hero should be removed or converted.

The page should be one full-screen experience.

Rules:
- No long vertical layout.
- No separate below-the-fold section.
- No standard card grid below hero.
- Use full viewport layout.
- If cards exist, make them part of the interactive scene or overlay modal.

Body should not require scrolling for the core experience.

Use:

```css
html,
body,
#root {
  width: 100%;
  min-height: 100%;
}

.experience-page {
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  position: relative;
}
```

Use `100svh` for better mobile viewport behavior.

---

## Responsive Requirements

The one-page experience must work on:

- 360px mobile
- 390px mobile
- 430px mobile
- 768px tablet
- 1366px laptop
- desktop wide screens

Responsive rules:
- overlay text must not cover too much of the scene
- CTA must remain visible
- objects must stay centered
- no horizontal scroll
- no vertical page scrolling for main experience
- modals must fit mobile screens
- scene scale must adjust per device
- camera positions must adjust per device

Mobile behavior:
- reduce particles
- reduce balloon count
- make buttons larger
- make overlay compact
- keep scene readable
- do not place important objects near screen edges

---

## Data Structure

Update birthday data:

```ts
export type WishItem = {
  id: string;
  title: string;
  shortText: string;
  fullText: string;
};

export const birthdayContent = {
  sisterName: "My Little Sister",
  title: "Happy Birthday",
  subtitle: "A magical little world made just for you.",
  introHint: "Tap the gift box or press the button.",
  mainMessage:
    "Today is your special day. I hope your life is always filled with happiness, beautiful surprises, and dreams that slowly come true. You are loved more than you know.",
  finaleMessage:
    "May this year bring you more happiness, confidence, and beautiful memories.",
  wishes: [
    {
      id: "smile",
      title: "For Your Smile",
      shortText: "Your smile makes ordinary days warmer.",
      fullText:
        "May your smile always shine brighter than the candles, and may every day bring you a small reason to be happy."
    },
    {
      id: "dreams",
      title: "For Your Dreams",
      shortText: "Beautiful things often begin quietly.",
      fullText:
        "Never stop dreaming. The things you imagine today can become the beautiful memories you live tomorrow."
    },
    {
      id: "future",
      title: "For Your Future",
      shortText: "Grow into everything you wish to become.",
      fullText:
        "I hope your future is full of confidence, kindness, courage, and moments that make you proud of yourself."
    }
  ]
};
```

---

## Animation Quality

Animations should feel smooth and intentional.

Use:
- Framer Motion for overlay transitions
- React Three Fiber `useFrame` for 3D motion
- CSS transitions for buttons and modals

Avoid:
- sudden jumps
- too many animations at once
- distracting movement
- laggy effects
- overly complex physics

---

## Audio

Keep the existing music button concept, but polish it.

Requirements:
- floating top-right button
- no autoplay
- if `/audio/birthday.mp3` does not exist, show subtle note:
  - "Add birthday.mp3 to enable music"
- no crash when file missing
- button accessible
- audio can be toggled after user interaction

---

## Testing Upgrade

Update tests according to the new one-page interactive experience.

Required tests:

1. App renders the welcome stage.
2. "Open the Gift" button is visible.
3. Clicking "Open the Gift" changes the UI to gift-opened stage.
4. "See Your Wishes" appears after opening gift.
5. Clicking "See Your Wishes" shows wishes stage.
6. Wish card/modal logic works.
7. "Light the Candles" appears.
8. "Make a Wish" leads to finale stage.
9. "Replay the Surprise" resets to welcome stage.
10. Music button renders.

If Canvas causes test problems:
- mock `BirthdayScene`
- test state and overlay behavior separately
- do not leave failing tests

---

## Build Requirements

After changes, run:

```bash
npm run build
npm run test
```

Fix all errors.

The project must:
- compile successfully
- pass tests
- run with `npm run dev`
- show no blank screen
- show no broken imports
- show no TypeScript errors

---

## Manual QA Checklist

After implementation, manually check:

### Desktop
- full-screen one-page experience
- gift is clearly clickable
- opening gift feels magical
- camera moves smoothly
- wish cards appear inside the experience
- clicking wish cards opens details
- candle stage works
- finale feels celebratory
- replay works

### Mobile
Check 360px, 390px, 430px:
- no horizontal scroll
- no awkward vertical scroll
- overlay does not cover everything
- gift/cake remain visible
- buttons are easy to tap
- modals fit screen
- performance is smooth

---

## Final Report

When finished, report:

```txt
Interactive 3D birthday experience upgrade completed.

Main improvements:
- Converted the website into a one-page full-screen interactive 3D experience
- Removed the traditional scrolling landing-page layout
- Added stage-based experience flow
- Added cinematic camera transitions
- Upgraded gift box interaction
- Added interactive 3D wish cards
- Added cake/candle wish interaction
- Added final celebration scene
- Improved responsive behavior
- Updated tests
- Verified production build

Commands completed:
- npm run build
- npm run test

How to run:
npm run dev

How to customize:
Edit src/data/birthdayContent.ts

How to add music:
Add file to public/audio/birthday.mp3
```

---

## Final Instruction

Start upgrading the existing project now.

Do not rebuild as a generic landing page.

The final result must be a single-page interactive 3D birthday world, not a normal website with a 3D decoration.

Run the build and tests before finishing.
