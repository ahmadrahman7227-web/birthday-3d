import type { ExperienceStage } from '../../types/experience'

type SceneLightsProps = {
  stage: ExperienceStage
}

export function SceneLights({ stage }: SceneLightsProps) {
  const isBright = stage === 'candles' || stage === 'finale'
  const giftGlow = stage === 'gift-opened' || stage === 'finale'

  return (
    <>
      <ambientLight intensity={isBright ? 0.55 : 0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={isBright ? 1.0 : 0.8}
        castShadow
      />
      <pointLight
        position={[-3, 4, 2]}
        color="#ff8fd8"
        intensity={isBright ? 0.7 : 0.5}
      />
      <pointLight
        position={[3, 3, -2]}
        color="#8ec5ff"
        intensity={0.3}
      />
      {giftGlow && (
        <pointLight
          position={[0.8, 1.2, 1.2]}
          color="#ffd166"
          intensity={stage === 'finale' ? 2 : 1.2}
          distance={5}
        />
      )}
      {isBright && (
        <pointLight
          position={[0, 2, 0]}
          color="#ffaa44"
          intensity={1.5}
          distance={4}
        />
      )}
    </>
  )
}
