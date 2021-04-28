import React, { Component } from 'react'
import './UserList.css'

class UserList extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        //
        this.props.getSavedDestinations(res.data)
    }


    render(){
        return(
            <div>
                <h1>{this.props.user.id}'s Saved Destinations</h1>
            </div>
        )
    }
    
}

const mapStateToProps = reduxState => {
    return reduxState.userReducer,
    reduxState.destinationReducer
  }
  export default connect(mapStateToProps)(UserList);