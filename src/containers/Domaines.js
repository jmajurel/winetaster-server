import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { fetchDomaines } from '../store/actions/domaines'
import DomaineItem from '../components/DomaineItem';

class Domaines extends Component {

  componentWillMount() {
    this.props.fetchDomaines();
  }

  render() {
    const { domaines } = this.props;
    let domaineList = domaines.map(domaine => (
      <DomaineItem 
	key={domaine._id} 
	{...domaine} 
      />
    ));
    return (
      <div className='DomainesPage card-columns'>
	{domaineList}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    domaines: state.domaines.domaines
  }
}
export default connect(mapStateToProps, { fetchDomaines })(Domaines);
