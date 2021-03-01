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
// res.send('helloooworld');

})
//inauthor || intitle
 //www.googleapis.com/books/v1/volumes?q=search+terms
app.get('/searches/new',(req,res)=>{
    // let varSearch=intitle;
    // console.log(req.body);
    res.render('pages/searches/new');
})


//im here
app.post('/searches',(req,res)=>{
    // let varSearch=req.body.B;
// let url =`//www.googleapis.com/books/v1/volumes?q='${varSearch}'`;
// let url=https://www.googleapis.com/books/v1/volumes?q=+;
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
// superagent.get (url)
// .then (booksResult =>{
// console.log(booksResult.body.items);
// res.render('pages/searches/show',{myList:booksResult.body.items});

// // })
// // })