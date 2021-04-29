import axios from 'axios'
import React, { Component } from 'react'
import {getSavedDestinations} from '../../redux/destinationReducer'
import {connect} from 'react-redux'
import Header from '../Header/Header'
import './UserList.scss'


class UserList extends Component{


    componentWillMount(){
        axios.get(`/userDestList/${this.props.user.user.user.user_id}`)
        .then(res => {
            // console.log(res.data, 'res data')
            this.props.getSavedDestinations(res.data)

        })
    }


    render(){
        console.log(this.props.dest, 'this.props.dest')
        if (this.props.dest.userSavedDestinations.length < 1) {
            return (
              <section>
                    <Header />
                <header>
                  <h2>You have no saved destinations</h2>
                </header>
              </section>
            );
          }
        return(
            <div>
                    <Header />
                <h1>{this.props.user.user.user.name}'s Saved Destinations</h1>
                <div>
                    {this.props.dest.userSavedDestinations.map((element, index) => {
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
    return {
    user: reduxState.userReducer,
    dest: reduxState.destinationReducer
    }
  }
  export default connect(mapStateToProps, {getSavedDestinations})(UserList);