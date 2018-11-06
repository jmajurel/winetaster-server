import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../images/grapes.svg';
import { logout } from '../store/actions/auths';
import defaultImageProfile from '../images/defaultImageProfile.jpg';

import './NavBar.css';

class NavBar extends Component {

  logout = () =>{
    this.props.logout();
  }

  render() {
    const {isAuthenticated, user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
	<Link className="navbar-brand" to="/">
	  <img width='40px' height='40px' src={Logo} alt='Logo'/>
	</Link>
	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	  <span className="navbar-toggler-icon"></span>
	</button>
	<div className="collapse navbar-collapse justify-content-between" id="navbarNav">
	  <ul className="navbar-nav">
	    <li className="nav-item">
	      <Link className="nav-link" to="/wines">Wine Bar</Link>
	    </li>
	    <li className="nav-item">
	      <Link className="nav-link" to="/domaines">Domaines</Link>
	    </li>
	  </ul>
	    { isAuthenticated ? (
	      <ul className='navbar-nav'>
		<li className="nav-item">
		  <a className='nav-link btn-logout' onClick={this.logout}>Logout</a>
		</li>
		<li className="nav-item">
		  <img className='userProfileImg' alt={user.username} src={user.profileImageUrl || defaultImageProfile} />
		</li>
	      </ul>
	      ):(
	      <ul className='navbar-nav'>
		<li className="nav-item">
		  <Link className="nav-link" to="/user/login">Login</Link>
		</li>
		<li className="nav-item">
		  <Link className="nav-link" to="/user/signup">Sign Up</Link>
		</li>
	      </ul>
	    )}
	</div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    user: state.users.user
  }
}

export default connect(mapStateToProps, {logout})(NavBar);
