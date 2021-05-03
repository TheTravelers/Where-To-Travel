import axios from 'axios'
import React, { Component } from 'react'
import Header from '../Header/Header'
import {updateSavedDestinations} from '../../redux/destinationReducer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Results.scss'
 
class Results extends Component{
   constructor(props){
       super(props)
       this.state = {
           results: {}
       }
   }
   componentDidMount () {
    ///this is the popular places and the default 
  
        console.log(this.props)
         axios.post('/api/filters',{
            actualLocation: [this.props.coordinates.longitude, this.props.coordinates.latitude], 
            distance: 500000000, 
            adultOnly: false, 
            waterFront: false, 
            inState: false,
            winterSports: false
            
        },{
            headers: {
                'Content-Type': 'application/json'
              }
        }). then (res => {
            this.setState({results: res})
            
        })
    
   }
 
//    searchButton = () => {
//        axios.get('api/destinations')
//        .then(res => {
//            this.setState({ results: res.data })
//        }).catch(err => console.log(err))
//    }
 
//    addToUserList = (cityName, distance, population, waterFront, adultFriendly) => {
//        axios.post(`/userDestList/${this.props.user.user.user.user_id}`, {cityName, distance, population, waterFront, adultFriendly})
//        .then(res => {
//            this.props.updateSavedDestinations(res.data)
//        })
//    }
 
//    notifySuccess = () => {
//     toast.success('Destination added to your list', {
//         position: 'top-center',
//         autoClose: 4000,
//         closeOnClick: true
//         })
//     }
 //    need to render this somewhere <ToastContainer />
  
 
   render(){
       console.log(this.props.coordinates)
       console.log(this.state.results)
       return(
           <div>
               <div>
                   <h1>this is the result component</h1>
                   {/* {this.state.results.map((element, index) => {
                       const {cityName, distance, population, waterFront, adultFriendly} = element
                       return(
                           <div key={index}>
                               <h2>{cityName}</h2>
                               <li>
                                   <ul>{distance} miles from your current destination</ul>
                                   <ul>Area: {population > 20000 ? 'Urban' : 'Rural'}</ul>
                                   <ul>Near Waterfront: {waterFront === true ? 'Yes' : 'No'}</ul>
                                   <ul>Adult Activities Nearby: {adultFriendly > 4 ? 'Yes' : 'No'}</ul>
                               </li>
                               <button onClick={this.addToUserList(cityName, distance, population, waterFront, adultFriendly)}>Add</button>
                           </div>
                       )
                   })} */}
               </div>
 
           </div>
       )
   }
  
}
export default Results