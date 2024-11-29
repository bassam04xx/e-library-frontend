'use client'

import { useState, useEffect } from 'react'
import { Book } from '@/types/book'
import { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Pencil, Trash, Plus } from 'lucide-react'

interface BookTableProps {
  user?: User
  books: Book[]
  onDelete: (id: number) => void
}

export default function BookTable({ user, books, onDelete }: BookTableProps) {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, books])

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "'_blank'")
  }

  const handleAdd = () => {
    console.log("'Add book'")
  }

  const handleModify = (id: number) => {
    console.log("'Modify book'", id)
  }

  return (
    <div className="container mx-auto py-8 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm border-2 border-purple-500 focus:border-pink-500 focus:ring-pink-500"
          />
          <Button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-purple-100">
              <TableHead className="text-purple-800">Title</TableHead>
              <TableHead className="text-purple-800">Author</TableHead>
              <TableHead className="text-purple-800">Category</TableHead>
              <TableHead className="text-purple-800">Description</TableHead>
              <TableHead className="text-purple-800">Created At</TableHead>
              <TableHead className="text-purple-800">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id} className="hover:bg-pink-50">
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{new Date(book.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleDownload(book.file)} className="text-blue-500 hover:bg-blue-100">
                      <Download className="h-4 w-4" />
                    </Button>
                    {user?.isAdmin && (
                      <>
                        <Button variant="outline" size="icon" onClick={() => handleModify(book.id)} className="text-yellow-500 hover:bg-yellow-100">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => onDelete(book.id)} className="text-red-500 hover:bg-red-100">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

