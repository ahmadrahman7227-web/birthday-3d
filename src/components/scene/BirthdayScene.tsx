import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Cake } from './Cake'
import { Balloons } from './Balloons'
import { GiftBox } from './GiftBox'
import { FloatingStars } from './FloatingStars'
import { SceneCamera } from './SceneCamera'
import { SceneLights } from './SceneLights'
import { WishCards3D } from './WishCards3D'
import { Fireworks } from './Fireworks'
import { MagicalParticles } from './MagicalParticles'
import { useResponsiveScene } from '../../hooks/useResponsiveScene'
import type { ExperienceStage } from '../../types/experience'

export type BirthdaySceneProps = {
  stage: ExperienceStage
  selectedWishId: string | null
  onOpenGift: () => void
  onSelectWish: (id: string) => void
  onMakeWish: () => void
  onPopBalloon?: (id: string) => void
}

function SceneContent({
  stage,
  selectedWishId,
  onOpenGift,
  onSelectWish,
  onMakeWish,
  onPopBalloon,
  cameraPosition,
  cameraLookAt,
  sceneScale,
  isMobile,
}: BirthdaySceneProps & {
  cameraPosition: [number, number, number]
  cameraLookAt: [number, number, number]
  sceneScale: number
  isMobile: boolean
}) {
  return (
    <>
      <SceneCamera position={cameraPosition} lookAt={cameraLookAt} />
      <SceneLights stage={stage} />

      <group scale={sceneScale}>
        <Cake stage={stage} onMakeWish={onMakeWish} />
        <Balloons
          count={isMobile ? 4 : 6}
          stage={stage}
          onPopBalloon={onPopBalloon}
        />
        <GiftBox stage={stage} onOpen={onOpenGift} />
        <FloatingStars count={isMobile ? 35 : 55} />
        <WishCards3D
          stage={stage}
          selectedWishId={selectedWishId}
          onSelectWish={onSelectWish}
        />
        <MagicalParticles stage={stage} count={isMobile ? 18 : 30} />
        <Fireworks active={stage === 'finale'} count={isMobile ? 12 : 20} />
      </group>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={stage === 'welcome'}
        autoRotateSpeed={0.25}
      />
    </>
  )
}

export function BirthdayScene({
  stage,
  selectedWishId,
  onOpenGift,
  onSelectWish,
  onMakeWish,
  onPopBalloon,
}: BirthdaySceneProps) {
  const { isMobile, cameraPosition, cameraLookAt, sceneScale } =
    useResponsiveScene(stage)

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: cameraPosition, fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#12091f']} />
          <fog attach="fog" args={['#12091f', 8, 18]} />
          <SceneContent
            stage={stage}
            selectedWishId={selectedWishId}
            onOpenGift={onOpenGift}
            onSelectWish={onSelectWish}
            onMakeWish={onMakeWish}
            onPopBalloon={onPopBalloon}
            cameraPosition={cameraPosition}
            cameraLookAt={cameraLookAt}
            sceneScale={sceneScale}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
