'use client'

import { useBooks } from '@/providers/book-context'
import Link from 'next/link'

export default function BookListPage() {
  const { books } = useBooks()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Book List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Author</th>
            <th className="border border-gray-300 p-2">Genre</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">ISBN</th>
            <th className="border border-gray-300 p-2">Published</th>
            <th className="border border-gray-300 p-2">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="border border-gray-300 p-2 text-blue-600 underline">
                <Link href={`/book/${book.id}`}>{book.title}</Link>
              </td>
              <td className="border border-gray-300 p-2">{book.author}</td>
              <td className="border border-gray-300 p-2">{book.genre}</td>
              <td className="border border-gray-300 p-2 truncate max-w-xs" title={book.description}>
                {book.description}
              </td>
              <td className="border border-gray-300 p-2">{book.isbn}</td>
              <td className="border border-gray-300 p-2">{new Date(book.published).toLocaleDateString('en-GB')}</td>
              <td className="border border-gray-300 p-2">{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
