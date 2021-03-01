'use strict';

const express = require('express');
const pg = require('pg');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

const client = new pg.Client(process.env.DATABASE_URL);

app.set('view engine','ejs');

const superagent = require('superagent');

app.set('view engine', 'ejs');

// localhost:3000/hello

app.get('/',(req,res)=>{
res.render('pages/index');
})
 //www.googleapis.com/books/v1/volumes?q=search+terms
app.get('/searches/new',(req,res)=>{
    // console.log(req.body);
    res.render('pages/searches/new');
})


app.post('/searches',(req,res)=>{
    // let varSearch=req.body.B;

    let searchMethod=req.body.searchBook;
    let url;
    if (req.body.radioSelect === 'Title' ) {
     url = `https://www.googleapis.com/books/v1/volumes?q=${searchMethod}+intitle`;
    } else if(req.body.radioSelect === 'Author') {
    url =`https://www.googleapis.com/books/v1/volumes?q=${searchMethod}+inauthor`;
    }
    superagent.get (url)
    .then (booksResult =>{
    // console.log(booksResult.body.items);
    let booksArr=booksResult.body.items.map(element => new Book (element));
    
    
    res.render('pages/searches/show',{myList:booksArr});
    })
    .catch(()=>{
        app.use("*", (req, res) => {
            res.status(500).send(errors);
          })
      })
    })


function Book(bookData) {
    this.img=bookData.volumeInfo.imageLinks.smallThumbnail || `https://i.imgur.com/J5LVHEL.jpg`;
    this.title=bookData.volumeInfo.title || 'no title available for this Book';
    this.authors=bookData.volumeInfo.authors || 'no authors';
    this.description=bookData.searchInfo.textSnippet|| 'no description';
}
app.get('/', (req,res) => {
    res.render('pages/index');
})

app.get('/error', (req,res) => {
        res.status(500).send('Error in Route');
           
})
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})

