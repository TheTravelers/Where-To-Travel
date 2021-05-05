import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import zipcodes from 'zipcodes-nrviens'
import Results from '../Results/Results'
import { geolocated } from 'react-geolocated'
import './Filter.scss'

class Filter extends Component{
    constructor(props){
        super(props)
        this.state = {
            coordinates: undefined,
            adultFriendly: false,
            waterFront: false,
            inState: false,
            rangeValue: 100,
            rangeValueInMeters: 300000,
            populationDivider: '',
            zipCode: '',
            citiesToDisplay:undefined
        }
    }

    handleZipCodeChange = (e) => {
        this.setState({zipCode: e})
    }
    
    handleAdultFriendlyChange = () => {
        this.setState(prevState => ({
            adultFriendly: !prevState.adultFriendly
        }))
    }
    handleWaterFrontChange = () => {
        this.setState(prevState => ({
            waterFront: !prevState.waterFront
        }))
    }
    handleInStateChange = () => {
        this.setState(prevState => ({
            inState: !prevState.inState
        }))
    }
    handleUrbanButton = () => {
        //Want cities only if they have a population more than a certain number
        this.setState({populationDivider: '>'})
    }
    handleRuralButton = () => {
        //Want cities only if they have a population less than a certain number
        this.setState({populationDivider: '<'})

    }
    handleSearchButton = async () => {
        let zipCodeInfo = zipcodes.lookup(this.state.zipCode)
        console.log(zipCodeInfo)

        if(this.state.zipCode){
           await this.setState({
                coordinates: [zipCodeInfo.longitude, zipCodeInfo.latitude],
                rangeValueInMeters: this.state.rangeValue * 1609.34
            }, async () => {
                console.log(this.state.coordinates)
                await axios.post('/api/filters', {
                    actualLocation: this.state.coordinates,
                    distance: this.state.rangeValueInMeters,
                    adultOnly: this.state.adultFriendly,
                    waterFront: this.state.waterFront,
                    inState: this.state.inState,
                    winterSports: false

                },{
                    headers: {
                        'Content-Type': 'application/json'
                      }
                }). then (res => {
                    this.setState({citiesToDisplay: res.data}, () => {
                        
                    })
                })
            }
            
            
            
            )
        } else{
            this.setState({coordinates: [this.props.coords.longitude, this.props.coords.latitude], rangeValueInMeters: this.state.rangeValue * 1609.34}, async () => {
                console.log(this.state.coordinates)
                await axios.post('/api/filters',{
                    actualLocation: this.state.coordinates, 
                    distance: this.state.rangeValueInMeters, 
                    adultOnly: this.state.adultFriendly, 
                    waterFront: this.state.waterFront, 
                    inState: this.state.inState,
                    winterSports: false
                    
                },{
                    headers: {
                        'Content-Type': 'application/json'
                      }
                }). then (res => {
                    this.setState({citiesToDisplay: res.data})
                })
            } )
        }



    //     console.log(this.state.citiesToDisplay)
    //     if(this.state.citiesToDisplay > 10){
    //         const citiesFilter = this.props.citiesToDisplay.slice(0,10)
    //         this.setState({citiesToDisplay: citiesFilter})
    //     }
    //     await axios.all(
    //       this.state.citiesToDisplay.map( e => {
    //           // console.log(e.cityName.replace(/ /g,'+'))
    //           return (
    //               axios.get(
    //                   `https://pixabay.com/api/?key=21414540-8ffff3c6f0901bd8153a62ca7&q=${e.cityName.replace(/ /g,'+')}&image_type=photo&category=travel&per_page=3`
    //               ) 
    //           )
    //       })
    //   ).then(response => {
    //     //   console.log(response)
    //       response.forEach( (e,i) => {
    //           this.state.citiesToDisplay[i].img = e.data.hits[0].largeImageURL
    //       })
          
    //   })
    //   .catch(err => console.log(err))
        
    }


    render(){
        // console.log(this.state.coordinates)
        // console.log(this.props.coords)
        // console.log(this.state.zipCode)
        console.log(this.state.citiesToDisplay)
        
        
        return(
            <div>
                <Header />
                <div>
                    <input 
                        placeholder="Current Zipcode"
                        type= 'text'
                        onChange= { e => this.handleZipCodeChange(e.target.value) }/>
                    <div>
                        proximity
                        <input 
                            type="range" 
                            min="50" 
                            max="3500" 
                            step="50"
                            value={this.state.rangeValue}
                            onChange={e => this.setState({rangeValue: e.target.value})}
                            />
                            <span>{this.state.rangeValue} miles</span>
                    </div>
                    <label>
                        Adult Friendly:
                        <input
                            name="adultFriendly" 
                            type="checkbox"
                            checked={this.state.adultFriendly}
                            onChange={this.handleAdultFriendlyChange}/>
                    </label>
                    <label>
                        Waterfront: 
                        <input
                            name="waterFront"
                            type="checkbox"
                            checked={this.state.waterFront}
                            onChange={this.handleWaterFrontChange}/>
                    </label>
                    <label>
                        In State:
                        <input
                            name="inState"
                            type="checkbox"
                            checked={this.state.inState}
                            onChange={this.handleInStateChange}/>
                    </label>
                    <div>
                        <h3>Population:</h3>
                        <button onClick={this.handleUrbanButton}>Urban</button>
                        <button onClick={this.handleRuralButton}>Rural</button>
                    </div>


                    <button onClick={this.handleSearchButton}>Search</button>
                
                </div>
                {/* result component  */}
                
                {this.props.coords && ( 
                    <Results
                    coordinates={this.state.coordinates}
                    citiesToDisplay={this.state.citiesToDisplay}
                    />
                 ) }
            </div>
        )
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Filter);