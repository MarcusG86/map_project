import React, {
  Component
} from 'react';

class Header extends Component {
  render() {
    return (
            <header className="topNav">
            <div className="headText">
              <h2 className="headerText" tabIndex={0}>Phoenix, AZ - Shopping Centers</h2>
            </div>    
            </header>
          );
    }
}

export default Header;
