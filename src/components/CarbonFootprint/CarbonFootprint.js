import React, { Component } from "react";
import { connect } from "react-redux";

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
      <div>
        <h2>CarbonFootprint</h2>
      { (this.props.token !== null && this.props.categoriesData.length !== 0 && this.props.spendingData.length !== 0) ? 
        <div className="carbonFootprint-wrapper" >
          <div className="carbonFootprint-inner">
            <div className={Styles.FirstColumn}> 
                <div className="carbonFootprint-small-text" > Carbon Footprint </div>       
                <div className={Styles.FirstColumnTitle}> Your total footprint this period </div>   
                <div className={Styles.FirstColumnTitle}> is </div>   
                <div className={Styles.FirstColumnTitle}> 350kg CO2e </div>   
                <div className={Styles.FirstColumnLine} />
                <Carousel>
                  <CarouselItem>It takes 17 trees one year to absorb 350kg of CO2e</CarouselItem>
                  <CarouselItem>Equal to driving a mid-sized petrol-fueled car 1,094 km</CarouselItem>
                  <CarouselItem>That equals about 1 round-trip flight/s from Keflavik to Copenhagen</CarouselItem>
                  <CarouselItem>That equals about 1 round-trip flight/s from Keflavik to New York</CarouselItem>
                </Carousel>
            </div>
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
        {/*  */}
          <div className="footprint-lineChart">
            <div className={Styles.SecondColumn} style={{ marginTop: '50px' }}> 
            <div className="footprint-lineChart-item"> Footprint Over Time </div>   
            <div className="footprint-lineChart-item"> 75% reduction from the previous period </div>           
              <LineCharts spendingData={this.props.spendingData} />     
            </div>
          </div>
          {/*  */}
          <div className={Styles.Line} />
          <div className="footprint-horizontalBar">
            <div className={Styles.SecondColumn}> 
              <div className="footprint-item-horizontalBar"> Footprint By Category </div>   
              <HorizontalBar spendingData={this.props.spendingData} categoriesData={this.props.categoriesData}  />
            </div>
          </div>
          <div className={Styles.Line} />
          <ProgressBars spendingData={this.props.spendingData} categoriesData={this.props.categoriesData} />
        </div>
        : 
        <div></div> 
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