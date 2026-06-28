import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { ExperienceStage } from '../../types/experience'

type MagicalParticlesProps = {
  stage: ExperienceStage
  count?: number
}

type Particle = {
  position: [number, number, number]
  velocity: [number, number, number]
  phase: number
}

export function MagicalParticles({ stage, count = 30 }: MagicalParticlesProps) {
  const groupRef = useRef<Group>(null)
  const active = stage === 'gift-opened' || stage === 'candles' || stage === 'finale'

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        0.8 + (Math.random() - 0.5) * 0.4,
        0.5 + Math.random() * 0.3,
        1.2 + (Math.random() - 0.5) * 0.4,
      ] as [number, number, number],
      velocity: [
        (Math.random() - 0.5) * 0.02,
        0.02 + Math.random() * 0.03,
        (Math.random() - 0.5) * 0.02,
      ] as [number, number, number],
      phase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame((state) => {
    if (!groupRef.current || !active) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i]
      if (!p) return
      child.position.x = p.position[0] + Math.sin(t + p.phase) * 0.15 + p.velocity[0] * t * 10
      child.position.y = p.position[1] + p.velocity[1] * t * 8 + Math.sin(t * 2 + p.phase) * 0.1
      child.position.z = p.position[2] + Math.cos(t + p.phase) * 0.1
    })
  })

  if (!active) return null

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial
            color="#ffd166"
            emissive="#ffd166"
            emissiveIntensity={1.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
