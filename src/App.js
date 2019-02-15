import React, { Component } from 'react';
import './App.css';
import Hero from './Hero'
import Footer from './Footer'
import Results from './Results'
import Nav from './Nav'
import Artist from './Artist'
import Song from './Song'
import styled from 'styled-components'
import ChooseSongs from './ChooseSongs'

const SERVER_URL = 'http://localhost:5000'

// debugger;
const AppContainer = styled.div`
  text-align: center;
  color: white;
  min-height: 100vh;
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`
const ContentContainer = styled.div`
  flex-grow: 2;
`


class App extends Component {
  state = {
    songs: [],
    artists: [],
    query: '',
  }

  handleSearchInput = (e) => this.setState({query: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.getArtist(this.state.query);
  }

  getArtist = async (q) => {
    try {
      await fetch(`${SERVER_URL}/api/spotify/artist?query=${q}`)
        .then(res => {
          res.json().then(data => {
            this.setState(({artists}) => ({artists: [...artists, data], query: ''}))
          }).catch(err => console.log(err))
        }
      )
    } catch (error){
      return error;
      console.log(error, "THERE'S AN ERROR")
    }
  }

  seedArtists = () => {
    const { artists } = this.state;
    return artists.map(artist => artist.id).join(',')
  }

  getRecommendations = async () => {
    try{
      await fetch(`${SERVER_URL}/api/spotify/recommendations?artists=${this.seedArtists()}`)
      .then(res => {
        res.json().then(data => {
          console.log(data.tracks[0])
          this.setState(() => ({songs: data.tracks}));
        }).catch(err => console.log(err))
      })
    }catch(err){
      return err;
    }
  }

  createMix = async () => {
    const { artists, songs } = this.state;
    try{
      await fetch(`${SERVER_URL}/api/mixes`, {
        method: "POST",
        body: { artists, songs }
      }).then(
        res => console.log(res)
      ).catch(err => console.log(err))
    }catch(err){
      return err;
    }
  }


  render() {
    const { artists, songs } = this.state;
    return (
      <AppContainer>
        <Nav />
        <ContentContainer>
          <Hero />
          <ChooseSongs onChange={this.handleSearchInput} onSubmit={this.handleSubmit} value={this.state.query}/>
          {artists.map(artist => <Artist key={artist.id} {...artist}/>)}
          {artists.length > 0 && <button onClick={this.getRecommendations}>go</button>}

          {songs.length > 0 && <button onClick={this.createMix}>save mix</button>}

          <Results songs={songs}/>
        </ContentContainer>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
