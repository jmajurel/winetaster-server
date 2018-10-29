import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultWineImg from '../images/defaultWineImg.png';
import { fetchOneWine, deleteWine } from '../store/actions/wines';
import './WineDetailPage.css';

class WineDetailPage extends Component {

  componentWillMount() {
    this.props.fetchOneWine(this.props.match.params.id);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.deleteWine(this.props.currentUser, this.props.selectedWine)
      .then(() => {
	this.props.history.push('/');
      });
  }

  render() {
    const { selectedWine, currentUser } = this.props;
    const { image, name, description, type, price, age, alcohol, domaine, owners } = selectedWine; 

    return (
      <div className='wine-card'>

        <div className='left-card'>
	  <div className='illustration'>
	    <img src={image || defaultWineImg } alt={name} />
	  </div>
	  <h1>{name}</h1>
	  <ul className='caract'>
	    <li>{type} wine</li>
	    <li>Price: {price} $</li>
	    {age && (<li>{age} year old</li>)}
	    {alcohol && (<li>{alcohol}% alcohol</li>)}
	  </ul>
	  <p className='desc'>
	    {description}
	  </p>
	</div>

        <div className='right-card'>

	  <div className='domaine'>
	    <h4>Domaine <span className='domaineName'>{domaine ? domaine.name : 'n/a'}</span></h4>
	  </div>

	  <div className='owners'>
	    <h4>Owners</h4>
	    <ul className='owners-list'>
	      { owners && ( owners.map(owner => (
		<Link className='owners-item' to={`/users/${owner._id}`} key={owner._id}>
		  <img alt={owner.username} src={owner.profileImageUrl} />
		</Link>)))
	      }
	    </ul>
	  </div>
	  <div className='options'>
	    { owners && 
	      currentUser && 
	      owners.find(owner => owner._id === currentUser.id) && 
	      (
	       <form onSubmit={this.handleSubmit}>
	         <Link 
		   id='updateWine' 
		   className='btn btn-warning' 
		   to='/updateWine'>
		   Edit
		 </Link>
	         <input className='btn btn-danger' type='submit' value='Delete'/>
 	       </form>
	      )
	    }
	  </div>
	</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedWine: state.wines.selectedWine,
    currentUser: state.users.user
  };
}

export default connect(mapStateToProps, { fetchOneWine, deleteWine })(WineDetailPage);
