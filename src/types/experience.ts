export type ExperienceStage =
  | 'welcome'
  | 'gift-opened'
  | 'wishes'
  | 'candles'
  | 'finale'

export type CameraPreset = {
  position: [number, number, number]
  lookAt: [number, number, number]
}

export const STAGE_ORDER: ExperienceStage[] = [
  'welcome',
  'gift-opened',
  'wishes',
  'candles',
  'finale',
]

export const cameraPresets: Record<ExperienceStage, CameraPreset> = {
  welcome: {
    position: [0, 2.4, 8],
    lookAt: [0, 0.8, 0],
  },
  'gift-opened': {
    position: [1.2, 2.1, 6],
    lookAt: [0.6, 0.7, 0],
  },
  wishes: {
    position: [0, 2.8, 7.5],
    lookAt: [0, 1.2, 0],
  },
  candles: {
    position: [0, 1.9, 5],
    lookAt: [0, 1.3, 0],
  },
  finale: {
    position: [0, 3.2, 8.5],
    lookAt: [0, 1.4, 0],
  },
}

export const mobileCameraPresets: Record<ExperienceStage, CameraPreset> = {
  welcome: {
    position: [0, 2.0, 7],
    lookAt: [0, 0.7, 0],
  },
  'gift-opened': {
    position: [0.8, 1.8, 5.5],
    lookAt: [0.5, 0.6, 0],
  },
  wishes: {
    position: [0, 2.4, 6.5],
    lookAt: [0, 1.0, 0],
  },
  candles: {
    position: [0, 1.6, 4.5],
    lookAt: [0, 1.2, 0],
  },
  finale: {
    position: [0, 2.6, 7.5],
    lookAt: [0, 1.2, 0],
  },
}
