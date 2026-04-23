import React, { useState } from "react";
import API from "../api";

function AddBook({ refresh }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: 1
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();
    await API.post("/books", book);
    refresh(); // reload list
    setBook({ title: "", author: "", category: "", totalCopies: 1 });
  };

  return (
    <form onSubmit={addBook}>
      <h2>Add Book</h2>

      <input
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
      />
      <br />

      <input
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
      />
      <br />

      <input
        name="category"
        placeholder="Category"
        value={book.category}
        onChange={handleChange}
      />
      <br />

      <input
        name="totalCopies"
        type="number"
        placeholder="Copies"
        value={book.totalCopies}
        onChange={handleChange}
      />
      <br />

      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;