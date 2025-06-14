'use client'

import { ReactNode } from 'react'
import { BookProvider } from '@/providers/book-context'

export default function BookLayout({ children }: { children: ReactNode }) {
  return <BookProvider>{children}</BookProvider>
}
