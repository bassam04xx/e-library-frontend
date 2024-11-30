  'use server';
  import { getCookie } from "@/utils/sessions";

  export const fetchBooks = async () => {
    const session = await getCookie('session');
  
    if (!session) {
      console.warn('No session found. Skipping fetchBooks.');
      return [];
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
  
    return response.json();
  };
  
  export const deleteBook = async (id: number) => {
    const session = await getCookie('session');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error deleting book:', errorMessage);
      throw new Error('Failed to delete book');
    }

    return id; // Return the ID of the deleted book
  };

  // New function to add a book
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const addBook = async (bookData: any) => {
      const session = await getCookie('session');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session}`,
        },
        body: bookData // Send the book data as JSON
      });
    
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error adding book:', errorMessage);
        throw new Error('Failed to add book');
      }
    
      return response.json(); // Return the added book data
    };