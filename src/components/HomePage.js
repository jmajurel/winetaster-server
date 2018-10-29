import React from 'react';
import { Link } from 'react-router-dom';
import FirstSlideImg from '../images/first-slide-img.jpg';
import SecondSlideImg from '../images/second-slide-img.jpg';
import ThirdSlideImg from '../images/third-slide-img.jpg';
import './HomePage.css';

const HomePage = props => {
  const { currentUser } = props;
  return (
  <div>
      {!currentUser.isAuthenticated ? (
        <div className='intro'>
	  <h1>Welcome to the Wine taster</h1>
	  <p>Good place to share your wine experience</p>
	  <Link className='btn btn-success btn-lg' to='/user/signup'>Wanna Join us</Link>
	</div>
      ): (
        <div className='intro'>
	  <h1>Welcome back <span className='username'>{currentUser.user.username}</span></h1>
	  <p>Good place to share your wine experience</p>
	</div>
      )}
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
      <div className="carousel-inner">
	<div className="carousel-item active">
	  <img className="d-block w-100" src={FirstSlideImg} alt="First slide" />
	</div>
	<div className="carousel-item">
	  <img className="d-block w-100" src={SecondSlideImg} alt="Second slide" />
	</div>
	<div className="carousel-item">
	  <img className="d-block w-100" src={ThirdSlideImg} alt="Third slide" />
	</div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
	<span className="carousel-control-prev-icon" aria-hidden="true"></span>
	<span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
	<span className="carousel-control-next-icon" aria-hidden="true"></span>
	<span className="sr-only">Next</span>
      </a>
    </div>
  </div>
)};

export default HomePage;

