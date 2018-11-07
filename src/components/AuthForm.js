import React, { Component } from 'react';
import './AuthForm.css';

export default class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      profileImageUrl: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { authType } = this.props;
    this.props.onAuth(authType.toLowerCase(), this.state).then(() => {
      this.props.history.push('/');
    }).catch(() => {return});
  }

  handleUpdate = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { username, email, password, profileImageUrl } = this.state;
    const { authType, errors, history, deleteError } = this.props;
    history.listen(() => {
      deleteError(); 
    });

    return (
      <form onSubmit={this.handleSubmit}>
      {errors.message && (
	<div className='alert alert-danger'>{errors.message}</div>
      )}
      { authType ==='signup' && (
	<div className='form-group'>
	  <label forhtml='username'>Username</label>
	  <input 
	    className='form-control'
	    id='username' 
	    name='username' 
	    placeholder='tom'
	    required
	    type='text'
	    value={username}
            onChange={this.handleUpdate}
	    />
	</div>
      )}
	<div className='form-group'>
	  <label forhtml='email'>Email</label>
	  <input 
	    id='email' 
	    name='email' 
	    className='form-control'
	    required
	    placeholder='tom@gmail.com'
	    type='email'
	    value={email}
            onChange={this.handleUpdate}
	    />
	</div>
	<div className='form-group'>
	  <label forhtml='password'>Password</label>
	  <input 
	    id='password' 
	    name='password' 
	    className='form-control'
	    required
	    placeholder='password'
	    type='password'
	    value={password}
            onChange={this.handleUpdate}
	    />
	</div>
	{ authType === 'signup' && <div className='form-group'>
	  <label forhtml='profileImageUrl'>Profile Image</label>
	  <input 
	    id='profileImageUrl' 
	    name='profileImageUrl' 
	    className='form-control'
	    placeholder='url'
	    type='url'
	    value={profileImageUrl}
            onChange={this.handleUpdate}
	    />
	</div>
	}
	<input 
	  className={authType === 'signup' ? 'btn btn-success btn-lg' : 'btn btn-primary btn-lg'} 
	  type='submit' 
	  value={authType} />
      </form>
    );
  }
}
