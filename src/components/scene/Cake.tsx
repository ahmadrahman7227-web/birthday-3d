import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { ExperienceStage } from '../../types/experience'

type CakeProps = {
  stage: ExperienceStage
  onMakeWish: () => void
}

export function Cake({ stage, onMakeWish }: CakeProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const isCandleStage = stage === 'candles'
  const isGlowing = stage === 'candles' || stage === 'finale'
  const clickable = isCandleStage

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  const flameIntensity = isGlowing ? 1.5 : 0.8
  const cakeEmissive = isGlowing ? 0.15 : 0

  return (
    <group
      ref={groupRef}
      position={[0, -0.3, 0]}
      onClick={(e) => {
        if (!clickable) return
        e.stopPropagation()
        onMakeWish()
      }}
      onPointerOver={(e) => {
        if (!clickable) return
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      scale={hovered && clickable ? 1.03 : 1}
    >
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.15, 0.6, 32]} />
        <meshStandardMaterial
          color="#ffc7ea"
          roughness={0.6}
          emissive="#ff8fd8"
          emissiveIntensity={cakeEmissive}
        />
      </mesh>

      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.95, 1.0, 0.25, 32]} />
        <meshStandardMaterial color="#fff7fb" roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.9, 0.15, 32]} />
        <meshStandardMaterial
          color="#ff8fd8"
          roughness={0.5}
          emissive="#ff8fd8"
          emissiveIntensity={cakeEmissive * 1.5}
        />
      </mesh>

      {[-0.35, 0, 0.35].map((x, i) => (
        <group key={i} position={[x, 1.15, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
            <meshStandardMaterial color="#ffd166" />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <coneGeometry args={[0.06, 0.12, 8]} />
            <meshStandardMaterial
              color="#ff9f43"
              emissive="#ff6b35"
              emissiveIntensity={flameIntensity}
            />
          </mesh>
          <pointLight
            position={[0, 0.25, 0]}
            color="#ffaa44"
            intensity={isGlowing ? 0.8 : 0.3}
            distance={isGlowing ? 2.5 : 1.5}
          />
        </group>
      ))}

      {isGlowing &&
        Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 + stateTime(i)
          const radius = 1.0
          return (
            <Sparkle key={i} angle={angle} radius={radius} index={i} />
          )
        })}

      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 0.75
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.88,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#ffd166" />
          </mesh>
        )
      })}
    </group>
  )
}

function stateTime(i: number) {
  return i * 0.5
}

function Sparkle({
  angle,
  radius,
  index,
}: {
  angle: number
  radius: number
  index: number
}) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const a = angle + t * 0.2
    ref.current.position.set(
      Math.cos(a) * radius,
      1.1 + Math.sin(t * 2 + index) * 0.15,
      Math.sin(a) * radius,
    )
    ref.current.scale.setScalar(0.5 + Math.sin(t * 3 + index) * 0.3)
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial
          color="#ffd166"
          emissive="#ffd166"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}
