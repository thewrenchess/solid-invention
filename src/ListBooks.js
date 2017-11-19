import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import PropTypes from 'prop-types';
import search from './icons/search.svg';

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	};

	state = {
		newShelf: ''
	}

	changeShelf = (shelf, book) => {
		BooksAPI.update(book, shelf).then((books)=>{
			console.log(books);
		});
		// if (shelf !== book.shelf) {
			
		// }
	}

	render() {
		const { books } = this.props;
		const { newShelf } = this.state;

		return (
			<div className='jumbotron'>
				<h3>Currently Reading</h3>
				<div className='row justify-content-around mt-5'>
					{books.filter((book) => (
						book.shelf === 'currentlyReading'
					)).map((book) => (
						<div key={book.id} className='col'>
							<div className='book-top'>
								<img src={book.imageLinks.thumbnail} alt={book.title} className='book-images'/>
								<div className='select-btn'>
									<select
										value={newShelf}
										onChange={(event) => {
											this.changeShelf(event.target.value, book);
										}}>
										<option value='none'></option>
										<option value='currentlyReading'>Currently Reading</option>
										<option value='wantToRead'>Want to Read</option>
										<option value='read'>Read</option>
										<option value='none'>None</option>
									</select>
								</div>
							</div>
							<div className='book-info'>
								<h5 className='text-center mt-3'>{book.title}</h5>
								{book.authors.map((author, index) => (
									<small key={index} className='author-names text-muted text-center'>{author}</small>
								))}
							</div>
						</div>
					))}
				</div>
				<hr/>
				<h3>Want to Read</h3>
				<div className='row justify-content-around mt-5'>
					{books.filter((book) => (
						book.shelf === 'wantToRead'
					)).map((book) => (
						<div key={book.id} className='col'>
							<div className='book-top'>
								<img src={book.imageLinks.thumbnail} alt={book.title} className='book-images'/>
							</div>
							<div className='book-info'>
								<h5 className='text-center mt-3'>{book.title}</h5>
								{book.authors.map((author, index) => (
									<small key={index} className='author-names text-muted text-center'>{author}</small>
								))}
							</div>
						</div>
					))}
				</div>
				<hr/>
				<h3>Read</h3>
				<div className='row justify-content-around mt-5'>
					{books.filter((book) => (
						book.shelf === 'read'
					)).map((book) => (
						<div key={book.id} className='col'>
							<div className='book-top'>
								<img src={book.imageLinks.thumbnail} alt={book.title} className='book-images'/>
							</div>
							<div className='book-info'>
								<h5 className='text-center mt-3'>{book.title}</h5>
								{book.authors.map((author, index) => (
									<small key={index} className='author-names text-muted text-center'>{author}</small>
								))}
							</div>
						</div>
					))}
				</div>
				<button id='search'><Link to='/search'><img src={search} alt='search icon' /></Link></button>
			</div>
		);
	};
}

export default ListBooks;
