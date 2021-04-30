import axios from 'axios'
import React, { Component } from 'react'
import Header from '../Header/Header'
import {updateSavedDestinations} from '../../redux/destinationReducer'
import './Results.scss'
 
class Results extends Component{
   constructor(props){
       super(props)
       this.state = {
           results: {}
       }
   }
   componentDidMount(){
 
       axios.get(`api/destinations/${newYork}`)
       .then(res => {
           this.setState({ results: res.data })
       }).catch(err => console.log(err))
   }
 
   searchButton = () => {
       axios.get('api/destinations')
       .then(res => {
           this.setState({ results: res.data })
       }).catch(err => console.log(err))
   }
 
   addToUserList = (cityName) => {
       axios.post(`/userDestList/${this.props.user.user.user.user_id}`, {cityName, distance, population, waterFront, adultFriendly})
       .then(res => {
           this.props.updateSavedDestinations(res.data)
       })
   }
 
 
  
 
   render(){
       return(
           <div>
               <header>
                   <Header />
               </header>
               <div>
                   {this.state.results.map((element, index) => {
                       const {cityName, distance, population, waterFront, adultFriendly} = element
                       return(
                           <div key={index}>
                               <h2>{element.cityName}</h2>
                               <li>
                                   <ul>{element.distance} miles from your current destination</ul>
                                   <ul>Area: {element.population > 20000 ? 'Urban' : 'Rural'}</ul>
                                   <ul>Near Waterfront: {element.waterFront === true ? 'Yes' : 'No'}</ul>
                                   <ul>Adult Activities Nearby: {element.adultFriendly > 4 ? 'Yes' : 'No'}</ul>
                               </li>
                               <button onClick={this.addToUserList()}
                                    >Add</button>
                           </div>
                       )
                   })}
               </div>
 
           </div>
       )
   }
  
}
export default Results