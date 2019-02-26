import queryString from 'query-string';
import React, {Component} from 'react'
import { getTrackAnalysis, goAuth } from "../spotifyEndpoints";
import {makeOnSpotifyWebPlaybackSDKReady} from "../onSpotifyWebPlaybackSDKReady";
import SimpleBars from "../SimpleBars";
import Button from '../Button';

class Home extends Component {
    state =  {};
    async componentDidMount() {
        let token;
        if (window.location.hash) {
            const parsedHash = queryString.parse(location.hash);
            if (parsedHash.access_token) {
                token = parsedHash.access_token;
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpires', Date.now() + parsedHash.expires_in * 1000);
                history.pushState("", document.title, window.location.pathname + window.location.search)
            }
        } else {
            token = localStorage.getItem('token');
            const expires = new Date(localStorage.getItem('tokenExpires'));
            if (token && expires < Date.now()) {
                localStorage.clear();
                token = null;
            }
        }
        if (token) {
            this.setState({ token });
            window.onSpotifyWebPlaybackSDKReady = makeOnSpotifyWebPlaybackSDKReady(token, (player) => {
                player.addListener('player_state_changed',
                    async () => {
                        !this.loaded && this.pollIdAndPosition(player, token);
                        this.loaded = true;
                    });
                this.setState({ player })
            });
        } else {
            window.onSpotifyWebPlaybackSDKReady = function () {
                
            }
        }
    }

    pollIdAndPosition(player, token) {
        player.getCurrentState().then(async ({paused, position, track_window: {current_track: {id, name, album: { images }}}}) => {
            let segment = this.state.analysis && this.state.analysis.segments.find(({ start }) => start >= position/1000);
            if (this.state.id !== id) {
                const image = images && images.length && images[images.length - 1];
                let imageUrl = image && image.url;
                this.setState({ imageUrl, name });
                const analysis = await getTrackAnalysis(token, id);
                this.setState({ analysis });
            }
            this.setState({position: Math.floor(position/1000), id, segment}, () => {
                setTimeout(() => {
                    this.pollIdAndPosition(player, token)
                }, 100);
            });
        });
    }

    render() {
        const { token, segment, position } = this.state;
        return (
            <div className="container">
                <script src="https://sdk.scdn.co/spotify-player.js"></script>
                { token ? segment ?
                    <div className="bars">
                        <h4>Play the song to make the bars come alive</h4>
                        <div style={{ width: "100%"}}>
                            <SimpleBars segment={segment}/>
                        </div>
                        <h3>{this.state.name}</h3>
                        <img className="img" alt=""
                             src={this.state.imageUrl}
                             xstyle={{
                                 transform: `rotate(${Math.abs(segment.timbre[0] % 360)}deg)`,
                                 transitionDuration: `${segment.duration * 1000}ms`
                             }}/>
                    </div>:
                    "Connect to Your Player Using The Spotify App" :
                    <Button onClick={goAuth}>Login</Button>
                }
                { /*language=CSS*/ }
                <style jsx>{`
                    .bars {
                      width: 75%;
                      min-width: 400px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      flex-direction: column;
                    }
                    .container {
                      width: 100%;
                      height: 100vh;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                    .img {
                        padding-top: 1em;
                        object-fit: contain;
                        border-radius: 4px;
                        transition: all;
                        width: 200px;
                        height: 200px;
                    }
                    .
                `}</style>
                { /*language=CSS*/ }
                <style jsx global>{`
                    body {
                      font-family: sans-serif;
                    }
                `}</style>
            </div>
        )
    }
}

export default Home