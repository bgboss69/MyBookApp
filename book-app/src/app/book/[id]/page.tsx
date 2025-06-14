'use client'

import { useBooks } from '@/providers/book-context'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function BookDetailPage() {
  const { books } = useBooks()
  const params = useParams()
  const router = useRouter()

  const id = params?.id
  const bookId = Number(id)
  const book = books.find(b => b.id === bookId)

  useEffect(() => {
    if (!book) {
      router.back()
    }
  }, [book, router])

  if (!book) {
    return <div className="p-8 text-xl">Book not found. Redirecting...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <img src={book.image} alt={book.title} className="w-48 h-auto mb-4 rounded border border-gray-300" />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Published:</strong> {new Date(book.published).toLocaleDateString('en-GB')}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
    </div>
  )
}
