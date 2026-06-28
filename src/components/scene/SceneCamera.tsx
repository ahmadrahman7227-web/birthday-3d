import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

type SceneCameraProps = {
  position: [number, number, number]
  lookAt: [number, number, number]
}

export function SceneCamera({ position, lookAt }: SceneCameraProps) {
  const { camera } = useThree()
  const targetPosition = useRef(new Vector3(...position))
  const targetLookAt = useRef(new Vector3(...lookAt))
  const currentLookAt = useRef(new Vector3(...lookAt))

  useFrame(() => {
    targetPosition.current.set(...position)
    targetLookAt.current.set(...lookAt)

    camera.position.lerp(targetPosition.current, 0.04)
    currentLookAt.current.lerp(targetLookAt.current, 0.04)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
