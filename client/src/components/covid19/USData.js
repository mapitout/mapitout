import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line, Bar } from 'recharts';
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
        // console.log(res.data.US)
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
              <ComposedChart data={this.state.data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke='#f5f5f5' />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>}/>
                <Legend />
                <Bar dataKey='confirmed' barSize={20} fill='#75D6B1' />
                <Line type='monotone' dataKey='confirmed' stroke='#75D6B1' />
                <Bar dataKey='deaths' barSize={20} fill='#757272' />
                <Line type='monotone' dataKey='deaths' stroke='#757272' />

              </ComposedChart>

            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default USData;


function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip" style={{background:"#fff",padding:".8rem",border:".2px solid #D3D3D3"}}>
        <p>United State</p>
        <p className="label" style={{color:`${payload[0].fill}`}}>{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="label" style={{color:`${payload[2].fill}`}}>{`${payload[2].name} : ${payload[2].value}`}</p>
      </div>
    );
  }

  return null;
}