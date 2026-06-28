export type WishItem = {
  id: string
  title: string
  shortText: string
  fullText: string
}

export const birthdayContent = {
  sisterName: 'My Little Sister',
  title: 'Happy Birthday',
  subtitle: 'A magical little world made just for you.',
  introHint: 'Tap the gift box or press the button.',
  mainMessage:
    'Today is your special day. I hope your life is always filled with happiness, beautiful surprises, and dreams that slowly come true. You are loved more than you know.',
  finaleMessage:
    'May this year bring you more happiness, confidence, and beautiful memories.',
  wishes: [
    {
      id: 'smile',
      title: 'For Your Smile',
      shortText: 'Your smile makes ordinary days warmer.',
      fullText:
        'May your smile always shine brighter than the candles, and may every day bring you a small reason to be happy.',
    },
    {
      id: 'dreams',
      title: 'For Your Dreams',
      shortText: 'Beautiful things often begin quietly.',
      fullText:
        'Never stop dreaming. The things you imagine today can become the beautiful memories you live tomorrow.',
    },
    {
      id: 'future',
      title: 'For Your Future',
      shortText: 'Grow into everything you wish to become.',
      fullText:
        'I hope your future is full of confidence, kindness, courage, and moments that make you proud of yourself.',
    },
  ] satisfies WishItem[],
}
