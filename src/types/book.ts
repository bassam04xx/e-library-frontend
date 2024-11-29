export interface Book {
  id: number; 
  title: string;
  author: string;
  description: string;
  file: File | null;
  category: string;
  cover: string;
  created_at: string;
}

export interface BookCreation extends Omit<Book, 'id'> {
  id?: undefined; 
}
