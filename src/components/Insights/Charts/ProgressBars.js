import React, { Component } from "react";
import { ProgressBar } from '@meniga/ui';
import DateFilter from "../DateFilter/DateFilter";
import './../../../App.css';
import './../../../style/Base.css';
import {setExpenseData} from "./../../../store/actions/component-action"
import {connect} from "react-redux";
import { getFromToDate } from "../../../utils";
import { SpinningCircles } from "react-loading-icons";

class ProgressBars extends Component {

  constructor(props) {
    super(props);
 this.state = {
      periodFrom: null,
      periodTo: null,
      data: [],
      categoriesData: [],
      spendingData: []
    };
    this.calcPercentage = this.calcPercentage.bind(this);
  }
  dateOnChange(e) {
    let dateFilter = {};
    if (e) {
      dateFilter = { dateFilter: e };
      this.setState({ ...e }, () => {
        this.props.setExpenseData(this.props.token, this.state);
      });
    } 
  }

  async componentDidMount() {
    const { startDate, endDate } = getFromToDate("0");    
    this.props.setExpenseData(this.props.token, {periodFrom:startDate , periodTo:endDate, data: [], categoriesData: [], spendingData:[]});
  }
  
  calcPercentage(expensesList, expenseAmout){
    const finalData = [];
    expensesList.map((value,i)=>{
      finalData.push(Math.abs(value.values[0].nettoAmount));
    })
    const totalAmount = Number(Number(finalData.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
    console.log('expensesList, expenseAmout', expensesList, expenseAmout,finalData, totalAmount)
    return (Math.abs(expenseAmout/totalAmount * 100));
  }
  
  render() {
    const progressItems = [];
    const expensearray = [
      {category:"Home", amount:""},{category:"Cars & Transportation", amount:""},
      {category:"Children", amount:""},{category:"Health & Beauty", amount:""},
      {category:"Fees, Fines, Loans and Taxes", amount:""},{category:"Shopping & Services", amount:""},
      {category:"Leisure & Lifestyle", amount:""}, {category:"Education", amount:""},
      {category:"Vacation & Travel", amount:""},{category:"Uncategorized Expenses", amount:""},
      {category:"Food & Household Items", amount:""},{category:"Insurance", amount:""},
    ]
      const expenseammountArray = (this.props.expenseData !== undefined) ? (this.props.expenseData.length !== 0 )? ((this.props.expenseData.map((value)=>
      value.values[0].nettoAmount
    )))
    :(console.log("nolength")): console.log("nodata")
   const finalArray = [];
   (expenseammountArray !== undefined) ? ((expensearray.map((x,i)=>
    finalArray.push({category:x.category,amount:expenseammountArray[i]})
    )))
    : console.log("nodata");

      (expenseammountArray !== undefined) ?  ((finalArray.sort((a, b) => a.amount - b.amount).slice(0,5).map((x,i)=>{
        progressItems.push(
              <div className='progress-wrapper'> 
                 <ProgressBar key={x.category} value={this.calcPercentage(this.props.expenseData,expenseammountArray[i])} total={100} animate={true} showValue={true} />
              <div className='progress-items-wrap'>
                <div className='progress-items'>{ String(x.category).toUpperCase() }</div>
                    <div className='progress-items'>$ {x.amount }</div>
                  </div>
              </div>
           );
      })))
      : <div className="spinning-icon">
      <SpinningCircles
        fill="#06bcee"
        stroke="#06bcee"
        strokeOpacity={1}
        speed={1}
        fillOpacity={1}
        strokeWidth={3}
        height="10em"
      />
      <div className="loading-text">Loading...</div>
    </div>
      
    return (
      <>
      <div className='expeses-wrapper'>
    
      <div className="budgetEquationContainer-header">
            <span className="budgetEquationContainer-header-icon">
              <svg
                className="SVGInline-svg SVGImage-svg budgetEquationContainer-header-icon-svg"
                viewBox="0 0 48 48"
                height="48px"
                width="48px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="48"
                  height="48"
                >
                  <circle cx="24" cy="24" r="24" fill="#C4C4C4"></circle>
                </mask>
                <g mask="url(#mask0)">
                  <rect width="48" height="48" fill="#C3DDBB"></rect>
                  <path
                    d="M12 14.4C12 13.0745 13.0745 12 14.4 12H33.6C34.9255 12 36 13.0745 36 14.4V33.6C36 34.9255 34.9255 36 33.6 36H14.4C13.0745 36 12 34.9255 12 33.6V14.4Z"
                    fill="white"
                  ></path>
                  <path
                    d="M12 14.4C12 13.0745 13.0745 12 14.4 12H33.6C34.9255 12 36 13.0745 36 14.4V19.2H12V14.4Z"
                    fill="#88BC76"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 19.2H36V18.4H12V19.2Z"
                    fill="#4A783B"
                  ></path>
                  <path
                    d="M18.817 30.975C19.0007 30.9754 19.1777 30.9054 19.3115 30.7795L22.488 27.8C22.5334 27.757 22.5939 27.7334 22.6565 27.7344C22.7191 27.7353 22.7788 27.7607 22.823 27.805L23.8915 28.874C24.2129 29.1809 24.6403 29.3522 25.0847 29.3522C25.5292 29.3522 25.9565 29.1809 26.278 28.874L28.0665 27.0855C28.0776 27.0743 28.0909 27.0654 28.1055 27.0594C28.1201 27.0533 28.1357 27.0502 28.1515 27.0502C28.1673 27.0502 28.1829 27.0533 28.1975 27.0594C28.2121 27.0654 28.2253 27.0743 28.2365 27.0855L29.0835 27.9295C29.1739 28.0195 29.2964 28.07 29.424 28.07C29.5518 28.0699 29.6744 28.0191 29.7648 27.9287C29.8553 27.8384 29.9062 27.7158 29.9065 27.588V24.707C29.9063 24.5791 29.8555 24.4565 29.765 24.3662C29.6745 24.2758 29.5519 24.225 29.424 24.225H26.5315C26.4357 24.2246 26.342 24.2528 26.2624 24.3059C26.1827 24.359 26.1206 24.4346 26.0841 24.5231C26.0475 24.6116 26.0382 24.709 26.0572 24.8029C26.0763 24.8967 26.1228 24.9827 26.191 25.05L27.041 25.9C27.0636 25.9227 27.0764 25.9534 27.0765 25.9855C27.0765 26.0013 27.0734 26.017 27.0673 26.0316C27.0612 26.0462 27.0523 26.0594 27.041 26.0705L25.255 27.857C25.2096 27.9019 25.1483 27.9271 25.0845 27.9271C25.0206 27.9271 24.9594 27.9019 24.914 27.857L23.845 26.788C23.5367 26.4766 23.1189 26.2981 22.6808 26.2904C22.2427 26.2827 21.819 26.4466 21.5 26.747L18.3225 29.724C18.2171 29.8233 18.144 29.9519 18.1125 30.0932C18.081 30.2345 18.0927 30.382 18.1459 30.5167C18.1992 30.6513 18.2916 30.7668 18.4112 30.8484C18.5309 30.9299 18.6722 30.9737 18.817 30.974V30.975Z"
                    fill="#88BC76"
                  ></path>
                  <path
                    d="M15.5999 10.8C14.9372 10.8 14.3999 11.3372 14.3999 12V14.4C14.3999 15.0627 14.9372 15.6 15.5999 15.6H16.3999C17.0626 15.6 17.5999 15.0627 17.5999 14.4V12C17.5999 11.3372 17.0626 10.8 16.3999 10.8H15.5999Z"
                    fill="#4A783B"
                  ></path>
                  <path
                    d="M31.5999 10.8C30.9372 10.8 30.3999 11.3372 30.3999 12V14.4C30.3999 15.0627 30.9372 15.6 31.5999 15.6H32.3999C33.0626 15.6 33.5999 15.0627 33.5999 14.4V12C33.5999 11.3372 33.0626 10.8 32.3999 10.8H31.5999Z"
                    fill="#4A783B"
                  ></path>
                </g>
              </svg>
            </span>
            <div className="budgetEquationContainer-header-title">
              <h3 className="bold">
                Expenses by categories
              </h3>
              <div className="budgetEquationContainer-select">
                 <DateFilter onChange={(date) => this.dateOnChange(date)}></DateFilter>  
              </div>
            </div>
          </div>
        <div className="insights-right col-12">
         {progressItems}
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  expenseData: state.componentReducer.expenseData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setExpenseData: (token, value) => dispatch(setExpenseData(token, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBars);