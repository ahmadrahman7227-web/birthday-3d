import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { birthdayContent } from '../../data/birthdayContent'
import type { ExperienceStage } from '../../types/experience'

type ExperienceOverlayProps = {
  stage: ExperienceStage
  onOpenGift: () => void
  onShowWishes: () => void
  onLightCandles: () => void
  onMakeWish: () => void
  onReplay: () => void
}

export function ExperienceOverlay({
  stage,
  onOpenGift,
  onShowWishes,
  onLightCandles,
  onMakeWish,
  onReplay,
}: ExperienceOverlayProps) {
  return (
    <div className="experience-overlay">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <OverlayPanel key="welcome">
            <span className="overlay-badge">Special Birthday Gift</span>
            <h1 className="overlay-title">
              {birthdayContent.title}, {birthdayContent.sisterName}
            </h1>
            <p className="overlay-subtitle">{birthdayContent.subtitle}</p>
            <p className="overlay-hint">{birthdayContent.introHint}</p>
            <ActionButton onClick={onOpenGift}>Open the Gift</ActionButton>
          </OverlayPanel>
        )}

        {stage === 'gift-opened' && (
          <OverlayPanel key="gift-opened">
            <div className="overlay-message-panel">
              <p>{birthdayContent.mainMessage}</p>
            </div>
            <ActionButton onClick={onShowWishes}>See Your Wishes</ActionButton>
          </OverlayPanel>
        )}

        {stage === 'wishes' && (
          <OverlayPanel key="wishes">
            <h2 className="overlay-title overlay-title--sm">
              Three little wishes for you
            </h2>
            <p className="overlay-subtitle">
              Tap each glowing card to read the message.
            </p>
            <ActionButton onClick={onLightCandles}>Light the Candles</ActionButton>
          </OverlayPanel>
        )}

        {stage === 'candles' && (
          <OverlayPanel key="candles">
            <h2 className="overlay-title overlay-title--sm">Make a wish</h2>
            <p className="overlay-subtitle">
              The candles are glowing for you.
            </p>
            <p className="overlay-hint">Tap the cake to make a wish</p>
            <ActionButton onClick={onMakeWish}>Make a Wish</ActionButton>
          </OverlayPanel>
        )}

        {stage === 'finale' && (
          <OverlayPanel key="finale">
            <h2 className="overlay-title overlay-title--sm">
              Your birthday wish has been sent ✨
            </h2>
            <div className="overlay-message-panel">
              <p>{birthdayContent.finaleMessage}</p>
            </div>
            <ActionButton onClick={onReplay}>Replay the Surprise</ActionButton>
          </OverlayPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

function OverlayPanel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="overlay-panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

function ActionButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      className="experience-button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
