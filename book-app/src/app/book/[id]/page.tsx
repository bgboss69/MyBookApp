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

  if (!book) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold text-lg">
        Book not found.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4 flex items-center justify-center bg-gray-100">
            <img
              src={book.image}
              alt={book.title}
              className="object-contain h-64 w-full rounded"
            />
          </div>
          <div className="md:w-2/3 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <div className="text-gray-600">
              <p><span className="font-semibold">Author:</span> {book.author}</p>
              <p><span className="font-semibold">Genre:</span> {book.genre}</p>
              <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
              <p><span className="font-semibold">Published:</span> {new Date(book.published).toLocaleDateString()}</p>
              <p><span className="font-semibold">Publisher:</span> {book.publisher}</p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t text-gray-700 bg-gray-50">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
          <p className="leading-relaxed">{book.description}</p>
        </div>
      </div>
    </div>
  )
}
