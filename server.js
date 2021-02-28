'use strict';

const express = require('express');
require('dotenv').config();
const superagent = require('superagent');
const ejs = require('ejs');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
// localhost:3000/hello
app.get('/',(req,res)=>{
res.render('pages/index');
})
// let varible=intitle;
 //www.googleapis.com/books/v1/volumes?q=search+terms
app.get('/searches/new',(req,res)=>{
    // console.log(req.body);
    // res.render('pages/searches/new');
// })
// let url =`//www.googleapis.com/books/v1/volumes?q=${varible}`;
let url =`//www.googleapis.com/books/v1/volumes?q=${variabel}`;
superagent.get (url)
.then (booksResult =>{
console.log(booksResult.body.items);
res.render('pages/searches/show',{myList:booksResult.body.items});
})
})
function Book(bookData) {
    this.img=bookData.items[0].volumeInfo.imageLinks.smallThumbnail || `https://i.imgur.com/J5LVHEL.jpg`;
    this.title=bookData.items[0].volumeInfo.title;
    this.author=bookData.items[0].volumeInfo.authors;
    this.description=bookData.items[0].searchInfo.textSnippet;
}
app.use('*', (req, res) => {
    res.status(404).send('page not found');
  })
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})