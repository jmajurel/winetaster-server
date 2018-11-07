import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import defaultWineImg from '../images/defaultWineImg.png';
import moment from 'moment';

class WineItem extends Component {
  render() {
    const { image, name, type, price, age, alcohol, createdAt } = this.props.wine;
    return (
      <div className="card">
        <div className='card-illustration'>
	  <img src={image || defaultWineImg} alt="Card wine" />
	</div>
	<div className="card-body">
	  <h5 className="card-title">{name}</h5>
	  <p className="card-text">Type: {type}</p>
	  <p className="card-text">Price: {price} $</p>
	  {age && (
	    <p className="card-text">Age: {age}</p>
	  )}
	  {alcohol && (
	      <p className="card-text">Alcohol: {alcohol}</p>
	  )}
	  <p className="card-text"><small className="text-muted">{moment(createdAt).fromNow()}</small></p>
	  <Link to={`/wines/${this.props.wine._id}`} className='btn btn-secondary'>More detail</Link>
	</div>
      </div>
    );
  }
}

export default WineItem;
