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

  handleClick = data => {
    const isGroup = data.children !== undefined;

    this.setState(() => ({
      key: isGroup ? data.children._id : 'updated',
      data: isGroup ? data.children : this.props.data
    }));
  };

  render() {
    return (
      <div className='wrapper barcharts'>
  
        <div className='barcharts-contant'> 
            <div className='barcharts-left-title'> Top Merchants </div>       
            <div className='barcharts-left-content'> Your top merchants for the past 30 days</div>   
        </div>

        <div className="chart-wrapper">
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