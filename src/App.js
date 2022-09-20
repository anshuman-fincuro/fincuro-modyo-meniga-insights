import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import "../node_modules/react-bubble-chart/src/style.css";
import { setAuthToken } from './store/actions/auth-action';
import { SpinningCircles } from "react-loading-icons";
import AccountDropdown from './components/AccountDropdown';
import BugdetOverview from './components/BugdetOverview';
import { setCategoriesData, setMerchantData, setPlanningData, setSpendingData } from "./store/actions/component-action";
import CarouselNew from './components/CarouselNew';
import BubbleGraphs from './components/Insights/Charts/BubbleGraphs'
import ProgressBars from './components/Insights/Charts/ProgressBars';
import ProgressBarsExpenses from "./components/CarbonFootprint/Charts/ProgressBars";
import HorizontalBar from './components/CarbonFootprint/Charts/HorizontalBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // progressData: []
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
          this.props.setSpending(this.props.token),
          this.props.setPlanning(this.props.token),
          this.props.setMerchant(this.props.token)
        ]
      );
    }
    
  }
  async componentDidMount() {
    await this.props.setAuth();
    
  }

  render() {
    return (
      <div>
         { (this.props.token !== null && this.props.categoriesData.length !== 0 && this.props.spendingData.length !== 0 && this.props.merchantData.length !==0 && this.props.planningData.length !== 0) ? 
      <div>
        
        <div className='account-top-bar'>
        <AccountDropdown></AccountDropdown>
        </div>
      {/* account bar end */}
      <CarouselNew></CarouselNew>
      <div className='budget-detail-wrap'>
      <div className='budget-container budget-flex'>
      <BugdetOverview></BugdetOverview>
        </div>
        {/*  */}
        <div className='unpayed-bill-wrap budget-flex'>
        <div className='bill-number-text'>5</div>
        <span className='bold bill-content'>Unpayed bill in next 30 days £ 1,209.50</span>
        </div>
        {/*  */}
         <div className='budget-container budget-flex expeses-container'>
         <ProgressBars categoriesData={this.props.categoriesData} spendingData={this.props.spendingData} />
        </div>
      </div>
      {/* end */}
      <div className='merchents-wrap'>
        <div className='merchents-left'>
        <HorizontalBar spendingData={this.props.spendingData} categoriesData={this.props.categoriesData}  />
        <hr/>
       <ProgressBarsExpenses spendingData={this.props.spendingData} categoriesData={this.props.categoriesData} />
        </div>
      <div className='merchents-right'>
      <BubbleGraphs merchantData={this.props.merchantData} />
      </div>
      
      </div>
      </div>
    :
    <SpinningCircles/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  planningData: state.componentReducer.planningData,
  merchantData: state.componentReducer.merchantData,
  categoriesData: state.componentReducer.categoriesData,
  spendingData: state.componentReducer.spendingData
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuthToken()),
    setCategories: (token) => dispatch(setCategoriesData(token)),
    setPlanning: (token) => dispatch(setPlanningData(token)),
    setSpending: (token) => dispatch(setSpendingData(token)),
    setMerchant: (token) => dispatch(setMerchantData(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
