import { BirthdayScene } from './components/scene/BirthdayScene'
import { PageShell } from './components/layout/PageShell'
import { ExperienceOverlay } from './components/ui/ExperienceOverlay'
import { WishModal } from './components/ui/WishModal'
import { ProgressDots } from './components/ui/ProgressDots'
import { MusicButton } from './components/ui/MusicButton'
import { useBirthdayExperience } from './hooks/useBirthdayExperience'
import './index.css'

function App() {
  const {
    stage,
    selectedWishId,
    openGift,
    showWishes,
    lightCandles,
    makeWish,
    replayExperience,
    selectWish,
    closeWishModal,
  } = useBirthdayExperience()

  return (
    <PageShell>
      <BirthdayScene
        stage={stage}
        selectedWishId={selectedWishId}
        onOpenGift={openGift}
        onSelectWish={selectWish}
        onMakeWish={makeWish}
      />
      <ExperienceOverlay
        stage={stage}
        onOpenGift={openGift}
        onShowWishes={showWishes}
        onLightCandles={lightCandles}
        onMakeWish={makeWish}
        onReplay={replayExperience}
      />
      <ProgressDots stage={stage} />
      <MusicButton />
      <WishModal selectedWishId={selectedWishId} onClose={closeWishModal} />
    </PageShell>
  )
}

export default App
