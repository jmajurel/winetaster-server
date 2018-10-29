import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auths';
import { postWine, putWine } from '../store/actions/wines';
import { deleteError } from '../store/actions/errors';
import WineDetailPage from './WineDetailPage';
import WineForm from '../components/WineForm';
import WineBar from './WineBar';

class Main extends Component {
  render(){
    const { selectedWine, authUser, postWine, putWine, errors, deleteError, users} = this.props;
    return (
      <div className='Main'>
        <Switch>
	  <Route exact path='/' render={props => (
	    <HomePage currentUser={users} />
	  )}/>
	  <Route exact path='/wines' component={WineBar} />
	  <Route exact path='/wines/:id' render={ props => (
	    <WineDetailPage {...props} /> 
	  )} />
	  <Route exact path='/addWine' render={ props => (
	    <WineForm 
	      type='create'
	      wine={{}}
	      onSubmit={postWine} 
	      currentUser={users.user}
	      errors={errors} 
	      {...props}
	      />
	  )} />
	  <Route exact path='/updateWine' render={ props => (
	    <WineForm 
	      type='update'
	      wine={selectedWine}
	      onSubmit={putWine} 
	      currentUser={users.user}
	      errors={errors} 
	      {...props}
	      />
	  )} />
	  <Route exact path='/user/login' render={ props => (
	    <AuthForm 
	      authType='login' 
	      onAuth={authUser}
	      errors={errors} 
	      deleteError={deleteError}
	      {...props} />
           )} /> 
	  <Route exact path='/user/signup' render={ props => (
	    <AuthForm 
	      authType='signup' 
	      onAuth={authUser}
	      errors={errors} 
	      deleteError={deleteError}
	      {...props} />
	  )} />
	  <Route exact path='/user/logout' render={() => <Redirect to='/' />} />
	</Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    users: state.users,
    selectedWine: state.wines.selectedWine
  }
}

export default withRouter(connect(mapStateToProps, { authUser, postWine, putWine, deleteError })(Main));
