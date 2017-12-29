import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>Home</div>
        <div><Link to="/about">About</Link></div>
        <div><Link to="/help">Help</Link></div>
      </div>
    );
  }
}

export default Home;
