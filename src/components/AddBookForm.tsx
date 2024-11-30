'use client'; // Mark this component as a client component

import { useState } from 'react';
import { addBook } from '@/app/books/action'; // Import the addBook action
import { revalidatePath } from 'next/cache';

interface AddBookFormProps {
  context: any; // Pass the context to the component
}

const AddBookForm: React.FC<AddBookFormProps> = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    file: null as File | null, // Initialize file as null
  });

  const [isSuccess, setIsSuccess] = useState(false); // New state for success
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.name.length > 100) {
      const truncatedName = file.name.substring(0, 100); // Truncate filename to 100 characters
      const renamedFile = new File([file], truncatedName, { type: file.type });
      setNewBook({ ...newBook, file: renamedFile }); // Update the file with the shortened name
    } else {
      setNewBook({ ...newBook, file }); // Update the file in the state
    }
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

      await addBook(formData); // Call the addBook function directly
      setIsSuccess(true); // Set success to true
      setNewBook({ title: '', author: '', description: '', category: '', file: null }); // Reset the form
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Failed to add book:', error);
      setErrorMessage('Failed to add book'); // Set error message
    }
  };

  return (
    <div>
      {isSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Book Added Successfully!</h3>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Error: {errorMessage}</h3>
            <button
              onClick={() => setErrorMessage(null)}
              className="mt-4 bg-red-700 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default AddBookForm;
