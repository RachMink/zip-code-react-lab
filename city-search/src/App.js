import React, { Component } from 'react';
import './App.css';

//could be a component in the EC
// function City(props){
//   return(
//     <div> 
//       {props.CityState}
//     </div>
//   )
// }

function ZipCodes(props) {
  return (
    <div className="zip-container">
      <div id="Zip"> 
      <h3> Zip Code: {props.Zipcode}</h3>
      {/* <li> Zip Info: {props.CityState}</li> */}
      </div>

    </div>);
}

function Err(props) {
  //if there is an error message (the specific endpoint/CITY was not found in the API) -
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

function CitySearchField(props) {
  return (
    <div>
      City Name:
      <input type="text" onChange={props.changeHandler}></input>
    </div>);
}

class App extends Component {
  state = {
    cityName: "",
    zipCodes: [],
    cities: [],
    zipCode:"",
    error: null //added an error state in case people type in zipcodes that dont exist
  }

  CityChange = (event) => {
    this.setState({cityName: event.target.value })

    fetch("http://ctp-zip-api.herokuapp.com/city/" + event.target.value.toUpperCase())
    .then((res) => {
        if (res.ok === false) { //the response has an "ok" value which is true/false
          throw Error('City Does not exist')
        } else {
          return res.json()
        }
    })
    .then((json) => {
        this.setState({ zipCodes: json })
        this.setState({ error: null })  
        return this.state.zipCodes;  
    })

    //I BEGAN TO DO THE EXTRA CREDIT BUT TO NO AVAIL :(
    // .then((zip)=> {
    // for(const element of zip){    
    // fetch("http://ctp-zip-api.herokuapp.com/zip/" + element)
    // .then((res) => {
    //   if (res.ok === false) { //the response has an "ok" value which is true/false
    //     throw Error('Zip code Does not exist')
    //   } else {
    //     return res.json()
    //   }
    // })
    // .then((json) => {
    //   this.setState({ cities: json })
    //   this.setState({ error: null })
    // })
    // .catch((e) => {
    //   this.setState({ error: e.message }) //sets the error state to the error message that we threw in the above if statement
    //   this.setState({ cities: [] }) //sets the cities array to nothing - so if the previous city is still on the screen, it changes back to nothing
    // })}}
    // )
    .catch((e) => {
      this.setState({ error: e.message }) //sets the error state to the error message that we threw in the above if statement
      this.setState({ zipCodes: [] }) //sets the ZipCodes array to nothing - so if the previous city is still on the screen, it changes back to nothing
    });
    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <CitySearchField cityName= {this.state.cityName} changeHandler={this.CityChange} />

        <div>Current CITY is: {this.state.cityName} </div>

        <Err errorMessage={this.state.error} />

        <div>
          {this.state.zipCodes.map((zip,index) => <ZipCodes Zipcode={zip}/>)}
          {/* {this.state.cities.map((city)=> <City CityState = {city.City} />)} */}
        </div>
      </div>
    );
  }
}

export default App;
