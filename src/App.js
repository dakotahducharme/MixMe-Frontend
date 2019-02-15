import React, { Component } from 'react';
import './App.css';
import Hero from './Hero';
import Footer from './Footer';
import Results from './Results';
import Nav from './Nav';
import Artist from './Artist';
import Song from './Song';
import styled from 'styled-components';
import ChooseSongs from './ChooseSongs';
import axios from 'axios';

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
    mixes: [],
    selectedMix: null,
  }

  componentDidMount = () => {
    this.getMixes();
  }

  handleSearchInput = (e) => this.setState({query: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.getArtist(this.state.query);
  }

  setArtists = (artists) => {
    const artistsData = artists.map(artist => ({
      id: artist.id,
      name: artist.name,
    }))
    this.setState(({artists}) => ({artists: artistsData, query: ''}))
  }

  getArtist = async (q) => {
    try {
      await fetch(`${SERVER_URL}/api/spotify/artist?query=${q}`)
        .then(res => {
          res.json().then(data => {
            this.setArtists([...this.state.artists, data])
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

  setRecommendations = (recommendations) => {
    const recommendationData = recommendations.map(recommendation => ({
      id: recommendation.id,
      name: recommendation.name,
      artists: recommendation.artists.map(artist => artist.name).join(', '),
      artwork: recommendation.album.images[0].url,
    }));
    this.setState({songs: recommendationData});
  }

  getRecommendations = async () => {
    try{
      await fetch(`${SERVER_URL}/api/spotify/recommendations?artists=${this.seedArtists()}`)
      .then(res => {
        res.json().then(data => {
          this.setRecommendations(data.tracks);
        }).catch(err => console.log(err))
      })
    }catch(err){
      return err;
    }
  }

  createMix = async () => {
    const { artists, songs } = this.state;
    try{
      await axios.post(`${SERVER_URL}/api/mixes`, { artists, songs })
      .then(res => {
        console.log(res)
        this.getMixes();
      }
      ).catch(err => console.log(err))
    }catch(err){
      return err;
    }
  }

  getMixes = async() => {
    await fetch(`${SERVER_URL}/api/mixes/`)
    .then( res => {
      console.log('here', res)
      res.json().then(data => {
        console.log(data)
        this.setState(() => ({mixes: data}));
      }).catch(err => console.log(err))
    }
    )
  }

  openMix = (mix) => {
    this.setState({selectedMix: mix})
  }

  renderArtists = (artists) => {
    return artists.map(artist => <Artist key={artist.id} {...artist}/>)
  }

  deleteMix = async(id) => {
    await axios.delete(`${SERVER_URL}/api/mixes/${id}`).then(() => {
      console.log('deleted')
      this.getMixes()
    }).catch(err => console.log(err))
  }

  render() {
    const { artists, songs, mixes, selectedMix } = this.state;
    console.log(selectedMix);
    return (
      <AppContainer>
        <Nav mixes={mixes} openMix={this.openMix}/>
        <ContentContainer>
          <Hero />
          {selectedMix && (
            <div>
              <p>MIX</p>
              <button onClick={() => this.deleteMix(selectedMix._id)}>delete</button>
              {this.renderArtists(selectedMix.artists)}
              <Results songs={selectedMix.songs}/>
            </div>
          )}
          {!selectedMix && (
            <div>
              <ChooseSongs onChange={this.handleSearchInput} onSubmit={this.handleSubmit} value={this.state.query}/>
              {this.renderArtists(artists)}
              {artists.length > 0 && <button onClick={this.getRecommendations}>go</button>}
              {songs.length > 0 && <button onClick={this.createMix}>save mix</button>}
              <Results songs={songs}/>
            </div>
          )}
        </ContentContainer>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
