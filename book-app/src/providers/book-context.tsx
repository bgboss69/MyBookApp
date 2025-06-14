'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  isbn: string
  image: string
  published: string
  publisher: string
}

interface BookContextType {
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch('https://fakerapi.it/api/v1/books?_quantity=10')
      const json = await res.json()
      setBooks(json.data)
    }
    fetchBooks()
  }, [])

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) throw new Error('useBooks must be used within BookProvider')
  return context
}
