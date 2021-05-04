import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
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
            rangeValueInMeters: 300000
        }
    }
    

    handleRangeChange = () => {
         
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

    }
    handleRuralButton = () => {

    }
    handleSearchButton = () => {
        this.setState({coordinates: [this.props.coords.longitude, this.props.coords.latitude], rangeValueInMeters: this.state.rangeValue * 1609.34}, () => {
            console.log(this.state.coordinates)
            axios.post('/api/filters',{
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
            }).then (res => console.log(res))
        } )
    }


    render(){
        console.log(this.state.coordinates)
        console.log(this.props.coords)
        if (this.props.coords){
            console.log([this.props.coords.longitude, this.props.coords.latitude])
        }
        return(
            <div>
                <Header />
                <div>
                    <input placeholder="Current Zipcode"/>
                    <div>
                        <input 
                            type="range" 
                            min="50" 
                            max="3500" 
                            step="50"
                            value={this.rangeValue}
                            onChange={this.handleRangeChange}
                            />
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