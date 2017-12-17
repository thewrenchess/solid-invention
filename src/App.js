import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';
import logo from './icons/i-read-icon.svg';
import search from './icons/search.svg';

class App extends Component {
	state = {
		books: [],
        shelves: [
            {'key': 'currentlyReading', 'value': 'Currently Reading'},
            {'key': 'wantToRead', 'value': 'Want To Read'},
            {'key': 'read', 'value': 'Read'},
            {'key': 'none', 'value': 'None'}
        ]
	};

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	};

    changeShelf = (shelf, book) => {
        let temp = this.state.books;
        let pos = temp.indexOf(book);
        if (pos < 0) {
            book.shelf = shelf;
            temp.push(book);
        } else {
            temp[pos].shelf = shelf;
        }
        this.setState({ books: temp });
        BooksAPI.update(book,shelf).then();
        if (pos < 0) {
            window.location.reload();
        }
    };

  	render() {
        const { books, shelves } = this.state;

    	return (
      		<div className='card'>
      			<div className='card-header'>
      				<h1 className='text-center'>
      					<img src={logo} alt='iRead icon' className='logo' />
      					iRead
      					<img src={logo} alt='iRead icon' className='logo' /></h1>
      			</div>
      			<div className='card-body'>
      				<Route exact path='/' render={() => (
                        <div className='jumbotron'>
                            <h3>Currently Reading</h3>
          					<ListBooks
          						books = {books.filter((book)=>(book.shelf === 'currentlyReading'))}
                                onChangeShelf = {this.changeShelf}
                                shelves = {shelves}
          					/>
                            <hr/>
                            <h3>Want To Read</h3>
                            <ListBooks
                                books = {books.filter((book)=>(book.shelf === 'wantToRead'))}
                                onChangeShelf = {this.changeShelf}
                                shelves = {shelves}
                            />
                            <hr/>
                            <h3>Read</h3>
                            <ListBooks
                                books = {books.filter((book)=>(book.shelf === 'read'))}
                                onChangeShelf = {this.changeShelf}
                                shelves = {shelves}
                            />
                            <button id='search'><Link to='/search'><img src={search} alt='search icon' /></Link></button>
                        </div>
      				)}/>
              <Route path='/search' render={() => (
                <Search
                    currentBooks = {books}
                    onChangeShelf = {this.changeShelf}
                    shelves = {shelves}
                />
              )}/>
      			</div>
      			<div className='card-footer text-muted'>
      				<p className='text-center'>...no book was read in the making of this website...</p>
      				<p className='text-center'>by @thewrenchess</p>
      			</div>
      		</div>
    	);
  	}
}

export default App;
