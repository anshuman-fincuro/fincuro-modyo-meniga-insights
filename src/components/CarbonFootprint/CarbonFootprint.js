import React, { Component } from "react";
import { connect } from "react-redux";

import "./../../App.css";
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
      { (this.props.token !== null && this.props.categoriesData.length !== 0 && this.props.spendingData.length !== 0) ? 
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', marginLeft: '150px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '50px' }}>
            <div className={Styles.FirstColumn}> 
                <div style={{ fontSize: '15px', color: '#4B286D', opacity: '0.7', fontWeight: 'bold', padding: '20px', paddingBottom: 0 }}> Carbon Footprint </div>       
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
            <div style={{ marginTop: '50px' }}>
              <select style={{ fontSize: '16px' }} value={this.state.monthSelected} onChange={this.handleMonthDropdownChange}>
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
            <div style={{ marginTop: '50px', marginLeft: '25px' }}>
              <select style={{ fontSize: '16px' }} value={this.state.yearSelected} onChange={this.handleYearDropdownChange}>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        
          <div>
            <div className={Styles.SecondColumn} style={{ marginTop: '50px' }}> 
            <div style={{ fontSize: '20px', color: '#4B286D', fontWeight: 'bold', padding: '20px', paddingBottom: 0 }}> Footprint Over Time </div>   
            <div style={{ fontSize: '15px', color: '#4B286D', fontWeight: 'bold', padding: '20px', paddingBottom: 0 }}> 75% reduction from the previous period </div>           
              <LineCharts spendingData={this.props.spendingData} />     
            </div>
          </div>
          <div className={Styles.Line} />
          <div>
            <div className={Styles.SecondColumn}> 
              <div style={{ fontSize: '20px', color: '#4B286D', fontWeight: 'bold', padding: '20px', paddingBottom: 0 }}> Footprint By Category </div>   
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