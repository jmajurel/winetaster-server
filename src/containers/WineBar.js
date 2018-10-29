import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchWines } from '../store/actions/wines';
import WineItem from '../components/WineItem';

import './WineBar.css';

class WineBar extends Component {

  componentDidMount() {
    this.props.fetchWines();
  }

  render() {
    const { wines, isAuthenticated } = this.props;
    const wineList = wines.map(wine => (
      <WineItem wine={wine} key={wine._id} />
    ));

    return (
      <div className='WineBar'>
	<div className="card-group">
	  {wineList}
	</div>
	{ isAuthenticated && (
	  <Link id='addWine' className='btn btn-lg btn-block btn-primary' to='/addWine'>Add my wine</Link>
	)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wines: state.wines.wines,
    isAuthenticated: state.users.isAuthenticated
  }
}

export default connect(mapStateToProps, {fetchWines})(WineBar);
