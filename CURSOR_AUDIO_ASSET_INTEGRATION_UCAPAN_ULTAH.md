# Cursor Audio Asset Integration Prompt

## Context

The project already has a birthday music file inside the source assets folder.

The audio file is located at:

```txt
src/assets/ucapan_ultah.mp3
```

Important:
Do not use `/public/audio/birthday.mp3`.
Do not ask the user to move the file.
Do not create a new audio file.
Use the existing file:

```txt
src/assets/ucapan_ultah.mp3
```

---

## Goal

Integrate this existing birthday song into the interactive 3D birthday website.

The music button must use the audio file from:

```txt
src/assets/ucapan_ultah.mp3
```

The music must:

- not autoplay
- only play after the user clicks the music button
- support play and pause
- not crash if the browser blocks playback
- show a clear play/pause state
- work after production build
- be accessible with `aria-label`

---

## Required Implementation

Update or create this hook:

```txt
src/hooks/useBirthdayAudio.ts
```

Use the audio file by importing it from assets:

```ts
import birthdaySong from "../assets/ucapan_ultah.mp3";
```

The hook should behave like this:

```ts
import { useEffect, useRef, useState } from "react";
import birthdaySong from "../assets/ucapan_ultah.mp3";

export function useBirthdayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio(birthdaySong);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;

    if (!audio || hasError) {
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
      setHasError(true);
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    hasError,
    toggleAudio
  };
}
```

---

## Music Button Requirements

Update or create:

```txt
src/components/ui/MusicButton.tsx
```

The button should:

- use `useBirthdayAudio`
- display play icon when music is not playing
- display pause icon when music is playing
- use icons from `lucide-react`
- be placed in the top-right corner
- remain visible in all stages
- work on desktop and mobile
- include accessible labels

Example behavior:

```tsx
<button
  type="button"
  className="music-button"
  onClick={toggleAudio}
  aria-label={isPlaying ? "Pause birthday music" : "Play birthday music"}
>
  {isPlaying ? <Pause size={20} /> : <Music size={20} />}
</button>
```

If `hasError` is true, the button can show a disabled or warning state, but it must not crash the page.

---

## CSS Requirements

Add or update styling:

```css
.music-button {
  position: fixed;
  top: max(1rem, env(safe-area-inset-top));
  right: max(1rem, env(safe-area-inset-right));
  z-index: 30;
  width: 46px;
  height: 46px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.12);
  color: #fff7fb;
  backdrop-filter: blur(14px);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition:
    transform 180ms ease,
    background 180ms ease,
    border-color 180ms ease;
}

.music-button:hover {
  transform: translateY(-2px) scale(1.04);
  background: rgba(255, 143, 216, 0.22);
  border-color: rgba(255, 143, 216, 0.5);
}

.music-button:focus-visible {
  outline: 3px solid rgba(255, 209, 102, 0.8);
  outline-offset: 3px;
}

.music-button.is-playing {
  background: rgba(255, 143, 216, 0.28);
  border-color: rgba(255, 209, 102, 0.65);
}

.music-button.has-error {
  opacity: 0.55;
  cursor: not-allowed;
}
```

---

## Important Rules

1. Use the existing file:
   ```txt
   src/assets/ucapan_ultah.mp3
   ```

2. Do not use:
   ```txt
   /public/audio/birthday.mp3
   ```

3. Do not autoplay the music.

4. Do not make the website depend on the audio to render.

5. If audio playback fails, the site must still work normally.

6. The music button must remain visible across all stages:
   - welcome
   - gift-opened
   - wishes
   - candles
   - finale

7. The audio must continue playing when the user moves between stages.

8. The audio should stop only when:
   - the user clicks pause
   - the page is closed/refreshed

---

## Test Update

Update tests to confirm the music button renders.

Add a test like:

```ts
expect(
  screen.getByRole("button", { name: /play birthday music/i })
).toBeInTheDocument();
```

If needed, mock audio play/pause in Vitest because JSDOM does not fully support HTMLAudioElement playback.

Example mock:

```ts
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  window.HTMLMediaElement.prototype.pause = vi.fn();
});
```

---

## Final Instruction For Cursor

Apply this audio integration to the current project.

Use:

```txt
src/assets/ucapan_ultah.mp3
```

as the birthday music source.

After implementing, run:

```bash
npm run build
npm run test
```

Fix all errors before finishing.
