const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());





const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // your MySQL password
  database: "library_db"
});

db.connect((err) => {
  if (err) {
    console.log(" DB connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
app.post("/books", (req, res) => {
  const { title, author, category, totalCopies } = req.body;

  const sql = `
    INSERT INTO books (title, author, category, totalCopies, availableCopies)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, author, category, totalCopies, totalCopies],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book added successfully" });
    }
  );
});

app.get("/", (req, res) => {
  res.send("Library API Running");
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, category, totalCopies, availableCopies } = req.body;

  const sql = `
    UPDATE books 
    SET title=?, author=?, category=?, totalCopies=?, availableCopies=?
    WHERE id=?
  `;

  db.query(
    sql,
    [title, author, category, totalCopies, availableCopies, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Book updated successfully" });
    }
  );
});
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM books WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted successfully" });
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});