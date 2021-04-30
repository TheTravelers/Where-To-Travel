import axios from 'axios'
import React, { Component } from 'react'
import Header from '../Header/Header'
import {getSavedDestinations} from '../../redux/destinationReducer'
import {connect} from 'react-redux'
import './UserList.scss'


class UserList extends Component{


    componentWillMount(){
        console.log(this.props.user.user.user, 'this.props.user')
        axios.get(`/userDestList/${this.props.user.user.user.user_id}`)
        .then(res => {
            console.log(res.data, 'res data')
            this.props.getSavedDestinations(res.data)

        })
        //
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
                <div>

                    <h1 className='user-list-title'>{this.props.user.user.user.name}'s Saved Destinations</h1>
                    <div className='user-destination-container'>
                    {this.props.dest.userSavedDestinations.map((element, index) => {
                        return (
                            <div className='user-destination-single' key={index}>
                                <h2 className='city-name-row'>
                                    <span>{element.city_name}, {element.state}</span>
                                    <button className="add-to-share-list">-</button>
                                </h2>
                                <img src={element.city_img}/>
                                <li>
                                    <ul>Area:
                                        <span className='city-answer'>
                                            {element.population > 20000 ? 'Urban' : 'Rural'}
                                        </span>
                                    </ul>
                                    <ul>Near Waterfront: 
                                        <span className='city-answer'>
                                            {element.waterfront === true ? 'Yes' : 'No'}
                                        </span>
                                    </ul>
                                    <ul>Adult Activities Nearby: 
                                        <span className='city-answer'>
                                            {element.adult_friendly === true ? 'Yes' : 'No'}
                                        </span>
                                        </ul>
                                    <ul>Family Activities Nearby: 
                                        <span className='city-answer'>
                                            
                                            {element.family_friendly === true ? 'Yes' : 'No'}
                                        </span>
                                        </ul>
                                
                                </li>
                            </div>
                        )
                    })}
                    </div>
                    <button className='user-list-share-button'>SHARE LIST</button>
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