"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { LibraryButton } from "@/components/library-button"

type Book = {
  id: number
  title: string
  author: string
}

export default function LibraryPage() {
  const [query, setQuery] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editAuthor, setEditAuthor] = useState("")

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  )

  const handleAdd = () => {
    if (title.trim() && author.trim()) {
      const newBook: Book = {
        id: Date.now(),
        title,
        author,
      }
      setBooks([newBook, ...books])
      setTitle("")
      setAuthor("")
    }
  }

  const handleRemove = (id: number) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  const handleEdit = (book: Book) => {
    setEditingId(book.id)
    setEditTitle(book.title)
    setEditAuthor(book.author)
  }

  const handleSaveEdit = (id: number) => {
    if (editTitle.trim() && editAuthor.trim()) {
      setBooks(
        books.map((book) =>
          book.id === id ? { ...book, title: editTitle, author: editAuthor } : book
        )
      )
      setEditingId(null)
      setEditTitle("")
      setEditAuthor("")
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditAuthor("")
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Library Management System</h1>

      <div className="space-y-6 mb-12">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Search books by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg">
          <Input
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <LibraryButton variant="add" onClick={handleAdd}>
            Add Book
          </LibraryButton>
        </div>
      </div>

      <div className="space-y-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4">
                {editingId === book.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <Input
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <LibraryButton variant="add" onClick={() => handleSaveEdit(book.id)}>
                        Save
                      </LibraryButton>
                      <LibraryButton variant="remove" onClick={handleCancelEdit}>
                        Cancel
                      </LibraryButton>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>
                    </div>
                    <div className="flex gap-2">
                      <LibraryButton variant="edit" onClick={() => handleEdit(book)}>
                        Edit
                      </LibraryButton>
                      <LibraryButton variant="remove" onClick={() => handleRemove(book.id)}>
                        Remove
                      </LibraryButton>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">
            {query ? "No books match your search." : "Your library is empty. Add a book to get started!"}
          </p>
        )}
      </div>
    </div>
  )
}
