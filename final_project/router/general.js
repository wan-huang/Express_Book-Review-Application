const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify(books,null,4));
});

// Task 10: Task 1 + async-await with Axios
public_users.get("/async", async (req, res) => {
    let response = await axios.get("http://localhost:5000/");
    return res.send(response.data);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send(books[isbn])
});

// Task 11: Task 2 + async-await with Axios
public_users.get("/async/isbn/:isbn", (req, res) => {
    axios.get("http://localhost:5000/isbn/" + req.params.isbn)
        .then((response) => {return res.status(200).json(response.data);})
        .catch((err) => {return res.send(err);});
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const authorReq = req.params.author;
  const booksDict = Object.entries(books);
  const filteredBooks = [];
  for (const [key, values] of booksDict){
      if(values.author === authorReq){
          filteredBooks.push(values);
        }
    }
  res.send(filteredBooks);
});

// Task 12: Task 3 + async-await with Axios
public_users.get("/async/author/:author", async (req, res) => {
    let response = await axios.get("http://localhost:5000/author/" + req.params.author);
    return res.status(200).json(response.data);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const titleReq = req.params.title;
  const booksDict = Object.entries(books);
  const filteredBooks = [];
  for (const [key, values] of booksDict){
      if(values.title === titleReq){
          filteredBooks.push(values);
        }
    }
  res.send(filteredBooks);
});

//Task 13: Task 4 + async-await with Axios
public_users.get("/async/title/:title", async (req, res) => {
    let response = await axios.get("http://localhost:5000/title/" + req.params.title);
    return res.status(200).json(response.data)});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
