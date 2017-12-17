import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './utils/BooksAPI';
import back from './icons/back.svg';
import clear from './icons/clear-query.svg';
import noImage from './icons/no-img.svg';

class Search extends Component {
	static propTypes = {
		currentBooks: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
		shelves: PropTypes.array.isRequired
	};

	state = {
		query: '',
		searchResult: [],
	};

	updateQuery = (query) => {
		this.setState({ query: query.trim() });
		query
			? this.searchQuery(query)
			: this.setState({ searchResult: [] });
	};

	clearQuery = () => {
		this.setState({ query: '' });
		this.setState({ searchResult: [] });
	};

	searchQuery = (query) => {
		BooksAPI.search(query, 20).then((books) => {
			books && this.setState({ searchResult:books });
		})
	};

	getShelf = (book) => {
		for (let cBook of this.props.currentBooks) {
			if (cBook.id === book.id) {
				return cBook.shelf;
			}
		}
		return 'none';
	};

	render() {
		const { onChangeShelf, shelves } = this.props;
		const { query, searchResult } = this.state;

		return (
			<div>
				<div className='border px-2 row'>
					<div className='col-1 pt-1'><Link
						to='/'
					><img src={back} alt='back' id='arrow' /></Link></div>
					<div className='col'><input
						id='input'
						className='p-2'
						type='text'
						placeholder='Search books by genre'
						value={query}
						onChange={(event) => {
							this.updateQuery(event.target.value);
						}}
					/></div>
					<div className='col-1 pt-1'><button onClick={this.clearQuery} className='clear-btn' ><img src={clear} alt='clear' id='clear' /></button></div>
				</div>
				{!searchResult.length && !searchResult.error && (
					<p className='text-center text-muted'>Please type in your search above.</p>
				)}
				{searchResult.error && (
					<p className='text-center text-muted'>No book title matches your search.</p>
				)}
				{!searchResult.error && (
					<div className='row justify-content-around mt-5'>
						{searchResult.map((book) => (
							<div key={book.id} className='col'>
								<div className='book-top'>
									{book.imageLinks && <img src={book.imageLinks.thumbnail} alt={book.title} className='book-images'/>}
									{!book.imageLinks && <img src={noImage} alt={book.title} className='book-images' />}
									<div className='select-btn'>
										<select
											onChange={(event) => {
												onChangeShelf(event.target.value, book);
											}}>
											<option value=''></option>
											{shelves.map((shelf)=>(
												shelf.key === this.getShelf(book)
													? <option key={shelf.key} value={shelf.key} disabled>*{shelf.value}</option>
													: <option key={shelf.key} value={shelf.key}>{shelf.value}</option>
											))}
										</select>
									</div>
								</div>
								<div className='book-info'>
									<h5 className='text-center mt-3'>{book.title}</h5>
									{book.authors && book.authors.map((author, index) => (
										<small key={index} className='author-names text-muted text-center'>{author}</small>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		);
	};
}

export default Search;
