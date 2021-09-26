import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className= "city-container">
      <p> CITY NAME: {props.Name} </p>
      <p> STATE: {props.State}</p>
      <p> ESTIMATED POPULATION: {props.EstimatedPopulation} </p>
      
    </div>);
}

function ZipSearchField(props) {
  return (
  <div>
    Zip Code: 
    <input type="text" onChange={props.changeHandler}></input>
  </div>);
}


class App extends Component {
  state = {
    zipCode: "",
    cities: []
  }

  zipChange = (event)=> {
    this.setState({zipCode: event.target.value})

    fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
    .then((res)=> res.json())
    .then((json)=> {
      this.setState({cities: json})
    });

  }

  

  render() {      

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChange} />
        <div>Current Zip is: {this.state.zipCode}</div>

        <div>
          {this.state.cities.map((city)=> <City Name = {city.City} State = {city.State} EstimatedPopulation= {city.EstimatedPopulation || "unknown"}/>) }
        </div>
      </div>
    );
  }
}

export default App;
