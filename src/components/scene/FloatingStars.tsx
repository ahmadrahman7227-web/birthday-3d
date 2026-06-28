import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

type FloatingStarsProps = {
  count?: number
}

type StarData = {
  position: [number, number, number]
  scale: number
  speed: number
  phase: number
}

export function FloatingStars({ count = 60 }: FloatingStarsProps) {
  const groupRef = useRef<Group>(null)

  const stars = useMemo<StarData[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        Math.random() * 8 - 1,
        (Math.random() - 0.5) * 10 - 3,
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.04,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const star = stars[i]
      if (!star) return
      child.position.y =
        star.position[1] + Math.sin(t * star.speed + star.phase) * 0.1
      const mat = (child as Group).children?.[0]
      if (mat && 'material' in mat) {
        const material = (mat as { material: { opacity: number } }).material
        material.opacity = 0.4 + Math.sin(t * star.speed * 2 + star.phase) * 0.3
      }
    })
  })

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <group key={i} position={star.position}>
          <mesh scale={star.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#fff7fb"
              emissive="#ffd166"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
