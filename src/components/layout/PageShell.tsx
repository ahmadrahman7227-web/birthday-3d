import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="experience-page">
      <div className="experience-page__gradient" aria-hidden="true" />
      {children}
    </div>
  )
}
