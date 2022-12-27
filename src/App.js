// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import "../node_modules/react-bubble-chart/src/style.css";
import { setAuthToken } from './store/actions/auth-action';
import { SpinningCircles } from "react-loading-icons";
import AccountDropdown from './components/AccountDropdown';
import BugdetOverview from './components/BugdetOverview';
import { setAccountsData, setCategoriesData, setFeedData, setMerchantData, setPlanningData, setSpendingData, setBillData} from "./store/actions/component-action";
import CarouselNew from './components/CarouselNew';
// import BubbleGraphs from './components/Insights/Charts/BubbleGraphs'
import ProgressBars from './components/Insights/Charts/ProgressBars';
import ProgressBarsExpenses from "./components/CarbonFootprint/Charts/ProgressBars";
import HorizontalBar from './components/CarbonFootprint/Charts/HorizontalBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidUpdate(previousProps, previousState) {
    if (previousProps.token !== this.props.token) {
      await Promise.all(
        [ 
          this.props.setAccounts(this.props.token),
          this.props.setCategories(this.props.token),
          this.props.setSpending(this.props.token),
          this.props.setPlanning(this.props.token),
          this.props.setMerchant(this.props.token),
        ]
      );

    }
    if(this.props.billData === undefined) {   
      this.props.setBill()
  }  

  }
 async componentDidMount() {
    this.props.setAuth();
    // if(this.props.billData.length > 0 ){
    //   this.setState({billDatalength:this.props.billData})
    //   console.log("this.props.billData",this.props.billData.length)
    // }
  }

  render() {
    
    var accountDropdownData = this.props.accountsData ?
      this.props.accountsData.filter((acc) => acc.accountCategory!=="Wallet") : [];
      const totalarray = this.props.billData !== undefined ? this.props.billData.map((val)=>(val.amount)) : ""
      const sum =  totalarray.length > 0 ?totalarray.filter(val => val < 0).reduce((result,number)=> result+number): ""
    return (
      <div>
         { (this.props.token !== null && this.props.accountsData && this.props.categoriesData && this.props.spendingData && this.props.merchantData && this.props.planningData) ? 
      <div className="col-12">
         <div id="billingDiv" className='toggleBilling'>
         <h2 className="mb-4">Summary</h2>
        <div className='account-top-bar'>
        <AccountDropdown accountsData={accountDropdownData}></AccountDropdown>
        </div>
        <div>
        {/* <BillingTable></BillingTable>
        <BillingFilter></BillingFilter> */}
        </div>
        </div>
      {/* account bar end */}
      <div className='text-center'>
        <h4>Events of Last 30 days</h4>
      </div>
      <CarouselNew></CarouselNew>
      <div className='budget-detail-wrap'>
      <div className='budget-container budget-flex'>
      <BugdetOverview></BugdetOverview>
        </div>
        {/*  */}
        <div className='budget-detail-wrap budget-flex'>
          <div className='unpaid-bill-wrap '>
            {console.log("this.props.billData",this.props.billData)}
         <div className='bill-number-text'>{this.props.billData !== undefined ? this.props.billData.length : ""}</div>
           <span className='bold bill-content'>Unpaid bills in next 30 days totalling £ {Math.abs(sum).toFixed(2)}</span>
         </div>    
        </div>
        {/*  */}
         <div className='budget-container budget-flex expeses-container'>
         <ProgressBars categoriesData={this.props.categoriesData} spendingData={this.props.spendingData} />
        </div>
      </div>
      {/* end */}
      <div className='top-merchants-wrap bubble-chart-center bar-chart-center p-3 col-12 col-lg-12'>
         <div className='merchants-wrapper'>
          {/* <HorizontalBar spendingData={this.props.spendingData} categoriesData={this.props.categoriesData}  /> */}
            <hr/>
          <ProgressBarsExpenses spendingData={this.props.spendingData} categoriesData={this.props.categoriesData} />
        </div>     
         {/* <BubbleGraphs merchantData={this.props.merchantData} /> */}
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
  spendingData: state.componentReducer.spendingData,
  feedData: state.componentReducer.feedData,
  billData: state.componentReducer.billData
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: () => dispatch(setAuthToken()),
    setAccounts: (token) => dispatch(setAccountsData(token)),
    setCategories: (token) => dispatch(setCategoriesData(token)),
    setPlanning: (token) => dispatch(setPlanningData(token)),
    setSpending: (token) => dispatch(setSpendingData(token)),
    setMerchant: (token) => dispatch(setMerchantData(token)),
    setFeed:(token) => dispatch(setFeedData(token)),
    setBill:(token) => dispatch(setBillData(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
