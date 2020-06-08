const React = require('react');
const ReactDOM = require('react-dom');
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: 'SFO',
      currentCity: 'San Francisco',
      cities: [],
      date: new Date(),
      destination: '',
      description: '',
      link: '',
      page: 0,
    }
    this.getOption = this.getOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getOption();
  }

  getOption() {
    axios.get('/cities')
    .then(response => {
      // console.log(response);
      this.setState({cities: response.data})
    })
    .catch(error => console.log(error))
  }

  handleChange(event) {
    this.setState({
      currentCode: event.target.value.split(',')[0],
      currentCity: event.target.value.split(',')[1]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
               axios({
      "method":"GET",
      "url":"https://tripadvisor1.p.rapidapi.com/flights/create-session",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key":"74f9206c23msh03f1fd99e82ccd0p10a948jsnc340825ecf1f",
      "useQueryString":true
      },"params":{
      "currency":"USD",
      "ta":"1",
      "c":"0",
      "d1":this.state.currentCode,
      "o1":"SFO",
      "dd1":this.state.date,
      }
      })
      .then((response)=>{
        console.log(response.data)
        console.log(response.data.search_url)
        this.setState({link: response.data.search_url})
      })
      .catch((error)=>{
        console.log(error)
      })

    axios({
      "method":"GET",
      "url":"https://tripadvisor1.p.rapidapi.com/locations/search",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key":"74f9206c23msh03f1fd99e82ccd0p10a948jsnc340825ecf1f",
      "useQueryString":true
      },"params":{
      "location_id":"1",
      "limit":"30",
      "sort":"relevance",
      "offset":"0",
      "lang":"en_US",
      "currency":"USD",
      "units":"km",
      "query":this.state.currentCity
      }
      })
      .then((response)=>{
        console.log(response.data.data[0].result_object.geo_description)
        this.setState({description: response.data.data[0].result_object.geo_description})
      })
      .catch((error)=>{
        console.log(error)
      })
      this.setState({page:1})
  }

  render () {
    if ( this.state.page === 0) {
      return (
        <div>
          <h1>Take Me Away</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Destination
              <br/>
              <select value={this.state.value} onChange={this.handleChange} required>
                <option></option>
                {this.state.cities.map(city => {
                  return(
                    <option value={[city.code, city.city]} key={city.city}>{city.city}</option>
                  )
                })}
              </select>
            </label>
            <br/>
            <br/>
            <label>Departure Date</label>
            <br/>
            <input type="date" onChange={()=> this.setState({date: event.target.value})} pattern="dd-mm-yyyy" required/>
            <br/>
            <br/>
            <input type="submit" value="Submit" />
          </form>
          <br/>
        </div>)
    } else {
      return (
      <div className="description">
        <p>{this.state.description}</p>
        <form action={this.state.link} target="_blank">
          <input type="submit" value="See Flight Prices"/>
        </form>
        <button onClick={()=>this.setState({page:0})}>Return</button>
      </div>

      )

    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

