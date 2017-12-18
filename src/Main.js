import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';
import search from './icons/search.svg';

class Main extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
		shelves: PropTypes.array.isRequired
	};

	render() {
		const { books, onChangeShelf, shelves } = this.props;

		return (
			<div className='jumbotron'>
	            <h3>Currently Reading</h3>
				<ListBooks
					books = {books.filter((book)=>(book.shelf === 'currentlyReading'))}
	            	onChangeShelf = {onChangeShelf}
	            	shelves = {shelves}
				/>
	            <hr/>
	            <h3>Want To Read</h3>
	            <ListBooks
	                books = {books.filter((book)=>(book.shelf === 'wantToRead'))}
	                onChangeShelf = {onChangeShelf}
	                shelves = {shelves}
	            />
	            <hr/>
	            <h3>Read</h3>
	            <ListBooks
	                books = {books.filter((book)=>(book.shelf === 'read'))}
	                onChangeShelf = {onChangeShelf}
	                shelves = {shelves}
	            />
	            <button id='search'><Link to='/search'><img src={search} alt='search icon' /></Link></button>
	        </div>
        );
	}

}

export default Main;
