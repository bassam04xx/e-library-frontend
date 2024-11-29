"'use client'"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Book } from '@/types/book'
import { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Download, Pencil, Trash, Plus, Search } from 'lucide-react'

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

  const handleDownload = (id: number) => {
    window.open(`http://127.0.0.1:8000/api/books/${id}/download/`, "'_blank'");
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
          <div className="relative w-full max-w-sm">
            <Input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-purple-500 focus:border-pink-500 focus:ring-pink-500 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white rounded-full">
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            
            <Card key={book.cover} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div>{book.cover}</div>
              <div className="relative h-64">
                
                
                <Image
                  src={book.cover as string || "https://img.freepik.com/free-vector/blank-book-cover-vector-illustration-gradient-mesh-isolated-object-design-branding_587448-952.jpg?t=st=1732895099~exp=1732898699~hmac=c2cf415fc9f29f4aa68bd13520e87422f5dbd8929543ed9b606f73835005808c&w=826"}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 truncate">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                <p className="text-xs text-gray-500">{book.category}</p>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => handleDownload(book.id)} className="text-blue-500 hover:bg-blue-100">
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
                {user?.isAdmin && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleModify(book.id)} className="text-yellow-500 hover:bg-yellow-100">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onDelete(book.id)} className="text-red-500 hover:bg-red-100">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

