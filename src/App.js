import React, { Component } from 'react';
import './App.css';
import Hero from './Hero'
import Footer from './Footer'
import Results from './Results'
import Nav from './Nav'
import Artist from './Artist'

import ChooseSongs from './ChooseSongs'

const SERVER_URL = 'http://localhost:5000'

// debugger;


class App extends Component {
  state = {
    songList: [],
    query: '',
  }

  handleSearchInput = (e) => this.setState({query: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.getArtist(this.state.query);
    console.log('it works', this.state.query)
  }

  getArtist = async (q) => {
    try {
      const artist = await fetch(`${SERVER_URL}/api/spotify/artist?query=${q}`)
      console.log(artist);
    } catch (error){
      return error;
      console.log(error, "THERE'S AN ERROR")
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Hero />
        <ChooseSongs onChange={this.handleSearchInput} onSubmit={this.handleSubmit} value={this.state.query}/>
        <Artist />
        <Results />
        <Footer />
      </div>
    );
  }
}

export default App;
