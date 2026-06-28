import { STAGE_ORDER } from '../../types/experience'
import type { ExperienceStage } from '../../types/experience'

type ProgressDotsProps = {
  stage: ExperienceStage
}

export function ProgressDots({ stage }: ProgressDotsProps) {
  const currentIndex = STAGE_ORDER.indexOf(stage)

  return (
    <div className="progress-dots" aria-label="Experience progress">
      {STAGE_ORDER.map((s, i) => (
        <span
          key={s}
          className={`progress-dots__dot ${i <= currentIndex ? 'progress-dots__dot--active' : ''} ${i === currentIndex ? 'progress-dots__dot--current' : ''}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
