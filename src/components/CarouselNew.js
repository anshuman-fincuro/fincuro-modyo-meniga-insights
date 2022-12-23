import React, { Component } from "react";
import "./../style/Base.css";
import "./../App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { setFeedData } from "../store/actions/component-action";
import { connect } from "react-redux";

class CarouselNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodFrom: null,
      periodTo: null,
      title:[],
    };
  }
  componentDidMount(){
    this.props.setFeedData(this.props.token);    
  }
  render() {
    return (
      <div className="carousel-wrapper">
        {(this.props.feedData !== undefined) && 
          <Carousel autoPlay infiniteLoop showArrows={true}>
            {this.props.feedData.map((value) => (
                 <div className="carousel-child">             
                 <h3>{value.title}</h3>
                 <p>{value.body}</p>
               </div>
            ))}       
            </Carousel>
  }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  feedData: state.componentReducer.feedData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setFeedData: (token, value) => dispatch(setFeedData(token, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarouselNew);
