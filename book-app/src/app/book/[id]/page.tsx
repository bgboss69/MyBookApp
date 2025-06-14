'use client'

import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'

export default function BookDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const id = params?.id
  const dataStr = searchParams.get('data')

  const book = React.useMemo(() => {
    if (!dataStr || !id) return null
    try {
      const books = JSON.parse(decodeURIComponent(dataStr))
      return books.find((b: any) => String(b.id) === id) || null
    } catch {
      return null
    }
  }, [dataStr, id])

  if (!book) return <div className="p-4 text-red-600">Book not found</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <img src={book.image} alt={book.title} className="w-48 h-auto mb-4 rounded" />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Published:</strong> {new Date(book.published).toLocaleDateString()}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
    </div>
  )
}
