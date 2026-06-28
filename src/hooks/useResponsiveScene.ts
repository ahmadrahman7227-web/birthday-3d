import { useEffect, useMemo, useState } from 'react'
import type { ExperienceStage } from '../types/experience'
import { cameraPresets, mobileCameraPresets } from '../types/experience'

const MOBILE_BREAKPOINT = 768

export function useResponsiveScene(stage: ExperienceStage) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT,
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const presets = isMobile ? mobileCameraPresets : cameraPresets
  const { position: cameraPosition, lookAt: cameraLookAt } = presets[stage]
  const sceneScale = isMobile ? 0.82 : 1

  return useMemo(
    () => ({
      isMobile,
      cameraPosition,
      cameraLookAt,
      sceneScale,
    }),
    [isMobile, cameraPosition, cameraLookAt, sceneScale],
  )
}
