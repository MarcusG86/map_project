//https://www.youtube.com/watch?v=5J6fs_BlVC0&feature=youtu.be
//https://www.youtube.com/watch?v=NVAVLCJwAAo&t=555s

import React, { Component } from 'react';
import './App.css';
import { load_google_maps, load_places } from './utils';
import Map from './components/Map';
import SideBar from './components/SideBar';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    let gmp = load_google_maps();
    let placesPromise = load_places();

    // Load map from google and foursquare venues
    Promise.all([
      gmp,
      placesPromise
    ])
    .then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;

      this.google = google
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        scroolwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      })

      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP
        });

        // Marker Animation
        marker.addListener('click', () => {
          if (marker.getAnimation() !== null) { marker.setAnimation(null); }
          else { marker.setAnimation(google.maps.Animation.BOUNCE); }
          setTimeout(() => { marker.setAnimation(null) }, 1500);
        });
        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(marker.name);
          this.map.setCenter(marker.position);
          this.infowindow.open(this.map, marker);
          this.map.panBy(0, -125);
        });

        this.markers.push(marker);
      });

      this.setState({ filteredVenues: this.venues });
    })

    // Alerts user if no data is retrieved from API
    .catch(error => {
      console.log(error);
      alert('Error loading page...');
    })

  }

  // set Info window and animation for list clicks
  listItemClick = (venue) => {
    let marker = this.markers.filter(m => m.id === venue.id)[0];
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) { marker.setAnimation(null); }
    else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
    setTimeout(() => { marker.setAnimation(null) }, 1500);
  }

  // Gives all the venues where the name includes
  // the query
  filterVenues = (query) => {
    let f = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ? marker.setVisible(true) :
      marker.setVisible(false);
    });

    this.setState({ filteredVenues: f, query });
  }


  render () {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div id="mobile">
        <SideBar
          filterVenues={this.filterVenues}
          filteredVenues={this.state.filteredVenues}
          listItemClick={this.listItemClick} />
        <Map />
        </div>
      </div>
    );
  }
}

export default App;
