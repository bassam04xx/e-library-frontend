/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import BookTable from '@/components/book-table';
import AddBookForm from '@/components/AddBookForm';
import { fetchBooks } from './action';
import {Book} from '@/types/book'

const BooksPage = async (context: any) => {
  const initialBooks: Book[] = await fetchBooks(context);

 
  return (
    <div className="p-8">
      <h2 className="text-xl mb-2">Book List</h2>
      <AddBookForm context={context} />
      <BookTable user={{ isAdmin: false, isVisitor: true }} books={initialBooks} />
      <p className="text-gray-500 mt-4">As a visitor, you can only read and add books.</p>
    </div>
  );
};

export default BooksPage;