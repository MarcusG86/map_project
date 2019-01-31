import React, { Component } from 'react';

class SideBar extends Component {
  componentDidMount() {

  }

  render () {
    return (
      <div id="sidebar">
        <input type="text" aria-label="Enter search text" placeholder="Filter content..." value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
        <br/>
        {
          this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue, index) => (
            <div role="button" aria-label="{venue.name}" key={index} className="venue-item" onClick={() => { this.props.listItemClick(venue) }}>
              {venue.name}
            </div>
          ))
        }
      </div>
    );
  }
}


export default SideBar
