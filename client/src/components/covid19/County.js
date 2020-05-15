import React from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dropdown } from 'react-bootstrap';

let name = 'andy';
let name = 'andy';
let name = 'andy';
let name = 'andy';

class CACounty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      curState: 'California',
      code: 'CA'
    }
  }
  componentDidMount() {
    axios.get(`https://amazingshellyyy.com/covid19-api/US-CA/current.json`)
      .then(res => {
        console.log('covid CA County data', res.data)
        let curData = res.data;
        let Top10 = curData.data.sort((a, b) => (a.case > b.case) ? -1 : 1).slice(0, 10)
        this.setState({
          time: curData.timeStamp,
          data: Top10
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  choose(e) {
    e.preventDefault();
    console.log(e.target.innerHTML);
    console.log(e.target.id)
    this.changeData(e.target.id)
    this.setState({
      curState: e.target.innerHTML,
      code: e.target.id
    })

  }

  changeData(code) {
    axios.get(`https://amazingshellyyy.com/covid19-api/US-${code}/current.json`)
      .then(res => {
        console.log('covid CA County data', res.data)
        
        let curData = res.data;
        let Top10 = curData.data.sort((a, b) => (a.case > b.case) ? -1 : 1).slice(0, 10)
        this.setState({
          time: curData.timeStamp,
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
            <div className="col-sm-8">
              <h5 className="chart-title">Top 10 most confrimed cases county in {this.state.curState}</h5>
            </div>
            <div className="col-sm-4">
              <Dropdown className="ml-auto">
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  {this.state.curState}
                </Dropdown.Toggle>
                <Dropdown.Menu onClick={this.choose.bind(this)}>
                  <Dropdown.Item id="CA">California</Dropdown.Item>
                  <Dropdown.Item id="WA">Washington</Dropdown.Item>
                  <Dropdown.Item id="NY">New York</Dropdown.Item>
                  <Dropdown.Item id="NJ">New Jersey</Dropdown.Item>
                  <Dropdown.Item id="MI">Michigan</Dropdown.Item>
                  <Dropdown.Item id="PA">Pennsylvania</Dropdown.Item>
                  <Dropdown.Item id="IL">Illiois</Dropdown.Item>
                  <Dropdown.Item id="LA">Louisiana</Dropdown.Item>
                  <Dropdown.Item id="FL">Florida</Dropdown.Item>
                  <Dropdown.Item id="TX">Texus</Dropdown.Item>
                  <Dropdown.Item id="GA">Georgia</Dropdown.Item>
                  <Dropdown.Item id="CT">Connecticut</Dropdown.Item>
                  <Dropdown.Item id="IN">Indiana</Dropdown.Item>
                  <Dropdown.Item id="OH">Ohio</Dropdown.Item>
                  <Dropdown.Item id="VA">Virginia</Dropdown.Item>
                  <Dropdown.Item id="MO">Missouri</Dropdown.Item>
                  <Dropdown.Item id="NC">North Carolina</Dropdown.Item>
                  <Dropdown.Item id="SC">South Carolina</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="row text-center">

            <ResponsiveContainer width="95%" height={600}>
              <BarChart layout="vertical" data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="county" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="case" fill="#75D6B1" />
                <Bar dataKey="death" fill="#757272" />
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