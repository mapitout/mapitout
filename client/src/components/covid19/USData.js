import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';


class USData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }


  componentDidMount() {
    axios.get('https://pomber.github.io/covid19/timeseries.json')
      .then(res => {
        console.log(res)
        console.log(res.data.US)
        let USData = res.data.US;
        let newData = USData.slice(39, USData.length);
        this.setState({
          data: newData
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="usdata">
        <div className="container text-center">
          <div className="row text-center">
            <h5 >Total confirmed cases and deaths in United States since March 1st</h5>
            <ResponsiveContainer width="95%" height={600}>
              <BarChart data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="confirmed" fill="#8884d8" />
                <Bar dataKey="deaths" fill="#82ca9d" />
                {/* <Bar dataKey="recovered" fill="#82ca9d" /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default USData;