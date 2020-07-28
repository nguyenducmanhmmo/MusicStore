import React, { Component } from "react";
import { searchArtistByName, topTrackOfArtirt } from "./agent";

interface Props {}
interface State {}

export default class MusicStore extends Component<any, any> {
  state = {
    artists: [],
    artistSearch: "",
    artistId: "",
    trackList: [],
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });

  };
  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const artisrtsSearch = await searchArtistByName(this.state.artistSearch);
    this.setState({ artists: artisrtsSearch.artists.items, trackList: [] });
  };
  handleClickArtist = async (id: string) => {
    const trackList = await topTrackOfArtirt(id);

    this.setState({ trackList: trackList.tracks, artistId: id });
  };

  render() {
    return (
      <div className="container">
        <form
          className="mt-4 d-flex justify-content-center"
          style={{ width: "38rem" }}
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="artistSearch"
              value={this.state.artistSearch}
              onChange={this.handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Search your favorite artist
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary align-self-start ml-5"
          >
            Search
          </button>
        </form>

        <div className="grid-container mt-4">
          {this.state.artists.map((artist: any) => (
            <div
              className={
                "card " +
                (this.state.artistId === artist.id ? "bg-warning" : "")
              }
              key={artist.id}
              onClick={() => this.handleClickArtist(artist.id)}
            >
              <img
                className="card-img-top"
                src={artist.images[0]?.url}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{artist.name}</h5>
                <div className="card-text">
                  {artist.genres.map((genre: any, index: number) => (
                    <span className="badge badge-secondary mr-3" key={index}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-footer">
                <button type="button" className="btn btn-primary">
                  Popularity <span className="badge badge-light">9</span>
                  <span className="sr-only">{artist.popularity}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="track-list mt-2">
          {this.state.trackList.map((track: any, index: any) => (
            <div
              className="card bg-dark text-white"
              key={index}
              style={{ width: "21rem" }}
            >
              <img
                className="card-img"
                src={track.album.images[1]?.url}
                width="300"
                height="270"
                alt="Card image"
              />
              <div className="card-img-overlay">
                <h5 className="card-title">{track.album.name}</h5>
                <p className="card-text">{track.album.type}</p>
                <p className="card-text">{track.album.release_date}</p>
                {track.preview_url !== null ? (
                  <audio controls preload="metadata">
                    <source src={track.preview_url} type="audio/ogg" />
                  </audio>
                ) : (
                  <p className="card-text">No Preview URL</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
