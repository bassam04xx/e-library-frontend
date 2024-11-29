'use client';

import { useEffect, useState } from 'react';
import BookTable from '@/components/book-table';
import { Book, BookCreation } from '@/types/book';

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newBook, setNewBook] = useState<BookCreation>({title: '', author: '', description: '', file: null, category: '', cover: '', created_at: new Date().toISOString()});

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role === 'admin') {
      setIsAdmin(true);
    }

    const fetchBooks = async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/books/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      setBooks(data);

    };

    fetchBooks();
  }, []);
  useEffect(() => {
    console.log("Updated books:", books);
  }, [books]); 

  const handleAddBook = () => {
    const bookToAdd = { id: books.length + 1, ...newBook };
    setBooks([...books, bookToAdd]);
    setNewBook({ title: '', author: '', description: '', file: null, category: '', cover: '', created_at: new Date().toISOString() });
  };

  const handleDeleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="p-8">
      
      <h2 className="text-xl mb-2">Book List</h2>
      <BookTable user={{ isAdmin, isVisitor: !isAdmin }} books={books} onDelete={handleDeleteBook} />
      {/* <BookTable user={{ isAdmin, isVisitor: !isAdmin }} books={books.map(book => ({
        ...book,
        file: '',
        category: '',
        cover: '',
        created_at: new Date().toISOString()
      }))} onDelete={handleDeleteBook} /> */}
      
      {!isAdmin && (
        <p className="text-gray-500 mt-4">As a visitor, you can only read and add books.</p>
      )}
    </div>
  );
};

export default BooksPage;