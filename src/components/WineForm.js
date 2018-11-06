import React, { Component } from 'react';

class WineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      type: '',
      price: 0,
      description: '',
      ...this.props.wine,
      domaine: (this.props.wine && this.props.wine.domaine && this.props.wine.domaine.name) || ''
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.props.currentUser, this.state)
      .then(this.props.history.goBack())
  }

  handleUpdate = e => {
    this.setState({[e.target.name] : [e.target.value]});
  }

  render() {
    const { name, image, type, price, domaine, description } = this.state;
    const { errors } = this.props;
    return (
      <form 
        onSubmit={this.handleSubmit}
	autoComplete="off">
	{ errors.message && (
	  <div className='alert alert-danger'>{errors.message}</div>
	)}
	<div className='form-group'>
	  <label forhtml='name'>Name</label>
	  <input 
	    className='form-control'
	    id='name' 
	    name='name' 
	    placeholder='sauvignon Blanc'
	    required
	    type='text'
	    value={name}
	    onChange={this.handleUpdate}
	    />
	</div>
	<div className='form-group'>
	  <label forhtml='type'>Type</label>
	  <input 
	    className='form-control'
	    id='type' 
	    name='type' 
	    placeholder='red'
	    required
	    type='text'
	    value={type}
	    onChange={this.handleUpdate}
	    />
        </div>
	<div className='form-group'>
	  <label forhtml='price'>Price</label>
	  <input 
	    className='form-control'
	    id='price' 
	    name='price' 
	    required
	    min='0'
	    step='0.1'
	    type='number'
	    placeholder='50'
	    value={price}
	    onChange={this.handleUpdate}
	    />
        </div>
	<div className='form-group'>
	  <label forhtml='price'>Domaine</label>
	  <input 
	    className='form-control'
	    id='domaine' 
	    name='domaine' 
	    placeholder='domaine name'
	    type='string'
	    value={domaine}
	    onChange={this.handleUpdate}
	    />
        </div>
	<div className='form-group'>
	  <label forhtml='image'>Image</label>
	  <input 
	    className='form-control'
	    id='image' 
	    name='image' 
	    placeholder='url'
	    required
	    type='string'
	    value={image}
	    onChange={this.handleUpdate}
	    />
        </div>
	<div className='form-group'>
	  <label forhtml='description'>Description</label>
	  <textarea 
	    className='form-control'
	    id='description' 
	    name='description' 
	    rows='5'
	    value={description}
	    onChange={this.handleUpdate}
	    />
        </div>
	<input 
	  className='btn btn-success btn-lg' 
	  type='submit' 
	  value={this.props.type === 'create' ? 'Submit my wine' : 'Update Wine'} />
      </form>
    );
  }
}

export default WineForm;
