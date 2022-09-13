import React, { Component } from "react";
import { connect } from "react-redux";
import "../../../node_modules/react-bubble-chart/src/style.css";

import "./../../App.css";
import { setCategoriesData, setMerchantData, setPlanningData, setSpendingData } from "./../../store/actions/component-action";

import ProgressBars from './Charts/ProgressBars';
import BarCharts from "./Charts/BarCharts";
import BubbleGraphs from "./Charts/BubbleGraphs";

class Insights extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <div>
        { (this.props.token !== null && this.props.categoriesData.length !== 0 && this.props.spendingData.length !== 0 && this.props.merchantData.length !==0 && this.props.planningData.length !== 0) ? 
          <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', rowGap: '50px' }}>
            <ProgressBars categoriesData={this.props.categoriesData} spendingData={this.props.spendingData} />
            <BarCharts categoriesData={this.props.categoriesData} planningData={this.props.planningData} />
            <BubbleGraphs merchantData={this.props.merchantData} />
          </div>
        : <div></div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.authReducer.token,
  planningData: state.componentReducer.planningData,
  merchantData: state.componentReducer.merchantData,
  categoriesData: state.componentReducer.categoriesData,
  spendingData: state.componentReducer.spendingData
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: (token) => dispatch(setCategoriesData(token)),
    setPlanning: (token) => dispatch(setPlanningData(token)),
    setSpending: (token) => dispatch(setSpendingData(token)),
    setMerchant: (token) => dispatch(setMerchantData(token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Insights);