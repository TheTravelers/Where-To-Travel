import axios from 'axios'
import React, { Component } from 'react'
<<<<<<< HEAD
import './UserList.scss'
=======
import './UserList.scss'
>>>>>>> main

class UserList extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        axios.get(`/userDestList/${this.props.user.id}`)
        .then(res => {
            this.props.getSavedDestinations(res.data)

        })
        //
    }


    render(){
        return(
            <div>
                <h1>{this.props.user.id}'s Saved Destinations</h1>
                <div>
                    {this.props.savedDestinations.map((element, index) => {
                        return (
                            <div key={index}>
                                <h2>{element.city_name}</h2>
                                <li>
                                    <ul>Area: {element.population > 20000 ? 'Urban' : 'Rural'}</ul>
                                    <ul>Near Waterfront: {element.waterfront === true ? 'Yes' : 'No'}</ul>
                                    <ul>Adult Activities Nearby{element.adult_friendly === true ? 'Yes' : 'No'}</ul>
                                    <ul>Family Activities Nearby{element.family_friendly === true ? 'Yes' : 'No'}</ul>
                                
                                </li>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = reduxState => {
    return reduxState.userReducer,
    reduxState.destinationReducer
  }
  export default connect(mapStateToProps, {getSavedDestinations})(UserList);