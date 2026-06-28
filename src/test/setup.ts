import '@testing-library/jest-dom'

function createMockIntersectionObserver() {
  return class {
    readonly root: Element | Document | null = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    readonly scrollMargin = ''
    callback: IntersectionObserverCallback

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback(
        [{ isIntersecting: true, target } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      )
    }

    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  }
}

const MockIntersectionObserver = createMockIntersectionObserver()

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

class MockAudio {
  loop = false
  volume = 1
  preload = ''
  src = ''
  private listeners = new Map<string, Set<EventListener>>()

  addEventListener(event: string, handler: EventListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(handler)

    if (event === 'canplaythrough' || event === 'loadedmetadata') {
      queueMicrotask(() => handler(new Event(event)))
    }
  }

  removeEventListener(event: string, handler: EventListener) {
    this.listeners.get(event)?.delete(handler)
  }

  pause() {
    this.listeners.get('pause')?.forEach((handler) => handler(new Event('pause')))
  }

  play() {
    this.listeners.get('play')?.forEach((handler) => handler(new Event('play')))
    return Promise.resolve()
  }
}

Object.defineProperty(window, 'Audio', {
  writable: true,
  configurable: true,
  value: MockAudio,
})
