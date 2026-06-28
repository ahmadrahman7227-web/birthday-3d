import { useCallback, useEffect, useRef, useState } from 'react'
import birthdaySong from '../assets/ucapan_ultah.mp3'

const MUSIC_VOLUME = 0.55

export function useBirthdayAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const audio = new Audio(birthdaySong)
    audio.loop = true
    audio.volume = MUSIC_VOLUME
    audio.preload = 'metadata'

    const handleCanPlay = () => {
      setIsReady(true)
      setHasError(false)
    }

    const handleError = () => {
      setIsReady(false)
      setHasError(true)
      setIsPlaying(false)
    }

    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)

    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('loadedmetadata', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('loadedmetadata', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
      audioRef.current = null
    }
  }, [])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !isReady || hasError) return

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
      }
    } catch {
      setIsPlaying(false)
      setHasError(true)
    }
  }, [hasError, isPlaying, isReady])

  return {
    isPlaying,
    isReady,
    hasError,
    togglePlay,
  }
}
