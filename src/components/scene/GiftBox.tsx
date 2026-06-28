import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import type { Group } from 'three'
import type { ExperienceStage } from '../../types/experience'

type GiftBoxProps = {
  stage: ExperienceStage
  onOpen: () => void
}

export function GiftBox({ stage, onOpen }: GiftBoxProps) {
  const lidRef = useRef<Group>(null)
  const boxRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  const isOpen = stage !== 'welcome'
  const canOpen = stage === 'welcome'

  useFrame(() => {
    if (lidRef.current) {
      const targetY = isOpen ? 0.7 : 0
      const targetRot = isOpen ? -0.8 : 0
      const targetZ = isOpen ? -0.15 : 0
      lidRef.current.position.y += (targetY - lidRef.current.position.y) * 0.06
      lidRef.current.rotation.x += (targetRot - lidRef.current.rotation.x) * 0.06
      lidRef.current.position.z += (targetZ - lidRef.current.position.z) * 0.06
    }

    if (boxRef.current) {
      const targetScale = hovered && canOpen ? 1.06 : 1
      const current = boxRef.current.scale.x
      boxRef.current.scale.setScalar(current + (targetScale - current) * 0.1)
    }
  })

  return (
    <group
      ref={boxRef}
      position={[0.8, -0.05, 1.2]}
      scale={1.15}
      onClick={(e) => {
        if (!canOpen) return
        e.stopPropagation()
        onOpen()
      }}
      onPointerOver={(e) => {
        if (!canOpen) return
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.0, 0.75, 1.0]} />
        <meshStandardMaterial
          color="#ff8fd8"
          roughness={0.5}
          emissive={hovered ? '#ff8fd8' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      <group ref={lidRef} position={[0, 0.75, -0.5]}>
        <mesh position={[0, 0, 0.5]} castShadow>
          <boxGeometry args={[1.05, 0.18, 1.05]} />
          <meshStandardMaterial color="#ffc7ea" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.14, 0.5]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#ffd166" metalness={0.4} />
        </mesh>
      </group>

      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.02, 0.77, 0.14]} />
        <meshStandardMaterial color="#ffd166" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.14, 0.77, 1.02]} />
        <meshStandardMaterial color="#ffd166" />
      </mesh>

      {isOpen && (
        <>
          <pointLight
            position={[0, 0.9, 0]}
            color="#ffd166"
            intensity={2}
            distance={4}
          />
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshStandardMaterial
              color="#ffd166"
              emissive="#ffd166"
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </>
      )}

      {canOpen && (
        <Html position={[0, 1.3, 0]} center distanceFactor={8}>
          <div className="gift-hint-label">Tap me</div>
        </Html>
      )}
    </group>
  )
}
