import React, { Component } from "react";
import { BarChart, Bar, XAxis,Tooltip } from 'recharts';

import './../../../App.css';

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
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: '400px', justifyContent: 'space-evenly' }}>
  
        <div style={{ width: '500px', padding: '25px' }}> 
            <div style={{ fontSize: '15px', color: '#4B286D', fontWeight: 'bold', padding: '20px', paddingBottom: 0, opacity: '0.7' }}> PLANNING </div>       
            <div style={{ fontSize: '35px', color: '#4B286D', fontWeight: 'bold', padding: '20px', paddingTop: '5px', opacity: '0.9' }}> How are things going ?</div>   
            <div style={{ fontSize: '20px', color: '#4B286D', fontWeight: '300',  padding: '20px', paddingTop: '5px' }}> Comparing my actual expenses this month with my planned expenses </div>        
        </div>
        <div style={{ marginTop: '50px' }}>
          <BarChart
            width={window.innerWidth < 600 ? 350 : 450}
            height={window.innerWidth < 600 ? 150 : 300}
            data={this.state.data}
          >
            <XAxis dataKey="Name" style={{ fontColor: '#4B286D' }}/>
            <Tooltip />
            <Bar dataKey="Actual" fill="#4B286D" />
            <Bar dataKey="Planned" fill="#a48eb4" />
          </BarChart>
        </div>
      </div>
    );
  }
}

export default BarCharts;