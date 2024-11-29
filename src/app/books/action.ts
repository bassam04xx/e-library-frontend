import { parseCookies } from 'nookies';
import { GetServerSidePropsContext } from 'next';

export const fetchBooks = async (context: GetServerSidePropsContext) => {
  const { ACCESS_TOKEN } = parseCookies(context); // Retrieve the token from cookies

  const response = await fetch('http://127.0.0.1:8000/api/books/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMDg5OTc3LCJpYXQiOjE3MzI5MTcxNzcsImp0aSI6IjIzMTZlMDNhOWI2ZjQ3NGM4Y2RmNTJlODg0MDlkYTQ4IiwidXNlcl9pZCI6Mn0.r2VsIPBT-m8fh_0uESA0fuJwkw8z8QhdU2g14BHyR-I`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return response.json();
};

export const deleteBook = async (id: number, context: GetServerSidePropsContext) => {
  const { ACCESS_TOKEN } = parseCookies(context); // Retrieve the token from cookies

  const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMDg5OTc3LCJpYXQiOjE3MzI5MTcxNzcsImp0aSI6IjIzMTZlMDNhOWI2ZjQ3NGM4Y2RmNTJlODg0MDlkYTQ4IiwidXNlcl9pZCI6Mn0.r2VsIPBT-m8fh_0uESA0fuJwkw8z8QhdU2g14BHyR-I`,
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
export const addBook = async (bookData: any, context: GetServerSidePropsContext) => {
    const { ACCESS_TOKEN } = parseCookies(context); // Retrieve the token from cookies
  
    const response = await fetch('http://127.0.0.1:8000/api/books/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMDg5OTc3LCJpYXQiOjE3MzI5MTcxNzcsImp0aSI6IjIzMTZlMDNhOWI2ZjQ3NGM4Y2RmNTJlODg0MDlkYTQ4IiwidXNlcl9pZCI6Mn0.r2VsIPBT-m8fh_0uESA0fuJwkw8z8QhdU2g14BHyR-I`,
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