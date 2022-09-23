// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import "../node_modules/react-bubble-chart/src/style.css";
import { setAuthToken } from './store/actions/auth-action';
import { SpinningCircles } from "react-loading-icons";
import AccountDropdown from './components/AccountDropdown';
import BugdetOverview from './components/BugdetOverview';
import { setAccountsData, setCategoriesData, setMerchantData, setPlanningData, setSpendingData } from "./store/actions/component-action";
import CarouselNew from './components/CarouselNew';
import BubbleGraphs from './components/Insights/Charts/BubbleGraphs'
import ProgressBars from './components/Insights/Charts/ProgressBars';
import ProgressBarsExpenses from "./components/CarbonFootprint/Charts/ProgressBars";
import HorizontalBar from './components/CarbonFootprint/Charts/HorizontalBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAccount: 0
    };
  }

  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.token !== this.props.token) {
      await Promise.all(
        [ 
          this.props.setAccounts(this.props.token),
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
    var accountDropdownData = this.props.accountsData ?
      this.props.accountsData.filter((acc) => acc.accountCategory!=="Wallet") : [];
    return (
      <div>
         { (this.props.token !== null && this.props.accountsData && this.props.categoriesData && this.props.spendingData && this.props.merchantData && this.props.planningData) ? 
      <div>
         <div id="billingDiv" className='toggleBilling'>
         <h2>Account Summary</h2>
        <div className='account-top-bar'>
        <AccountDropdown accountsData={accountDropdownData} activeAccount={this.state.activeAccount}></AccountDropdown>
        </div>
        <div>
        {/* <BillingTable></BillingTable>
        <BillingFilter></BillingFilter> */}
        </div>
        </div>
      {/* account bar end */}
      <CarouselNew></CarouselNew>
      <div className='budget-detail-wrap'>
      <div className='budget-container budget-flex'>
      <BugdetOverview></BugdetOverview>
        </div>
        {/*  */}
        <div className='budget-detail-wrap budget-flex'>
        <div className='merchents-wrapper'>
        <HorizontalBar spendingData={this.props.spendingData} categoriesData={this.props.categoriesData}  />
        <hr/>
       <ProgressBarsExpenses spendingData={this.props.spendingData} categoriesData={this.props.categoriesData} />
        </div>
        </div>
        {/*  */}
         <div className='budget-container budget-flex expeses-container'>
         <ProgressBars categoriesData={this.props.categoriesData} spendingData={this.props.spendingData} />
        </div>
      </div>
      {/* end */}
      <div className='top-merchents-wrap'>
        <div className='unpayed-bill-wrap '>
        <div className='bill-number-text'>5</div>
        <span className='bold bill-content'>Unpayed bill in next 30 days £ 1,209.50</span>
        </div>
        <div className='bubblegraph-wrapper'>
        <BubbleGraphs merchantData={this.props.merchantData} />
        </div>
      
      </div>
      {/*  */}
     
      </div>
      
    :
    <SpinningCircles/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  accountsData: state.componentReducer.accountsData,
  planningData: state.componentReducer.planningData,
  merchantData: state.componentReducer.merchantData,
  categoriesData: state.componentReducer.categoriesData,
  spendingData: state.componentReducer.spendingData
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuthToken()),
    setAccounts: (token) => dispatch(setAccountsData(token)),
    setCategories: (token) => dispatch(setCategoriesData(token)),
    setPlanning: (token) => dispatch(setPlanningData(token)),
    setSpending: (token) => dispatch(setSpendingData(token)),
    setMerchant: (token) => dispatch(setMerchantData(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
