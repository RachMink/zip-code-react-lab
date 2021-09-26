import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div className="city-container">
      <div id="cityState"> <h3> {props.Name}, {props.State}</h3></div>
      <li>Zip Code: {props.Zipcode} </li>
      <li> Estimated Population: {props.EstimatedPopulation} </li>
      <li> Tax Returns Filed: {props.TaxReturnsFiled} </li>
    </div>);
}

function Err(props) {
  //if there is an error message (the specific endpoint/zipcode was not found in the API) -
  // it is diplayed on the screen with this functional component
  if (props.errorMessage !== null) {
    return (
      <div>
        {props.errorMessage} 
      </div>
    )
  }
  return (
    <div></div>
  )
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
    cities: [],
    error: null //added an error state in case people type in zipcodes that dont exist
  }

  zipChange = (event) => {
    this.setState({ zipCode: event.target.value })

    fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
      .then((res) => {
        if (res.ok === false) { //the response has an "ok" value which is true/false
          throw Error('Zip code Does not exist')
        } else {
          return res.json()
        }
      })
      .then((json) => {
        this.setState({ cities: json })
        this.setState({ error: null })
      })
      .catch((e) => {
        this.setState({ error: e.message }) //sets the error state to the error message that we threw in the above if statement
        this.setState({ cities: [] }) //sets the cities array to nothing - so if the previous city is still on the screen, it changes back to nothing
      });

  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChange} />

        <div>Current Zip is: {this.state.zipCode} </div>

        <Err errorMessage={this.state.error} />

        <div>
          {this.state.cities.map((city) => <City Name={city.City} State={city.State} Zipcode={city.Zipcode} EstimatedPopulation={city.EstimatedPopulation || "unknown"} TaxReturnsFiled={city.TaxReturnsFiled || "unknown"} />)}
        </div>
      </div>
    );
  }
}

export default App;
