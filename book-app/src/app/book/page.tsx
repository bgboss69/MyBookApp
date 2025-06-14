// app/book/page.tsx
import Link from 'next/link'

interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  isbn: string
  published: string
  publisher: string
  image: string
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch('https://fakerapi.it/api/v1/books?_quantity=10', { cache: 'no-store' })
  const json = await res.json()
  return json.data
}

export default async function BookListPage() {
  const books = await getBooks()
  const booksDataStr = encodeURIComponent(JSON.stringify(books))

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300">Title</th>
            <th className="p-2 border border-gray-300">Author</th>
            <th className="p-2 border border-gray-300">Genre</th>
            <th className="p-2 border border-gray-300">Description</th>
            <th className="p-2 border border-gray-300">ISBN</th>
            <th className="p-2 border border-gray-300">Published</th>
            <th className="p-2 border border-gray-300">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} className="hover:bg-gray-50 align-top">
              <td className="p-2 border border-gray-300">
                <Link
                  href={`/book/${book.id}?data=${booksDataStr}`}
                  className="text-blue-600 hover:underline"
                >
                  {book.title}
                </Link>
              </td>
              <td className="p-2 border border-gray-300">{book.author}</td>
              <td className="p-2 border border-gray-300">{book.genre}</td>
              <td className="p-2 border border-gray-300 max-w-xs truncate" title={book.description}>
                {book.description}
              </td>
              <td className="p-2 border border-gray-300">{book.isbn}</td>
              <td className="p-2 border border-gray-300">
                {new Date(book.published).toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
