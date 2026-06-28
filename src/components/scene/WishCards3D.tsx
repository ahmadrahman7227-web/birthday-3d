import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group } from 'three'
import { birthdayContent } from '../../data/birthdayContent'
import type { ExperienceStage } from '../../types/experience'

type WishCards3DProps = {
  stage: ExperienceStage
  selectedWishId: string | null
  onSelectWish: (id: string) => void
}

const CARD_POSITIONS: [number, number, number][] = [
  [-2.2, 1.8, 0.5],
  [0, 2.4, -1.8],
  [2.2, 1.8, 0.5],
]

export function WishCards3D({ stage, selectedWishId, onSelectWish }: WishCards3DProps) {
  const visible = stage === 'wishes' || stage === 'candles' || stage === 'finale'

  if (!visible) return null

  return (
    <group>
      {birthdayContent.wishes.map((wish, index) => (
        <WishCard3D
          key={wish.id}
          wish={wish}
          position={CARD_POSITIONS[index] ?? [0, 2, 0]}
          isSelected={selectedWishId === wish.id}
          onSelect={() => onSelectWish(wish.id)}
          index={index}
        />
      ))}
    </group>
  )
}

type WishCard3DProps = {
  wish: (typeof birthdayContent.wishes)[number]
  position: [number, number, number]
  isSelected: boolean
  onSelect: () => void
  index: number
}

function WishCard3D({ wish, position, isSelected, onSelect, index }: WishCard3DProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const baseY = useMemo(() => position[1], [position])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = baseY + Math.sin(t * 0.6 + index * 1.2) * 0.12
    groupRef.current.rotation.y = Math.sin(t * 0.3 + index) * 0.08

    const targetScale = hovered || isSelected ? 1.12 : 1
    const current = groupRef.current.scale.x
    const next = current + (targetScale - current) * 0.1
    groupRef.current.scale.setScalar(next)
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.9, 0.06]} />
        <meshStandardMaterial
          color={isSelected ? '#ffd166' : '#24103f'}
          emissive={hovered || isSelected ? '#ff8fd8' : '#24103f'}
          emissiveIntensity={hovered || isSelected ? 0.4 : 0.1}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.35, 0.85, 0.02]} />
        <meshStandardMaterial
          color="#ffc7ea"
          transparent
          opacity={0.15}
        />
      </mesh>
      <Html
        center
        distanceFactor={6}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          width: '140px',
          textAlign: 'center',
        }}
      >
        <div className="wish-card-3d-label">
          <strong>{wish.title}</strong>
          <span>{wish.shortText}</span>
        </div>
      </Html>
    </group>
  )
}
