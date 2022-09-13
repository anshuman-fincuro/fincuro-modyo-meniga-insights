import React, { Component } from "react";
import ReactBubbleChart from "react-bubble-chart";

import './../../../App.css';

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

  handleClick = data => {
    const isGroup = data.children !== undefined;

    this.setState(() => ({
      key: isGroup ? data.children._id : 'updated',
      data: isGroup ? data.children : this.props.data
    }));
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: '400px', justifyContent: 'space-evenly' }}>
  
        <div style={{ width: '440px', padding: '25px' }}> 
            <div style={{ fontSize: '35px', color: '#4B286D',fontWeight: 'bold', padding: '20px', opacity: '0.9'  }}> Top Merchants </div>       
            <div style={{ fontSize: '25px', color: '#4B286D', padding: '20px', paddingTop: '5px' }}> Your top merchants for the past 30 days</div>   
        </div>

        <div style={{ width: "500px" }}>
          <ReactBubbleChart
            {...this.props}
            className="chart__bubble"
            key={this.state.key}
            data={this.state.data}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default BubbleGraphs;