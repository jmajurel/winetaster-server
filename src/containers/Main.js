import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import AuthForm from '../components/AuthForm';
import DomaineForm from '../components/DomaineForm';
import { authUser } from '../store/actions/auths';
import { postWine, putWine } from '../store/actions/wines';
import { putDomaine } from '../store/actions/domaines';
import { deleteError } from '../store/actions/errors';
import WineDetail from './WineDetail';
import DomaineDetail from './DomaineDetail';
import WineForm from '../components/WineForm';
import WineBar from './WineBar';
import Domaines from './Domaines';

class Main extends Component {

  render(){

    const { 
      selectedWine, 
      selectedDomaine, 
      authUser, 
      postWine, 
      putWine, 
      putDomaine, 
      errors, 
      deleteError, 
      users } = this.props;

    return (
      <div className='Main'>
        <Switch>
	  <Route exact path='/' render={props => (
	    <HomePage currentUser={users} />
	  )}/>
	  <Route exact path='/wines' component={WineBar} />
	  <Route exact path='/domaines' component={Domaines} />
	  <Route exact path='/wines/:id' render={ props => (
	    <WineDetail {...props} /> 
	  )} />
	  <Route exact path='/domaines/:id' render={ props => (
	    <DomaineDetail {...props} /> 
	  )} />
	  <Route exact path='/addWine' render={ props => (
	    <WineForm 
	      type='create'
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
	  <Route exact path='/updateDomaine' render={ props => (
	    <DomaineForm 
	      domaine={selectedDomaine}
	      onSubmit={putDomaine} 
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
    selectedWine: state.wines.selectedWine,
    selectedDomaine: state.domaines.selectedDomaine
  }
}

export default withRouter(connect(mapStateToProps, { 
  authUser, 
  postWine, 
  putWine, 
  putDomaine,
  deleteError 
})(Main));
