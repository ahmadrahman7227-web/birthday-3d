import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { birthdayContent } from '../../data/birthdayContent'

type WishModalProps = {
  selectedWishId: string | null
  onClose: () => void
}

export function WishModal({ selectedWishId, onClose }: WishModalProps) {
  const wish = birthdayContent.wishes.find((w) => w.id === selectedWishId)

  return (
    <AnimatePresence>
      {wish && (
        <motion.div
          className="wish-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="wish-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wish-modal-title"
          >
            <button
              type="button"
              className="wish-modal__close"
              onClick={onClose}
              aria-label="Close wish"
            >
              <X size={20} />
            </button>
            <h3 id="wish-modal-title" className="wish-modal__title">
              {wish.title}
            </h3>
            <p className="wish-modal__text">{wish.fullText}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
