import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import * as moment from 'moment';

import './../../../App.css';
import './../../../style/Base.css';

class LineCharts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    if(this.props.spendingData.length !== 0) {
      const dates = this.props.spendingData.map(x => x.originalDate);
      const groups = dates.reduce((acc, date) => {
        const yearWeek = `${moment(new Date(date)).year()}-${moment(new Date(date)).week()}`;
        if (!acc[yearWeek]) {
          acc[yearWeek] = [];
        }
        acc[yearWeek].push(date);
        return acc;
      }, {});

      const lineGraphData = [];
      let lineCount = 0;
      for (const item in groups) {
        let total = 0;
        const uniqueDates = [...new Set(groups[item])];
        for(const every of uniqueDates){
          const filteredData = this.props.spendingData.filter(x => x.originalDate === every);
          for(const every of filteredData) {
            total = total + every.carbonFootprint;
          }
        }
        lineGraphData.push({
          name: Number(item.substring(5,7)),
          total: Number(Number(total / 1000).toFixed(0))
        })

        lineCount = lineCount + 1;
        if(lineCount > 4) break;
      }

      const sortedLineGraphData = lineGraphData.sort((a, b) => { return a.name - b.name })

      if(this.state.data.length === 0) {
        this.setState({ data: 
          sortedLineGraphData.map(x => { return { name: `Week ${x.name}`, Total: x.total } })
        })
      }
    }
  }

  render() {
    return (
      <div className="lineChart-container">
        <LineChart layout="horizontal" width={1000} height={300} data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" padding={{ left: 50, right: 50 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="#2c888c"
            activeDot={{ r: 8 }}
            />
          </LineChart>   
      </div>       
    );
  }
}



export default LineCharts;