import React, { Component } from "react";
import "./../style/Base.css";
import "./../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class CarouselNew extends Component {
  render() {
    return (
      <div className="carousel-warapper">
          <Carousel autoPlay infiniteLoop showArrows={true}>
                <div className="carousel-item">
                <div><h2>Alerts Carousel1</h2></div>
                </div>
                <div className="carousel-item">
                <div><h2>Alerts Carousel2</h2></div>
                </div>
                <div className="carousel-item">
                <div><h2>Alerts Carousel3</h2></div>
                </div>
                <div className="carousel-item">
                <div><h2>Alerts Carousel4</h2></div>
                </div>
            </Carousel>
      </div>
    );
  }
}

export default CarouselNew;
