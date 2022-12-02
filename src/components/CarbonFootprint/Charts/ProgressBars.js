import React, { Component } from "react";
import { ProgressBar } from '@meniga/ui';

import './../../../App.css';
import './../../../style/Base.css';

class ProgressBarsExpenses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      progressData: []
    };
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
    const { progressData } = this.state;
    {console.log(progressData)}
    const progressItems = [];
    for (const every of progressData.slice(0, 5)) {
      progressItems.push(
        <div className="carbonFootprint-progressBar">
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
        { progressItems } 
      </div>
    );
  }
}

export default ProgressBarsExpenses;