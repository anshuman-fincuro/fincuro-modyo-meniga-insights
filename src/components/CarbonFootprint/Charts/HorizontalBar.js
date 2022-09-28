import React, { Component } from "react";
import HSBar from "react-horizontal-stacked-bar-chart";

import './../../../App.css';
import './../../../style/Base.css';

class HorizontalBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percentageData: [],
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
    const { progressData, percentageData } = this.state;

    const colours = [ '#1c242c', '#1c242cd9', '#1c242cbd', '#1c242c91', '#1c242c4f' ];
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
        <div className="HSbar-heading">Carbon Footprint by category</div>
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