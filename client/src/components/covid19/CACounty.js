import React from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class CACounty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('https://amazingshellyyy.com/covid19-CA/countyTimeseries.json')
      .then(res => {
        console.log('covid CA County data', res.data)
        let curData = res.data;
        let updatedData = curData[curData.length - 1];
        console.log(updatedData)
        let Top10 = updatedData.data.sort((a, b) => (a.case > b.case) ? -1 : 1).slice(0,10)
        this.setState({
          time: updatedData.timeStamp,
          data: Top10
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="ca-county-data">
        <div className="container text-center">
          <div className="row text-center">
            <h5 >Top 10 most confrimed cases county in Californea</h5>
            <ResponsiveContainer width="95%" height={600}>
              <BarChart layout="vertical" data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number"/>
                <YAxis type="category" dataKey="county" />
                <Tooltip />
                <Legend />
                <Bar dataKey="case" fill="#8884d8" />
                <Bar dataKey="death" fill="#82ca9d" />
                {/* <Bar dataKey="recovered" fill="#82ca9d" /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default CACounty;