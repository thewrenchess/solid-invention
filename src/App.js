import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';
import logo from './icons/i-read-icon.svg';

class App extends Component {
	state = {
		books: []
	};

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

  	render() {
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
      					<ListBooks
      						books = {this.state.books}
      					/>
      				)}/>
              <Route path='/search' render={() => (
                <Search/>
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