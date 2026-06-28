import { Music, Pause } from 'lucide-react'
import { useBirthdayAudio } from '../../hooks/useBirthdayAudio'

export function MusicButton() {
  const { isPlaying, isReady, hasError, togglePlay } = useBirthdayAudio()

  const label = hasError
    ? 'Music unavailable'
    : isPlaying
      ? 'Pause birthday music'
      : 'Play birthday music'

  return (
    <div className="music-button-wrapper">
      <button
        type="button"
        className={`music-button ${hasError ? 'music-button--error' : ''}`}
        onClick={togglePlay}
        disabled={!isReady || hasError}
        aria-label={label}
        title={label}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
        <span className="music-button__label">
          {!isReady
            ? 'Loading…'
            : hasError
              ? 'Music unavailable'
              : isPlaying
                ? 'Pause'
                : 'Play music'}
        </span>
      </button>
    </div>
  )
}
