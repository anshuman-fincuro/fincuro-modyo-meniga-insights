import React, { Component } from "react";
import ReactBubbleChart from "react-bubble-chart";

import './../../../App.css';
import './../../../style/Base.css';

class BubbleGraphs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      key: 'start',
      categoriesData: [],
      planningData: []
    };
  }

  async componentDidMount() {
    const finalData = [];
    for(const every of this.props.merchantData) {
      finalData.push({ _id: every.text, value: Math.abs(every.nettoAmount) });
    }

    if(this.state.data.length === 0) {
      this.setState({ data: finalData });
    }
  }

  render() {
    return (
      <div className='wrapper barcharts'>
  
        <div className='barcharts-content'> 
            <h3 className='barcharts-left-title'> Top Merchants </h3>       
            <p className='barcharts-left-content'> Your top merchants for the past 30 days</p>   
        </div>
       
        <div className="chart-wrapper" style={{ width: "350px", height: "350px" }}>
          <ReactBubbleChart
            {...this.props}
            className="chart__bubble"
            key={this.state.key}
            data={this.state.data}
          />
        </div>
      </div>
    );
  }
}

export default BubbleGraphs;