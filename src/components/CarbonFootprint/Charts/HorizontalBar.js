import React, { Component } from "react";
import HSBar from "react-horizontal-stacked-bar-chart";

import './../../../App.css';
import './../../../style/Base.css';
import DateFilter from "./../../Insights/DateFilter/DateFilter";

class HorizontalBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentageData: [],
      progressData: []
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
  }

  async componentDidMount() {
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

  render() {
    const { progressData, percentageData } = this.state;

    const colours = [ '#2c888c', '#2c888ccc', '#2c888ca6', '#2c888c78', '#2c888c5e' ];
    let count = 0;
    for (const every of progressData.slice(0, 5)) {
      percentageData.push({
        value: every.percentage, 
        description: `${Number(every.percentage).toFixed(0)}%`,
        color: colours[count]
      });

      count = count + 1;
    }

    return (
      <div className="HSBar-container">
        <div>
        <div className="HSbar-heading">Carbon Footprint by category</div>
        <div className="budgetEquationContainer-select col-md-12 align-right">
           <DateFilter onChange={(date) => this.dateOnChange(date)}></DateFilter> 
        </div>
        </div>
        <HSBar
          showTextDown
          id="hsbar_text"
          showTextWithValue
          height={40}
          data={percentageData}
          />
      </div>
    );
  }
}

export default HorizontalBar;