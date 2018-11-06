import React, { Component } from 'react';

class Domaine extends Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.domaine }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state._id, this.state)
      .then(this.props.history.goBack());
  }

  handleUpdate = e => {
    this.setState({[e.target.name] : [e.target.value]});
  }

  render() {
    const { name, address, description, picture } = this.state;
    const { errors } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
	{ errors.message && (
	  <div className='alert alert-danger'>{errors.message}</div>
	)}

	<div className='form-group'>
	  <label forhtml='name'>Name</label>
	  <input
	    className='form-control'
	    id='name'
	    name='name'
	    type='text'
	    required
	    value={name}
	    onChange={this.handleUpdate}
	    />
	</div>

	<div className='form-group'>
	  <label forhtml='address'>Address</label>
	  <input
	    className='form-control'
	    id='address'
	    name='address'
	    type='text'
	    required
	    value={address || ''}
	    onChange={this.handleUpdate}
	    />
	</div>

	<div className='form-group'>
	  <label forhtml='picture'>Picture</label>
	  <input
	    className='form-control'
	    id='picture'
	    name='picture'
	    type='url'
	    value={picture || ''}
	    onChange={this.handleUpdate}
	    />
	</div>

	<div className='form-group'>
	  <label forhtml='description'></label>
	  <textarea
	    className='form-control'
	    id='description'
	    name='description'
	    rows='5'
	    value={description || ''}
	    onChange={this.handleUpdate}
	  />
	</div>
	<input
	  className='btn btn-success btn-lg'
	  type='submit'
	  value='Update'
	/>
      </form>
    );
  }
}

export default Domaine;
