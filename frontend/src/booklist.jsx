import React, { useEffect, useState } from "react";
import API from "../api";

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Library Books</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Total</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.totalCopies}</td>
              <td>{book.availableCopies}</td>
              <td>
                <button onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;