import React, { Component } from "react";
import { ProgressBar } from '@meniga/ui';

import './../../../App.css';

class ProgressBars extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      categoriesData: [],
      spendingData: []
    };
  }

  async componentDidMount() {
    const filteredData = [];

    let count = 0;
    if(this.props.categoriesData.length !== 0) {
      for(const every of this.props.spendingData) {
        const { categoryId, amount } = every;

        const innerObj = {};
        for(const category of this.props.categoriesData) {
          const categoryFound = category.children.filter(x => x.id === categoryId);
          if(categoryFound.length > 0) {
            innerObj.category = category.name;
          }
        }

        innerObj.amount = Math.abs(amount);
        filteredData.push(innerObj);

        count = count + 1;
      }

      const resultantData = Array.from(filteredData.reduce((m, {category, amount}) => 
        m.set(category, [...(m.get(category) || []), amount]), new Map
        ), ([category, amount]) => ({category, amount})
      );

      const finalData = [];
      let totalAmount = 0;
      for(const every of resultantData) {
        const innerObj = {
          category: every.category, 
          amount: Number(Number(every.amount.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
        };

        totalAmount += Number(innerObj.amount);
        finalData.push(innerObj);
      }

      if(this.state.data.length === 0) {
        this.setState({ data: 
          finalData.map(x => { return { category: x.category, amount: x.amount, percentage: (x.amount/totalAmount * 100) } })
        });
      }
    }
  }

  render() {
    const progressItems = [];
    const shuffledData = this.state.data.sort(() => 0.5 - Math.random());
  
    for (const every of shuffledData.slice(0, 5)) {
      progressItems.push(
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap' }}> 
            <ProgressBar key={every.category} value={every.percentage} total={100} animate={true} showValue={true} />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', width: '500px' }}>
              <div style={{ marginLeft: '10px', fontSize: '13px', color: 'black' }}>{ String(every.category).toUpperCase() }</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#4B286D' }}>$ { every.amount }</div>
            </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

        <div className='first-column'> 
            <div style={{ fontSize: '15px', color: '#4B286D', opacity: '0.7', fontWeight: 'bold', padding: '20px', paddingBottom: 0 }}> AUGUST 2022 </div>       
            <div className='first-column-title' style={{ color: '#4B286D', opacity: '0.9' }}> How am I spending ?</div>   
            <div style={{ height: '5px', background: '#4B286D', width: '150px', marginLeft: '20px', marginTop: '10px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}> 
              <div className='first-column-subpart1' style={{ color: '#4B286D', fontWeight: '500' }}>41%</div>
              <div className='first-column-subpart2' style={{ color: '#4B286D'}}>lower spending on Media in July compared to what you have been spending recently</div>
            </div>
        </div>
        <div style={{ width: '500px', paddingTop: '30px' }}>
          { progressItems }
        </div>
      </div>
    );
  }
}

export default ProgressBars;