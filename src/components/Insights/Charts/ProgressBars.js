import React, { Component } from "react";
import { ProgressBar } from '@meniga/ui';

import './../../../App.css';
import './../../../style/Base.css';

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
        <div className='progress-wrapper'> 
            <ProgressBar key={every.category} value={every.percentage} total={100} animate={true} showValue={true} />
            <div className='progress-items-wrap'>
              <div className='progress-items'>{ String(every.category).toUpperCase() }</div>
              <div className='progress-items'>$ { every.amount }</div>
            </div>
        </div>
      );
    }

    return (
      <>
      <h2>Insights</h2>
      <div className='wrapper'>
        <div className='first-column insights-left'> 
            <div className='insights-bold-text'> AUGUST 2022 </div>       
            <div className='first-column-title'> How am I spending ?</div>   
            <div className='separter-line'></div>
            <div className='insiiide-left-description'> 
              <div className='first-column-subpart1'>41%</div>
              <div className='first-column-subpart2'>lower spending on Media in July compared to what you have been spending recently</div>
            </div>
        </div>
        <div className="insights-right">
          { progressItems }
        </div>
      </div>
      </>
    );
  }
}

export default ProgressBars;