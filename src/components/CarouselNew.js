import React, { Component } from "react";
import "./../style/Base.css";
import "./../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class CarouselNew extends Component {
  render() {
    return (
      <div className="carousel-wrapper">
          <Carousel autoPlay infiniteLoop showArrows={true}>
                <div className="carousel-child">
                  <h2>Alerts Carousel 1</h2>
                </div>
                <div className="carousel-child">
                  <h2>Alerts Carousel 2</h2>
                </div>
                <div className="carousel-child">
                  <h2>Alerts Carousel 3</h2>
                </div>
                <div className="carousel-child">
                  <h2>Alerts Carousel 4</h2>
                </div>
            </Carousel>
      </div>
    );
  }
}

export default CarouselNew;
