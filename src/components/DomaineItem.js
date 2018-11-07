import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import domaineDefault from '../images/domaine-default.jpg';
import './DomaineItem.css'

const DomaineItem = ({ _id: id, name, createdAt, picture, address }) => {
  return (
    <div className="card card-domaine text-center">
      <div className='card-illustration'>
	<img src={picture || domaineDefault} alt="Card wine" />
      </div>
      <div className="card-body">
	<h5 className="card-title">{name}</h5>
	<p className="card-text"><small className="text-muted">{moment(createdAt).fromNow()}</small></p>
	<Link to={`/domaines/${id}`} className='btn btn-secondary'>More detail</Link>
      </div>
    </div>
  )
};

export default DomaineItem;
