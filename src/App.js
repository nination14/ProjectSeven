import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import apiKey from './config.js';
// Import components below:
import Header from './Components/Header';
import Gallery from './Components/Gallery';
import NotFound from './Components/NotFound';
import Nav from './Components/Nav';
import Search from './Components/Search';
// properties of component
class App extends Component {
  state = {
    loading: true,
    searchTerm: "",
    results: [],
    dogsResults: [],
    natureResults: [],
    soccerResults: []
  };

  // After navigation tabs are mounted get api requests
  componentDidMount() {
    this.performSearch('dogs')
    this.performSearch('nature')
    this.performSearch('soccer')
  }


  performSearch = (query = 'searchTerm') => {
    this.setState({
      loading: true,
      results: [],
      searchTerm: query
    });
    //fetch url
    fetch( 
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`
    )
      .then(response => response.json())
      .then(responseData => {
        // this will update the photos based on tab or query selected
        if (query === 'dogs') {
          this.setState({
            dogsResults: responseData.photos.photo,
            searchTerm: query,
            loading: false
          });
        } else if (query === 'nature') {
          this.setState({
            natureResults: responseData.photos.photo,
            searchTerm:query,
            loading: false
          });
        } else if (query === 'soccer') {
          this.setState({
            soccerResults: responseData.photos.photo,
            searchTerm:query,
            loading: false
          });
        } else {
          this.setState({
            results: responseData.photos.photo,
            searchTerm: query,
            loading: false
          });
        }
      })
      .catch(error => console.log("Error fetching or parsing data", error));
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Search onSearch={this.performSearch} />
          <Nav />
          <Header newSearch={this.performSearch} />
          {/*switch will redirect path*/}
          <Switch>
            
            <Route exact path="/" render={(props) =>
              <Redirect to='/dogs' />
            } />

            <Route exact path="/dogs" render={(props) =>
              (this.state.loading)
                ? <p>Loading...</p>
                : <Gallery pictures={this.state.dogsResults} query='dogs' {...props} />
            } />
            <Route exact path="/nature" render={(props) =>
              (this.state.loading)
                ? <p>Loading...</p>
                : <Gallery pictures={this.state.natureResults} query='nature' {...props} />
            } />
            <Route exact path="/soccer" render={(props) =>
              (this.state.loading)
                ? <p>Loading...</p>
                : <Gallery pictures={this.state.soccerResults} query='soccer' {...props} />
            } />

            {/*search queries route */}
            <Route path="/:searchTerm" exact component={(props) => { 
              /* how to make this work*/
              const searchTerm = props.match.params.searchTerm;
              if(searchTerm !== this.state.searchTerm) {
                this.performSearch(searchTerm);
              }
              return(
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Gallery pictures={this.state.results} query={searchTerm} {...props} />);
               
            }} />
            
            

            {/* 404 error route */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;