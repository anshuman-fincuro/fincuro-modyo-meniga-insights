import React, { Component } from "react";
import { ProgressBar } from '@meniga/ui';

import './../../../App.css';

class ProgressBars extends Component {

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

    const progressItems = [];
    for (const every of progressData.slice(0, 5)) {
      progressItems.push(
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}>
          <ProgressBar key={every.category} value={every.percentage} total={100} animate={true} showValue={true} />
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', paddingTop: '10px', justifyContent: 'space-between' }}>
            <div style={{ marginLeft: '10px', fontSize: '13px', paddingTop: '5px', color: '#4B286D' }}> { every.category.toUpperCase() } </div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#4B286D' }}>{ every.carbonFootprint} kg</div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', marginLeft: '20px', padding: '20px', width: '1100px' }}>
        { progressItems } 
      </div>
    );
  }
}

export default ProgressBars;