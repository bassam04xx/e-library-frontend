/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// e-library-frontend/src/components/AddBookForm.tsx

'use client'; // Mark this component as a client component

import { useState } from 'react';
import { addBook } from '@/app/books/action'; // Import the addBook action

interface AddBookFormProps {
  context: any; // Pass the context to the component
}

const AddBookForm: React.FC<AddBookFormProps> = ({ context }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    file: null as File | null, // Initialize file as null
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewBook({ ...newBook, file }); // Update the file in the state
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newBook.title);
      formData.append('author', newBook.author);
      formData.append('description', newBook.description);
      formData.append('category', newBook.category);
      if (newBook.file) {
        formData.append('file', newBook.file); // Append the file to the form data
      } else {
        console.error('No file selected'); // Log if no file is selected
      }

      // Log the FormData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await addBook(formData, context); // Call the addBook function directly
      setNewBook({ title: '', author: '', description: '', category: '', file: null }); // Reset the form
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={newBook.description}
        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={newBook.category}
        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="file"
        accept="application/pdf,image/*" // Accept PDF and image files
        onChange={handleFileChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Book</button>
    </form>
  );
};

export default AddBookForm;