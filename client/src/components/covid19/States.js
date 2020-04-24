import React from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('https://www.amazingshellyyy.com/covid19-api/US/current.json')
      .then(res => {
        console.log('us state',res.data)
        let curData = res.data;
        let Top15 = curData.data.sort((a, b) => (a.case > b.case) ? -1 : 1).slice(0, 15)
        this.setState({
          data: Top15
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="ca-county-data">
        <div className="container text-center">
          <div className="row text-center">
            <h5 >Top 15 most confrimed cases States in the US</h5>
            <ResponsiveContainer width="95%" height={800}>
              <BarChart layout="vertical" data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="state" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="case" fill="#75D6B1" />
                <Bar dataKey="death" fill="#757272" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default States;

