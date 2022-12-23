import React, { Component } from "react";
import { ProgressBar } from '@meniga/ui';

import './../../../App.css';
import './../../../style/Base.css';
import { setSpendingData } from "../../../store/actions/component-action";
import { connect } from "react-redux";
import DateFilter from "./../../Insights/DateFilter/DateFilter";
import { getFromToDate } from "../../../utils";
class ProgressBarsExpenses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      periodFrom: null,
      periodTo: null,
      data: [],
      categoriesData: [],
      progressData: [],
    };
  }
   dateOnChange(e) {
    let dateFilter = {};
    if (e) {
      dateFilter = { dateFilter: e };
      this.setState({ ...e }, () => {
        this.props.setSpendingData(this.props.token, this.state);
      });
    } else {
      this.setState({ period: null, periodFrom: null, amountTo: null }, () => {
        this.props.setSpendingData(this.props.token, this.state);
      });
    }   
      
    this.setState({progressData:[]})
  }
  async componentDidMount() {   
    this.calculateChartData();
  }
  calculateChartData(){
    const filteredData = [];
   
    let count = 0;
    if(this.props.categoriesData.length !== 0) {
      for(const every of this.props.spendingData) {
        const { categoryId, carbonFootprint } = every;
        const innerObj = {};
        for(const category of this.props.categoriesData) {
          const categoryFound = category.children.filter(x => x.id === categoryId);
          if(categoryFound.length > 0) {
            innerObj.category = category.name;
          }
        }

        innerObj.carbonFootprint = Math.abs(carbonFootprint);
        filteredData.push(innerObj);

        count = count + 1;
      }

      const resultantData = Array.from(filteredData.reduce((m, {category, carbonFootprint}) => 
        m.set(category, [...(m.get(category) || []), carbonFootprint]), new Map
        ), ([category, carbonFootprint]) => ({category, carbonFootprint})
      );

      const finalData = [];
      let totalAmount = 0;
      for(const every of resultantData) {
        const innerObj = {
          category: every.category, 
          carbonFootprint: (Number(Number(every.carbonFootprint.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2)) / 1000).toFixed(0)
        };

        totalAmount += Number(innerObj.carbonFootprint);
        finalData.push(innerObj);
      }

      const sortedFinalData = finalData.sort((a, b) => { return b.carbonFootprint - a.carbonFootprint });
      if(this.state.progressData.length === 0) {
        this.setState({ progressData: 
          sortedFinalData.map(x => { return { category: x.category, carbonFootprint: x.carbonFootprint, percentage: (x.carbonFootprint/totalAmount * 100) } })
        });
      }
    }
  }
  componentDidUpdate(previousProps){
    if(previousProps.spendingData !== this.props.spendingData) {   
      this.calculateChartData();
  }
  }

  render() {
    const { progressData } = this.state;
    const progressItems = [];
 
   
    for (const every of this.state.progressData.slice(0, 5)) {
      progressItems.push(
        <div className="carbonFootprint-progressBar custom-width">
          <ProgressBar key={every.category} value={every.percentage} total={100} animate={true} showValue={true} />
          <div className="progressBar-wrapper">
            <div className="progressBar-item"> { every.category.toUpperCase() } </div>
            <div className="progressBar-item">{ every.carbonFootprint} kg</div>
          </div>
        </div>
      );
    }

    return (
     
      <div className="progressBar-item-wrap">
             <div className="budgetEquationContainer-header-title">
              <h3 className="bold">
               Carbon Footprint By Category
              </h3>
     <div className="budgetEquationContainer-select">     
            <DateFilter onChange={(date) => this.dateOnChange(date)}></DateFilter>        
              </div>
            </div>
        { progressItems } 
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  spendingData: state.componentReducer.spendingData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setSpendingData: (token, value) => dispatch(setSpendingData(token, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarsExpenses);