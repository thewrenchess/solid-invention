import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noImage from './icons/no-img.svg';

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired,
		shelves: PropTypes.array.isRequired
	};

	render() {
		const { books, onChangeShelf, shelves } = this.props;

		return (
			<div className='row justify-content-around mt-5'>
				{books.map((book) => (
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
										shelf.key === book.shelf
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
		);
	};
}

export default ListBooks;
