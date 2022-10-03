import React, { Component } from "react";
import { BarChart, Bar, XAxis,Tooltip } from 'recharts';

import './../../../App.css';
import './../../../style/Base.css';

class BarCharts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      categoriesData: [],
      planningData: []
    };
  }

  async componentDidMount() {
    const validPlanningData = this.props.planningData.filter(x => x.transactionCount !== 0);

    const finalData = [];
    for(const every of validPlanningData) {
      const { categoryIds, targetAmount, spentAmount } = every;
      const categoryFound = this.props.categoriesData.filter(x => x.id === categoryIds[0])[0];

      const innerObj = {
        Name: (categoryFound && categoryFound.name && categoryFound.name.length < 15 ) ? categoryFound.name : `${categoryFound.name.slice(0, 15)}...`,
        Actual: Math.abs(spentAmount),
        Planned: Math.abs(targetAmount.toFixed(0))
      }

      finalData.push(innerObj);
    }

    const shuffledData = finalData.sort(() => 0.5 - Math.random());
    if(this.state.data.length === 0) {
      this.setState({ data: shuffledData.slice(0, 3) });
    }
  }

  render() {
    return (
      <div className='wrapper barcharts'>
        <div className="barcharts-left"> 
            <h4 className='insights-bold-text'> PLANNING </h4>       
            <h3 className='barcharts-left-title'> How are things going ?</h3>   
            <p className='barcharts-left-content'> Comparing my actual expenses this month with my planned expenses </p>        
        </div>
        <div>
          <BarChart 
            width={window.innerWidth < 600 ? 150 : 400}
            height={window.innerWidth < 600 ? 200 : 450}
            data={this.state.data}
           
          >
            <XAxis dataKey="Name" style={{ fontColor: '#1c242c', fontSize: '12px' }}/>
            <Tooltip />
            <Bar dataKey="Actual" fill="#1c242c" />
            <Bar dataKey="Planned" fill="#a48eb4" />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default BarCharts;