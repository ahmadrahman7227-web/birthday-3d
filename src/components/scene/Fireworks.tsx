import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

type FireworksProps = {
  active: boolean
  count?: number
}

type Spark = {
  origin: [number, number, number]
  offset: [number, number, number]
  speed: number
  phase: number
  color: string
}

const SPARK_COLORS = ['#ff8fd8', '#ffd166', '#8ec5ff', '#ffc7ea', '#fff7fb']

export function Fireworks({ active, count = 20 }: FireworksProps) {
  const groupRef = useRef<Group>(null)

  const sparks = useMemo<Spark[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + Math.random() * 3
      return {
        origin: [
          Math.cos(angle) * radius * 0.3,
          2 + Math.random() * 2,
          Math.sin(angle) * radius * 0.3 - 2,
        ] as [number, number, number],
        offset: [
          Math.cos(angle) * (0.5 + Math.random()),
          Math.random() * 0.8,
          Math.sin(angle) * (0.5 + Math.random()),
        ] as [number, number, number],
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        color: SPARK_COLORS[i % SPARK_COLORS.length],
      }
    })
  }, [count])

  useFrame((state) => {
    if (!groupRef.current || !active) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      const spark = sparks[i]
      if (!spark) return
      const pulse = Math.sin(t * spark.speed * 3 + spark.phase)
      child.position.set(
        spark.origin[0] + spark.offset[0] * Math.sin(t * spark.speed + spark.phase),
        spark.origin[1] + spark.offset[1] * pulse,
        spark.origin[2] + spark.offset[2] * Math.cos(t * spark.speed + spark.phase),
      )
      child.scale.setScalar(0.6 + Math.max(0, pulse) * 0.6)
    })
  })

  if (!active) return null

  return (
    <group ref={groupRef}>
      {sparks.map((spark, i) => (
        <mesh key={i} position={spark.origin}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={spark.color}
            emissive={spark.color}
            emissiveIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}
