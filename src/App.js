import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import SearchResults from './components/SearchResults/SearchResults';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <SearchResults searchQuery={this.state.searchQuery} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
