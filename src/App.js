import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { setAuthToken } from './store/actions/auth-action';
import AccountDropdown from './components/AccountDropdown';
import BugdetOverview from './components/BugdetOverview';
import CarouselNew from './components/CarouselNew';
import BubbleGraphs from './components/Insights/Charts/BubbleGraphs'
// import BarCharts from "./Charts/BarCharts";
// import BubbleGraphs from "./../../Charts/BubbleGraphs";
// import HorizontalBar from './components/CarbonFootprint/Charts/HorizontalBar'
// // import ProgressBars from './components/Insights/Charts/ProgressBars';
// //  import Insights from './components/Insights/Insights';
// //  import CarbonFootprint from './components/CarbonFootprint/CarbonFootprint';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.props.setAuth();
  }

  render() {
    return (
      <div>
        <div className='account-top-bar'>
        <AccountDropdown></AccountDropdown>
        </div>
      {/* account bar end */}
      <CarouselNew></CarouselNew>
      <div className='budget-detail-wrap'>
      <div className='budget-container'>
      <BugdetOverview></BugdetOverview>
        </div>
        {/*  */}
        <div className='unpayed-bill-wrap'>
        <span className='bold'>unpayed bill in next 30 days 12345</span>
        </div>
        {/*  */}
         <div className='budget-container'>
         <BugdetOverview></BugdetOverview>
        </div>
      </div>
      {/* <HorizontalBar spendingData={this.props.spendingData} categoriesData={this.props.categoriesData}  /> */}
      <BubbleGraphs></BubbleGraphs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuthToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
