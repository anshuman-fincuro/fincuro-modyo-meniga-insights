import React, { Component } from "react";
import { connect } from "react-redux";
import { SpinningCircles } from "react-loading-icons";

import "./../../App.css";
import './../../style/Base.css';
import Styles from './CarbonFootprint.module.css';
import Carousel, { CarouselItem } from "./Carousel/Carousel";

import HorizontalBar from "./Charts/HorizontalBar";
import ProgressBars from "./Charts/ProgressBars";
import LineCharts from "./Charts/LineCharts";

import { setCategoriesData, setSpendingData } from "./../../store/actions/component-action";

class CarbonFootprint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      monthSelected: 'January',
      yearSelected: '2022'
    };

    this.handleMonthDropdownChange = this.handleMonthDropdownChange.bind(this);
    this.handleYearDropdownChange = this.handleYearDropdownChange.bind(this);
  }

  async handleMonthDropdownChange(e) {
    this.setState({
      monthSelected: e.target.value
    })
  }

  async handleYearDropdownChange(e) {
    this.setState({
      yearSelected: e.target.value
    })
  }

  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.token !== this.props.token) {
      await Promise.all(
        [ 
          this.props.setCategories(this.props.token),
          this.props.setSpending(this.props.token)
        ]
      );
    }
  }


  render() {
    return (
      <div className="wrapper-carbonFootprint">
        <h2>Carbon Footprint</h2>
      { (this.props.token !== null && this.props.categoriesData.length !== 0 && this.props.spendingData.length !== 0) ? 
        <div className="carbonFootprint-wrapper" >
          <div className="carbonFootprint-inner">
            <div className="carbonFootprint-inner-list">    
                <div className="carbonFootprint-inner-item"> Your total footprint this period </div>   
                <div className="carbonFootprint-inner-item"> is </div>   
                <div className="carbonFootprint-inner-item"> <span className="text-color">350</span>kg CO2e </div>   
                <div className={Styles.FirstColumnLine} style={{background: `#2c888c`}}/>
                <Carousel>
                  <CarouselItem>It takes 17 trees one year to absorb 350kg of CO2e</CarouselItem>
                  <CarouselItem>Equal to driving a mid-sized petrol-fueled car 1,094 km</CarouselItem>
                  <CarouselItem>That equals about 1 round-trip flight/s from Keflavik to Copenhagen</CarouselItem>
                  <CarouselItem>That equals about 1 round-trip flight/s from Keflavik to New York</CarouselItem>
                </Carousel>
            </div>
            <div className="carbonFootprint-date-calender">
              <div className="carbonFootprint-calenderMonth">
                <select value={this.state.monthSelected} onChange={this.handleMonthDropdownChange}>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div className="carbonFootprint-calenderYear" >
                <select  value={this.state.yearSelected} onChange={this.handleYearDropdownChange}>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
           
          </div>
        {/*  */}
          <div className="footprint-lineChart">
            <div className={Styles.SecondColumn}> 
            <h3 className="footprint-lineChart-item"> Footprint Over Time </h3>   
            <h4 className="footprint-lineChart-item"><span className="text-big">75%</span> reduction from the previous period </h4>           
              <LineCharts spendingData={this.props.spendingData} />     
            </div>
          </div>
          {/*  */}
          <div className={Styles.Line} />
          <div className="footprint-horizontalBar">
            <div className={Styles.SecondColumn}> 
              <h3 className="footprint-item-horizontalBar"> Footprint By Category </h3>   
              <HorizontalBar spendingData={this.props.spendingData} categoriesData={this.props.categoriesData}  />
            </div>
          </div>
          <div className={Styles.Line} />
          <ProgressBars spendingData={this.props.spendingData} categoriesData={this.props.categoriesData} />
        </div>
        : 
        <SpinningCircles/> 
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.authReducer.token,
  categoriesData: state.componentReducer.categoriesData,
  spendingData: state.componentReducer.spendingData
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (token) => dispatch(setCategoriesData(token)),
    setSpending: (token) => dispatch(setSpendingData(token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarbonFootprint);