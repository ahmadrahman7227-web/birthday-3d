import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { ExperienceStage } from '../../types/experience'

type BalloonData = {
  id: number
  position: [number, number, number]
  color: string
  phase: number
  speed: number
}

const BALLOON_COLORS = ['#ff8fd8', '#8ec5ff', '#ffc7ea', '#ffd166', '#c9a0ff']

type BalloonsProps = {
  count?: number
  stage: ExperienceStage
  onPopBalloon?: (id: string) => void
}

export function Balloons({ count = 6, stage, onPopBalloon }: BalloonsProps) {
  const floatBoost = stage === 'finale' ? 0.4 : 0

  const balloons = useMemo<BalloonData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 5,
        1.5 + Math.random() * 2,
        (Math.random() - 0.5) * 3 - 1,
      ] as [number, number, number],
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.3,
    }))
  }, [count])

  return (
    <group>
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          data={balloon}
          floatBoost={floatBoost}
          onPop={() => onPopBalloon?.(String(balloon.id))}
        />
      ))}
    </group>
  )
}

function Balloon({
  data,
  floatBoost,
  onPop,
}: {
  data: BalloonData
  floatBoost: number
  onPop: () => void
}) {
  const meshRef = useRef<Group>(null)
  const [popped, setPopped] = useState(false)
  const bounceRef = useRef(0)
  const popParticlesRef = useRef<Group>(null)
  const popTimeRef = useRef(0)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    if (popped) {
      popTimeRef.current += delta
      if (popParticlesRef.current) {
        popParticlesRef.current.children.forEach((child, i) => {
          const angle = (i / 6) * Math.PI * 2
          const spread = popTimeRef.current * 1.5
          child.position.set(
            Math.cos(angle) * spread * 0.15,
            spread * 0.2,
            Math.sin(angle) * spread * 0.15,
          )
          if ('material' in child && child.material) {
            const mat = child.material as { opacity: number }
            mat.opacity = Math.max(0, 1 - popTimeRef.current * 2)
          }
        })
      }
      meshRef.current.scale.setScalar(Math.max(0, 1 - popTimeRef.current * 3))
      return
    }

    const t = state.clock.elapsedTime
    meshRef.current.position.y =
      data.position[1] +
      Math.sin(t * data.speed + data.phase) * 0.15 +
      floatBoost
    meshRef.current.position.x =
      data.position[0] + Math.sin(t * data.speed * 0.5 + data.phase) * 0.08

    if (bounceRef.current > 0) {
      bounceRef.current -= 0.05
      const scale = 1 + bounceRef.current * 0.3
      meshRef.current.scale.setScalar(scale)
    } else {
      meshRef.current.scale.setScalar(1)
    }
  })

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (popped) return
    bounceRef.current = 1
    setPopped(true)
    onPop()
  }

  return (
    <group ref={meshRef} position={data.position}>
      <group
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (!popped) document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <mesh castShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color={data.color} roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={data.color} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.6, 4]} />
          <meshStandardMaterial color="#fff7fb" opacity={0.6} transparent />
        </mesh>
      </group>

      {popped && (
        <group ref={popParticlesRef}>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial
                color={data.color}
                emissive={data.color}
                emissiveIntensity={1}
                transparent
                opacity={1}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}
