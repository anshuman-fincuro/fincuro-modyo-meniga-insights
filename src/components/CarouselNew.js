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
                  <h3>Low balance: Only $1,246 in your savings account</h3>
                </div>
                <div className="carousel-child">
                  <h3>You’ve spent 10% more so far this month on games than average</h3>
                </div>
                <div className="carousel-child">
                  <h3>Lending rate has been increased by 60 basis points, impacting your mortgage loan tenure</h3>
                </div>
            </Carousel>
      </div>
    );
  }
}

export default CarouselNew;
