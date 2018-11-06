import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneDomaine } from '../store/actions/domaines';
import './DomaineDetail.css';
import domaineDefault from '../images/domaine-default.jpg';
import MapComponent from '../components/MapComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class DomaineDetail extends Component {

  componentWillMount() {
    this.props.fetchOneDomaine(this.props.match.params.id);
  }

  render() {
    
    const { selectedDomaine } = this.props;
    const { name, description, picture, address, lat, lng } = selectedDomaine;
    return (
      <div className='domaine-card'>
        <div className='illustration'>
	  <img src={picture || domaineDefault} alt={name}/>
	</div>
        <h2>Domaine {name}</h2>
	{ address  && ( 
	    <p>Address: <em>{address}</em></p>
	)}
	<p>{description}</p>
	<Link 
	  id='updateDomaine' 
	  className='btn btn-warning edit' 
	  to='/updateDomaine'>
          <FontAwesomeIcon icon={faPencilAlt}/>
	</Link>
	{(lat && lng) && (
	  <MapComponent 
	    lat={lat}
	    lng={lng}
	    isMarkerShown
	    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPKEY}&libraries=geometry,drawing,places`}
	    loadingElement={<div style={{ height: `100%` }} />}
	    containerElement={<div style={{ height: `400px` }} />}
	    mapElement={<div style={{ height: `100%` }} />}
	  /> 
	)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedDomaine: state.domaines.selectedDomaine
  };
}

export default connect(mapStateToProps, { fetchOneDomaine })(DomaineDetail);
