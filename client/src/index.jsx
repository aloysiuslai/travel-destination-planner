const React = require('react');
const ReactDOM = require('react-dom');
const axios = require("axios");
import SearchHistory from './searchHistory.jsx'
import SecondPage from './secondPage.jsx'
import ThirdPage from './thirdPage.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCode: 'SFO',
      currentCity: 'San Francisco',
      currentCountry: 'United States',
      cities: [],
      date: new Date(),
      destination: '',
      description: '',
      link: '',
      page: 0,
      pictures: [],
      nearest: [],
      longitude: '',
      history: [],
    }

    this.getOption = this.getOption.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDate=this.changeDate.bind(this);
    this.returnHome=this.returnHome.bind(this);
    this.saveHistory=this.saveHistory.bind(this);
    this.getHistory=this.getHistory.bind(this);
  }

  componentDidMount() {
    this.getOption();
  }

  saveHistory() {
    axios.post('/save', {
      code: this.state.currentCode,
      city: this.state.currentCity,
      country: this.state.currentCountry,
      date: this.state.date,
      link: this.state.link
    })
    .then(response => {
      console.log('Success')
      alert('Saved')
    })
    .catch(error => console.log(error))
  }

  getHistory() {
    axios.get('/save')
    .then(response => {
      this.setState({
        page: 2,
        history: response.data.rows
      })
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }

  getOption() {
    axios.get('/cities')
    .then(response => {
      this.setState({cities: response.data})
    })
    .catch(error => console.log(error))
  }

  handleChange(event) {
    this.setState({
      currentCode: event.target.value.split(',')[0],
      currentCity: event.target.value.split(',')[1],
      currentCountry: event.target.value.split(',')[2]
    });
  }

  changeDate(event){
    this.setState({date: event.target.value});
  }

  returnHome() {
    this.setState({page:0})
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

      axios.get(`https://api.unsplash.com/search/photos/?query=${this.state.currentCity}&client_id=shRbpD2tkzB1nLBxKRiaaINuBL5tZVt5AjLrLzbO7I0`)
        .then((response)=>{
          console.log(response.data.results['0'].urls.small)
          this.setState({pictures:response.data.results['0'].urls.small})
        })
        .catch((error)=>{
          console.log(error)
        })
    this.setState({page: 1})
  }

  render () {
    if ( this.state.page === 0) {
      return <SecondPage handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={this.state} changeDate={this.changeDate} getHistory={this.getHistory}/>
    }

    if (this.state.page === 1) {
      return <ThirdPage state={this.state} returnHome={this.returnHome} saveHistory={this.saveHistory}/>
    }

    if ( this.state.page === 2) {
      return <SearchHistory state={this.state} returnHome={this.returnHome}/>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

