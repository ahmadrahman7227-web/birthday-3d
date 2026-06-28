import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from './App'
import { birthdayContent } from './data/birthdayContent'
import { WishModal } from './components/ui/WishModal'

vi.mock('./components/scene/BirthdayScene', () => ({
  BirthdayScene: () => <div data-testid="birthday-scene">3D Scene Placeholder</div>,
}))

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}))

async function advanceToGiftOpened(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /open the gift/i }))
  await waitFor(() => {
    expect(screen.getByText(birthdayContent.mainMessage)).toBeInTheDocument()
  })
}

async function advanceToWishes(user: ReturnType<typeof userEvent.setup>) {
  await advanceToGiftOpened(user)
  await user.click(screen.getByRole('button', { name: /see your wishes/i }))
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /three little wishes for you/i }),
    ).toBeInTheDocument()
  })
}

async function advanceToCandles(user: ReturnType<typeof userEvent.setup>) {
  await advanceToWishes(user)
  await user.click(screen.getByRole('button', { name: /light the candles/i }))
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /^make a wish$/i }),
    ).toBeInTheDocument()
  })
}

async function advanceToFinale(user: ReturnType<typeof userEvent.setup>) {
  await advanceToCandles(user)
  await user.click(screen.getByRole('button', { name: /^make a wish$/i }))
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /your birthday wish has been sent/i }),
    ).toBeInTheDocument()
  })
}

describe('Interactive 3D Birthday Experience', () => {
  it('renders the welcome stage', () => {
    render(<App />)
    expect(screen.getByTestId('birthday-scene')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: new RegExp(birthdayContent.title, 'i'),
      }),
    ).toBeInTheDocument()
  })

  it('shows the Open the Gift button on welcome stage', () => {
    render(<App />)
    expect(
      screen.getByRole('button', { name: /open the gift/i }),
    ).toBeInTheDocument()
  })

  it('transitions to gift-opened stage when gift is opened', async () => {
    const user = userEvent.setup()
    render(<App />)

    await advanceToGiftOpened(user)

    expect(screen.getByText(birthdayContent.mainMessage)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /see your wishes/i }),
    ).toBeInTheDocument()
  })

  it('shows See Your Wishes after opening gift', async () => {
    const user = userEvent.setup()
    render(<App />)

    await advanceToGiftOpened(user)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /see your wishes/i }),
      ).toBeVisible()
    })
  })

  it('transitions to wishes stage', async () => {
    const user = userEvent.setup()
    render(<App />)

    await advanceToWishes(user)

    expect(
      screen.getByRole('heading', { name: /three little wishes for you/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /light the candles/i }),
    ).toBeInTheDocument()
  })

  it('opens wish modal with full wish text', () => {
    const wish = birthdayContent.wishes[0]
    render(<WishModal selectedWishId={wish.id} onClose={() => {}} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(wish.fullText)).toBeInTheDocument()
  })

  it('shows Light the Candles on wishes stage', async () => {
    const user = userEvent.setup()
    render(<App />)

    await advanceToWishes(user)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /light the candles/i }),
      ).toBeVisible()
    })
  })

  it('transitions to finale stage via Make a Wish', async () => {
    const user = userEvent.setup()
    render(<App />)

    await advanceToFinale(user)

    expect(
      screen.getByRole('heading', { name: /your birthday wish has been sent/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(birthdayContent.finaleMessage)).toBeInTheDocument()
  })

  it('resets to welcome stage on replay', async () => {
    const user = userEvent.setup()
    render(<App />)

    await advanceToFinale(user)
    await user.click(screen.getByRole('button', { name: /replay the surprise/i }))

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /open the gift/i }),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: new RegExp(birthdayContent.title, 'i'),
      }),
    ).toBeInTheDocument()
  })

  it('renders the music button on welcome stage', async () => {
    render(<App />)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /play birthday music/i }),
      ).toBeInTheDocument()
    })
  })

  it('toggles music play and pause on button click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const musicButton = await waitFor(() =>
      screen.getByRole('button', { name: /play birthday music/i }),
    )

    await user.click(musicButton)
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /pause birthday music/i }),
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /pause birthday music/i }))
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /play birthday music/i }),
      ).toBeInTheDocument()
    })
  })

  it('keeps the music button visible across experience stages', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /play birthday music/i }),
      ).toBeInTheDocument()
    })

    await advanceToFinale(user)

    expect(
      screen.getByRole('button', { name: /play birthday music|pause birthday music/i }),
    ).toBeInTheDocument()
  })
})
